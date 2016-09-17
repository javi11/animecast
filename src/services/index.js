'use strict';
const episode = require('./episode');
const show = require('./show');

module.exports = function() {
  const app = this;

  app.configure(show);
  app.configure(episode);
};
