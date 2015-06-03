define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      loginTpl = require('hbs!templates/auth/change-pass.itemview'),
      userModel = require('helper/auth.singleton').getInstance();

  var LoginItemView = Marionette.ItemView.extend({
    template: loginTpl,

    events: {
      'click .btn-save': 'onSave'
    },

    bindings: {
      '#new-password': 'newPass'
    },

    initialize: function() {
      this.model = userModel;
    },

    onRender: function() {
      var self = this;

      this.stickit();
    },

    onSave: function(e) {

      e.preventDefault();

      this.model.save(null, {
        action: 'change-pass',
        success: function(model, res) {
          console.log(res);
          Backbone.history.navigate('login', {trigger: true});

        }
      });
    }
  });

  return LoginItemView;
});
