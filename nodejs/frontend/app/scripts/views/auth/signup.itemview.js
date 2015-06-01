define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      signupTpl = require('hbs!templates/auth/signup.itemview'),
      stickit = require('backbone.stickit'),
      UserModel = require('models/user.model');

  var LoginItemView = Marionette.ItemView.extend({
    template: signupTpl,

    events: {
      'click .btn-signup': 'onSignUp'
    },

    bindings: {
      '#email': 'email',
      '#password': 'password',
      '#firstname': 'firstname',
      '#lastname': 'lastname'
    },

    initialize: function(options) {
      this.model = new UserModel();
    },

    onRender: function() {
      this.stickit();
    },

    onSignUp: function(e) {
      console.log('onLogin');
      e.preventDefault();
      var self = this;
      this.model.save(null, {
        action: 'signup',
        success: function(res, model) {
          console.log(res);
          self.$('.verify-account').removeClass('hide');
          //Backbone.history.navigate('login', {trigger:'true'});
        }
      });
    }
  });

  return LoginItemView;
});
