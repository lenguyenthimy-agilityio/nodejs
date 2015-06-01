'use strict';

var BaseController = require('../base-controller'),
    customJSON = require('../../helper/custom-json');

/**
 * Comment module
 * @module controllers/comments
 * @extends {module:base-controller}
 * @property {function} get {@link module:controllers/comments~get}
 * @property {function} handle {@link module:controllers/comments~handle}
 */
var User = BaseController.extend({
  dbServiceName: 'dbComment',

  /**
   * Override get method of base controller
   * @override
   * @param {object} opts Contain options
   * @param {function} callback
   * @tutorial Override
   */
  get: function (opts, callback) {
    var articleId = opts.action,
        userId = opts.req.session.user._id;

    if (articleId) {
      this.getService().get({articleId: articleId}, function(err, comments) {
        console.log('override', articleId);
        if(err) {
          opts.res.send(err);
        } else {
          opts.res.send(customJSON(comments, userId));
        }
      });
    } else {
      this.base(opts, callback);
    }

  },

  /**
   * Override handle function of base router
   * @override
   * @param {object} opts Contain options of request
   * @param {function} callback Call when send any request
   */
  handle: function(opts, callback) {
    if(opts.req.session && opts.req.session.user) {
      return this.base(opts, callback);
    } else {
      opts.res.send(401);
    }
  }

});

module.exports = User;
