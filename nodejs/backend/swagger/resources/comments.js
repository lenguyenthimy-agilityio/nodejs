'use strict';
var swagger = require('swagger-node-express'),
    commentController = require('../../controllers/comment');

var Comments =  {

  /**
   * Post one comment
   */
  postComment: {
    'spec': {
      summary: 'Post one comment',
      path: '/api/comments',
      method: 'POST',
      nickname: 'postComment',
      parameters: [swagger.paramTypes.form('articleId', 'Id of article need comment', 'string'),
                   swagger.paramTypes.form('userId', 'Id of user who post comment', 'string'),
                   swagger.paramTypes.form('commentContent', 'Content of comment', 'string'),
                   swagger.paramTypes.form('userName', 'User name', 'string')
                  ]
    },
    'action': function(req, res) {
      commentController.postComment(req, res);
    }
  },

  /**
   * Get list comment of one article
   */
  getListCommentByArticleId: {
    'spec': {
      summary: 'Get list comment',
      path: '/api/comments/{articleId}',
      nickname: 'getListCommentByArticleId',
      parameters: [swagger.paramTypes.path('articleId', 'ID of article that needs to be fetched', 'string')]
    },

    'action': function(req, res) {
      commentController.getListComment(req, res);
    }
  },

  /**
   * Update comment
   */
  editComment: {
    'spec': {
      summary: 'Edit one comment',
      path: '/api/comments/{commentId}',
      method: 'PUT',
      nickname: 'editComment',
      parameters: [swagger.paramTypes.path('commentId', 'ID of comment that needs to be update', 'string'),
                  swagger.paramTypes.form('commentContent', 'Comment content need update', 'string')]
    },
    'action': function(req, res) {
      commentController.editComment(req, res);
    }
  },

  /**
   * Delete comment
   */
  deleteComment: {
    'spec': {
      summary: 'Delete one comment',
      path: '/api/comments/{commentId}',
      nickname: 'deleteComment',
      parameters: [swagger.paramTypes.path('commentId', 'ID of comment that needs to be delete', 'string')]
    }
  }
};

module.exports = Comments;
