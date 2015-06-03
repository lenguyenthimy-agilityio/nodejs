'use strict';
var modelUser = require('../schema/user'),
    BaseService = require('./base-service'),
    TokenServie = require('./tokens');

/**
 * User module
 * @module services/users
 * @extends {module:services/base-service}
 * @property {Function} verifyToken {@link module:services/users~verifyToken}
 */
var Services = BaseService.extend({
  modelClass: modelUser,

  /**
   * Verify token function
   * @param {object} opts
   * @param {Function} Callback
   */
  verifyToken: function(opts, callback) {
    var token = opts.childAction,
        tokenService = new TokenServie(),
        self = this;

    console.log('token', token);
    tokenService.findOne({token: token}, function (err, doc){
      if (err) {
        callback(err);
      }
        self.findById(doc.userId, function (err, user) {
         if (err) {
          callback(err);
        }else {
          user.verified = true;

          user.save(function(err) {
            if(!err) {
              opts.res.json('verified');
            }
          });
        }
      });
    });
  }
});


/**
 * Expose
 */
module.exports = Services;
