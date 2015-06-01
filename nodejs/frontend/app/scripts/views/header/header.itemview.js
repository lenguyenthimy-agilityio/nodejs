define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      headerTpl = require('hbs!templates/header/header.itemview'),
      bootstrap = require('bootstrap'),
      currentUser = require('helper/auth.singleton').getInstance();

  var HeaderItemView = Marionette.ItemView.extend({
    template: headerTpl,

    events: {
      'click #btn-logout': 'onLogout'
    },

    initialize: function() {
      this.model = currentUser;
    },

    onRender: function() {
      //this.$('.dropdown-menu').dropdown();
    },

    onLogout: function() {
      var self = this;

      this.model.save(null, {
        action: 'logout',
        success: function() {
          self.$('#user-profile').text('');
          Backbone.history.navigate('login', { trigger: true });
        }
      });
    }
  });
  return HeaderItemView;
});
