define(function(require) {
  'use strict';
  var Backbone = require('backbone');

  var ArticleModel = Backbone.Model.extend({
    urlRoot: '/api/articles',

    idAttribute: '_id',

    defaults: {
      title: '',
      content: ''
    },

    sync: function(method, model, options) {

      switch(method) {
        case 'create':
          options.data = {
            userId: options.userId,
            userName: options.userName,
            title: model.get('title'),
            content: model.get('content'),
            fileImage: options.fileImage
          };
        break;

        case 'update':
          options.data ={
            title: model.get('title'),
            content: model.get('content')
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
  return ArticleModel;
});
