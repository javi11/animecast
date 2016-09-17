'use strict';

import hooks from './hooks';
import {
  buildXRay
}
from '../../helpers/common-helpers.js';

class Service {
  constructor(options) {
    this.options = options || {};
  }

  get(id, params) {
    const plugin = require(`../../plugins/${params.query.host}.json`);
    const xray = buildXRay(plugin.episode, id);

    return new Promise((resolve, reject) => {
      xray((err, result) => {
        if (err) {
          return reject(err);
        }
        const episode = result && result.length > 0 && result[0];
        let streamLink = episode && episode.streamLink;
        
        if(plugin.episode.replace) {
          streamLink = streamLink.replace(plugin.episode.remove, '')
        }
        
        if(plugin.episode.urlEncoded) {
          streamLink = decodeURIComponent(streamLink);
        }
        
        episode.streamLink = streamLink;
        
        return resolve(episode);
      });
    });
  }

}

module.exports = function() {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/episodes', new Service());

  // Get our initialize service to that we can bind hooks
  const episodeService = app.service('/episodes');

  // Set up our before hooks
  episodeService.before(hooks.before);

  // Set up our after hooks
  episodeService.after(hooks.after);
};

module.exports.Service = Service;
