define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      loginTpl = require('hbs!templates/auth/login.itemview'),
      stickit = require('backbone.stickit'),
      userModel = require('helper/auth.singleton').getInstance();

  var LoginItemView = Marionette.ItemView.extend({
    template: loginTpl,

    events: {
      'click .btn-login': 'onLogin'
    },

    bindings: {
      '#email': 'email',
      '#password': 'password'
    },

    initialize: function(options) {
      this.model = userModel;
      this.token = options.token;
    },

    onRender: function() {
      var self = this;

      this.stickit();
      if(this.token) {
        this.model.fetch({
          token: self.token
        });
      }
    },

    onLogin: function(e) {
      console.log('onLogin');
      e.preventDefault();

      this.model.save(null, {
        action: 'login',
        success: function(model, res) {
          console.log(res);
          Backbone.history.navigate('', {trigger: true});

          var userName = [res.firstname, res.lastname].join(' ');

          $('#user-profile').text(userName);
        }
      });
    }
  });

  return LoginItemView;
});
