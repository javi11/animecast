'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const errors = require('feathers-errors');

const checkHost = (hook) => {
  if (!hook.params.query.host) {
     throw new errors.BadRequest('Host param required');
  }
}

exports.before = {
  all: [checkHost],
  find: [],
  get: []
};

exports.after = {
  all: [],
  find: [],
  get: []
};
