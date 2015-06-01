define(function(require){
  'use strict';
  var Backbone = require('backbone'),
      CommentModel = require('models/comment.model');

  var CommentCollection = Backbone.Collection.extend({
    url: '/api/comments',
    model: CommentModel,

    sync: function(method, collection, options) {

      switch(method) {
        case 'read':
          options.url = '/api/comments/' + options.articleId;
        break;
      }
       if ((method === 'create' ||
        method === 'update' ||
        method === 'delete') &&
        typeof options.data === 'object') {
        options.data = JSON.stringify(options.data);
      }
      Backbone.Collection.prototype.sync.call(this, method, collection, options);
    }
  });

  return CommentCollection;
});
