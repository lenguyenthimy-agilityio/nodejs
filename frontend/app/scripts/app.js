define(function(require) {
  'use strict';
  var Backbone = require('backbone'),
      Marionette = require('marionette'),
      Router = require('router/router'),
      currentUser = require('helper/auth.singleton').getInstance();

  var App = new Marionette.Application();

  App.addInitializer(function() {
  });

  App.on('before:start', function() {
    App.router = new Router();
  });
  App.on('start', function() {
    if (Backbone.history) {
        Backbone.history.start();
        var fragment = Backbone.history.fragment;

        console.log('fragment', fragment);

      if (currentUser.id) {
        Backbone.history.navigate(fragment , {trigger:'true'});
      } else {
        var loginToken = fragment.indexOf('login/');
        if(loginToken !== -1) {
          Backbone.history.navigate(fragment , {trigger:'true'});
        } else {
          Backbone.history.navigate('login', {trigger:'true'});
        }
      }
    }
  });
  return App;

});
