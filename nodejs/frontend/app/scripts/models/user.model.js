define(function(require){
  'use strict';
  var Backbone = require('backbone');

  var UserModel = Backbone.Model.extend({
    url: '/api/users',
    idAttribute: '_id',

    defaults: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      newPass: ''
    },

    sync: function(method, model, options) {

      switch (method) {
        case 'create':
          if(options.action === 'login') {
            options.url = 'api/users/login';
            options.data = {
              email: model.get('email'),
              password: model.get('password')
            };
          }else if(options.action === 'signup') {
            options.url = 'api/users/signup';
            options.data = {
              email: model.get('email'),
              password: model.get('password'),
              firstname: model.get('firstname'),
              lastname: model.get('lastname')
            };
          }
        break;
        case 'read':
          if (options.token) {
            options.url = '/api/users/verify/' + options.token;
          } else {
            options.url = '/api/users/profile';
          }
        break;
        case 'update':
          if(options.action === 'logout'){
            options.url = '/api/users/logout'
          } else if(options.action === 'login') {
            method = 'create';
            options.url = 'api/users/login';
            options.data = {
              email: model.get('email'),
              password: model.get('password')
            };
          } else if(options.action === 'change-pass') {
            options.url = '/api/users/change-password/' + model.id;
            options.data = {
              newPassword: model.get('newPass'),
              userId: model.id
            };
          }
        break;

      }
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
  return UserModel;
});
