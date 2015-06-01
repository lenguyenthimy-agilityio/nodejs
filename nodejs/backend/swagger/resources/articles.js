'use strict';
var swagger = require('swagger-node-express'),
    articleController = require('../../controllers/article');

var Article = {

  /**
   * Get list article
   */
  getListArticle: {
    'spec': {
      summary : 'Get all list article',
      path : '/api/articles',
      method: 'GET',
      nickname : 'getListArticle',
      produces : ['application/json']
    },
    'action': function (req,res) {

      articleController.getListArticle(req, res);
    }
  },

  /**
   * Delete article
   */
  deleteArticle: {
    'spec': {
      summary: 'Delete article',
      path: '/api/articles/{articleId}',
      method: 'DELETE',
      nickname: 'deleteArticle',
      produces: ['application/json'],
      parameters: [swagger.params.path('articleId', 'ID of article that needs to be fetched', 'string')],
    },
    'action': function(req, res) {

      articleController.deleteArticle(req, res);
    }
  },

  /**
   * Post one article
   */
  postArticle: {
    'spec': {
      summary: 'Post one article',
      path: '/api/articles',
      method: 'POST',
      nickname: 'postArticle',
      produces: ['application/json'],
      parameters: [swagger.paramTypes.form('userId', 'Id of user who post article', 'string'),
                   swagger.paramTypes.form('userName', 'Name of user who post article', 'string'),
                   swagger.paramTypes.form('title', 'Title of article', 'string'),
                   swagger.paramTypes.form('content', 'Content of article', 'string'),
                   swagger.paramTypes.form('fileImage', 'Image of article', 'file')
                  ],
    },
    'action': function(req, res) {
      articleController.postArticle(req, res);
    }
  },

  /**
   * Edit article
   */
  editArticle: {
    'spec': {
      summary: 'Edit article',
      path: '/api/articles/{articleId}',
      method: 'PUT',
      nickname: 'editArticle',
      produces: ['application/json'],
      parameters: [ swagger.paramTypes.path('articleId', 'ID of article that needs to be fetched', 'string'),
                    swagger.paramTypes.form('title', 'Title of article', 'string'),
                    swagger.paramTypes.form('content', 'content of article', 'string'),
                  ]

    },
    'action': function(req, res) {
      articleController.editArticle(req, res);
    }
  }
};

module.exports = Article;
