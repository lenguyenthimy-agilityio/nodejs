'use strict';

var ArticleController = {},
    controller = require('../routes/controller'),
    customJSON = require('../helper/custom-json'),
    checkUser = require('../helper/check-user'),
    dbArticle = controller.db.dbArticle.modelClass,
    articleService = controller.db.dbArticle,
    commentController = require('./comment');

ArticleController = {

  /**
   * Post article
   * @param {object} req Request of user
   * @param {object} res Respone from server
   */
  postArticle: function(req, res) {
    var body = req.body;
    console.log('body.fileImage', body.fileImage);
    var data = {
      userId: body.userId,
      userName: body.userName,
      title: body.title,
      content: body.content,
      imageUrl:  'images/' + body.fileImage
      //for swagger
      //'images/' + req.files.fileImage.name
    };

    articleService.create(data, function(err, article) {
      if (err) {
        res.send(err);
      } else {
        res.send(article);
      }
    });
  },

  /**
   * Get all list article
   * @param {object} req Request of user
   * @param {object} res Respone from server
   */
  getListArticle: function(req, res) {
    req.user = req.user || {};

    var userId = req.user._id,
      page = req.query.page,
      limit = req.query.per_page;

    //Using paginate
    dbArticle.paginate({}, page, limit, function(error, pageCount, paginatedResults, itemCount) {
      if(error && !userId) {
        res.send(error);
      } else {
        res.send({
          'results': customJSON(paginatedResults, userId),
          'totalPages': pageCount,
          'totalEntries': itemCount,
          'limit': limit
        });
      }
    });
  },

  /**
   * Delete one article
   * @param {object} req Request of user
   * @param {object} res Respone from server
   */
  deleteArticle: function(req, res) {
    req.user = req.user || {};

    var articleId =  req.params.articleId,
        userId = req.user._id;

    articleService.findById(req.params.articleId, function(err, article) {

      var permisson = checkUser(userId, article);

      if(!err && req.user) {
        if(permisson) {

          articleService.remove(articleId, function(err) {
            if(err) {
              res.send(err);
            } else {
              commentController.deleteListComment(req, res);
              res.json('article is delete');
            }
          });
        } else {
          res.send(403);
        }
      } else {
        res.send(err);
      }
    });

  },

  /**
   * Edit one article
   * @param {object} req Request of user
   * @param {object} res Respone from server
   */
  editArticle: function(req, res) {

    req.user = req.user || {};

    var body = req.body,
        articleId = req.params.articleId,
        userId = req.user._id,
        data = {
          title: body.title,
          content: body.content
        };
    console.log('articleId', articleId);
    console.log('data', data);

    articleService.update(articleId, data, function(){
      articleService.findById(articleId, function(err, model) {
        var permission = checkUser(userId, model);

        console.log('model.userId', model.userId);
        if(permission) {
          model.save(function(err, article) {
            if(err) {
              res.send(err);
            } else {
              res.send(article);
            }
          });
        } else {
          res.send(403);
        }

      });
    });
  }
};

/**
 *Expose
 */
 module.exports = ArticleController;
