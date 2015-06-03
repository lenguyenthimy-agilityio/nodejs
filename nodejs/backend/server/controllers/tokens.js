var BaseController = require('../base-controller');

/**
 * Tokens module
 * @module controllers/tokens
 * @extends {module:base-controller}
 */
var Token = BaseController.extend({
  dbServiceName: 'dbToken'
});

module.exports = Token;
