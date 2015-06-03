'use strict';
var commentModel = require('../schema/comment'),
    BaseService = require('./base-service');

/**
 * Comment module
 * @module services/comments
 * @extends {module:services/base-service}
 */
var Services = BaseService.extend({
  modelClass: commentModel,
});

/**
 * Expose
 */
 module.exports = Services;
