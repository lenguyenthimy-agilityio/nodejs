'use strict';

var controller = require('../routes/controller'),
    dbComment = controller.db.dbComment.modelClass,
    commentService = controller.db.dbComment,
    checkUser = require('../helper/check-user'),
    customJSON = require('../helper/custom-json'),
    CommentController = {};

CommentController = {

  /**
   * Get list comment
   * Depend on article
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  getListComment: function(req, res) {
    req.user = req.user || {};

    var articleId = req.params.articleId;

    commentService.get({articleId: articleId}, function(err, comments) {
      var userId = req.user._id;

      if(err) {
        res.send(err);
      } else {
        res.send(customJSON(comments, userId));
      }
    });
  },

  /**
   * Post one comment for artcle
   * Depend on article
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  postComment: function(req, res) {
    var body = req.body;

    var Comment = new dbComment({
      articleId: body.articleId,
      userId: body.userId,
      commentContent: body.commentContent,
      userName: body.userName
    });

    Comment.save(function(err, comment) {
      if(err) {
        res.send(err);
      } else {
        res.send(comment);
      }
    });
  },

  /**
   * Edit one comment
   * Must check permission
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  editComment: function(req, res) {
    req.user = req.user || {};

    var body = req.body,
        commentId =  req.params.commentId,
        userId = req.user._id,
        data = {
          commentContent: body.commentContent
        };

    commentService.update(commentId, data, function() {
      commentService.findById(commentId, function(err, model) {
        var permission = checkUser(userId, model);

        if (permission) {
          model.save(function(err, comment) {
            if(err) {
              res.send(err);
            } else {
              res.send(comment);
            }
          });
        } else {
          res.send(403);
        }
      });
    });
  },


  /**
   * Delete one comment
   * Must check permission
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  deleteComment: function(req, res) {
    req.user = req.user || {};

    var commentId = req.params.commentId,
        userId = req.user._id;

    commentService.findById(commentId, function(err, comment) {
      var permission = checkUser(userId, comment);

      if(!err && req.user) {
        if(permission) {
          commentService.remove(commentId, function(err) {
            if(!err) {
              res.json('comment is deleted');
            } else {
              res.send(err);
            }
          });
        }else {
          res.send(403);
        }
      }
    });
  },

  /**
   * Delete all comment of 1 article
   * Happend when delete one article
   */
  deleteListComment: function(req, res) {
    dbComment.find({articleId: req.params.articleId})
      .remove()
      .exec();
  }
};

/**
 * Expose
 */
module.exports = CommentController;
