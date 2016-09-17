'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('episode service', function() {
  it('registered the episodes service', () => {
    assert.ok(app.service('episodes'));
  });
});
