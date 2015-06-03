'use strict'
var BaseController = require('../base-controller'),
    customJSON = require('../../helper/custom-json'),
    checkUser = require('../../helper/check-user');

/**
 * Article module
 * @module controllers/articles
 * @extends {module:base-controller}
 * @property {function} get {@link module:controllers/articles~get}
 * @property {function} uploadImage {@link module:controllers/articles~uploadImage}
 * @property {function} post {@link module:controllers/articles~post}
 * @property {function} put {@link module:controllers/articles~put}
 * @property {function} delete {@link module:controllers/articles~delete}
 * @property {function} handle {@link module:controllers/articles~handle}
 */
var User = BaseController.extend({
  dbServiceName: 'dbArticle',

  actions: {
    'upload': {
      method: 'post',
      fn: 'uploadImage'
    }
  },

  /**
   * Override method get of base router
   * @override
   * @param {object} opts Contain options
   * @param {function} callback Call when get list article
   */
  get: function(opts, callback) {
    var req = opts.req,
        res = opts.res;

    var userId = req.session.user ? req.session.user._id : null,
        page = req.query.page,
        limit = req.query.per_page,
        modelClass = this.getService().modelClass;

    modelClass.paginate({}, page, limit, function(error, pageCount, paginatedResults, itemCount) {
      if(error) {
        callback(error);
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
   * Upload image function
   * @param {object} Contain options
   */
  uploadImage: function(opts) {
    opts.res.send(opts.req.files);
  },

  /**
   * Override method post of base router
   * @override
   * @param {object} opts Contain options
   * @param {function} callback Call when post article
   */
  post: function(opts, callback) {
    var body = opts.req.body;

    console.log('body.fileImage', body.fileImage);
    var data = {
      userId: body.userId,
      userName: body.userName,
      title: body.title,
      content: body.content,
      imageUrl: 'images/' + body.fileImage
    };

    this.getService().create(data, callback);
  },

  /**
   * Override method put of base router
   * @override
   * @param {object} opts Contain options
   * @param {function} callback Call when edit article
   */
  put: function(opts, callback) {

    var body = opts.req.body,
        articleId = opts.action,
        userId = opts.req.session.user._id,
        data = {
          title: body.title,
          content: body.content
        },
        self = this;

    console.log('articleId', articleId);
    console.log('data', data);

    this.getService().update(articleId, data, function(){
      self.getService().findById(articleId, function(err, model) {

        var permission = checkUser(userId, model);

        if(permission) {
          model.save(callback);
        } else {
          opts.res.send(403);
        }

      });
    });
  },

  /**
   * Override method get of base router
   * @override
   * @param {object} opts Contain options
   * @param {function} callback Call when delete article
   */
  delete: function(opts, callback) {
    var articleId =  opts.action,
        userId = opts.req.session.user._id,
        self = this;

    this.getService().findById(articleId, function(err, article) {

      var permisson = checkUser(userId, article);

      if(!err && opts.req.session.user) {
        if(permisson) {

          self.getService().remove(articleId, function(err) {
            if(err) {
              callback(err);
            } else {
              self.getService().deleteListComment(opts.action);
              opts.res.json('article is delete');
            }
          });
        } else {
          opts.res.send(403);
        }
      } else {
        opts.res.send(err);
      }
    });
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
