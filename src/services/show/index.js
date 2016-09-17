'use strict';

import hooks from './hooks';
import {
  buildXRay
}
from '../../helpers/common-helpers.js';

class Service {
  constructor(options) {
    this.options = options || {
      defaultSite: 'animeflv'
    };
  }

  find(params) {
    const plugin = require(`../../plugins/${params.query.host}.json`);
    const xray = buildXRay(plugin.catalog);

    return new Promise((resolve, reject) => {
      xray((err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
    });
  }

  get(id, params) {
    const plugin = require(`../../plugins/${params.query.host}.json`);
    const xray = buildXRay(plugin.show, id);

    return new Promise((resolve, reject) => {
      xray((err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
    });
  }

}

module.exports = function() {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/shows', new Service());

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/shows');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};

module.exports.Service = Service;
