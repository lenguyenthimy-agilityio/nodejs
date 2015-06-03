'use strict';
var articleModel = require('../schema/article'),
    BaseService = require('./base-service'),
    CommentService = require('./comments');

/**
 * Article module
 * @module services/articles
 * @extends {module:services/base-service}
 * @property {function} deleteListComment {@link module:services/articles~deleteListComment}
 */
var Services = BaseService.extend({
  modelClass: articleModel,


  /**
   * Delete all comment of 1 article
   * Happend when delete one article
   * @param {string} articleId Id's article
   */
  deleteListComment: function(articleId) {
    var commentService = new CommentService();

    commentService.modelClass.find({articleId: articleId})
      .remove()
      .exec();
  }
});

/**
 * Expose
 */

 module.exports = Services;
