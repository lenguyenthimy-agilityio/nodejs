var tokenModel = require('../schema/token'),
    BaseService = require('./base-service');

/**
 * Module Token service
 * @module services/tokens
 * @extends {module:services/base-service}
 */
var Services = BaseService.extend({
  modelClass: tokenModel
});

/**
 * Expose
 */
module.exports = Services;
