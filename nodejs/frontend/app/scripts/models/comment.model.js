define(function(require){
  'use strict';
  var Backbone = require('backbone');

  var CommentModel = Backbone.Model.extend({
    urlRoot: '/api/comments',

    idAttribute: '_id',

    defaults: {
      commentContent: ''
    },

    sync: function(method, model, options) {

      switch(method) {
        case 'create':
          options.data = {
            commentContent: model.get('commentContent'),
            articleId: model.get('articleId'),
            userId: model.get('userId'),
            userName: model.get('userName')
          };
        break;
        case 'update':
          options.data = {
            commentContent: model.get('commentContent')
          };
        break;
      }
      //set header
      options.headers = {
        'Content-Type': 'application/json'
      };

      if ((method === 'create' ||
        method === 'update' ||
        method === 'delete') &&
        typeof options.data === 'object') {
        options.data = JSON.stringify(options.data);
      }
      Backbone.Model.prototype.sync.call(this, method, model, options);
    }

  });
  return CommentModel;
});
