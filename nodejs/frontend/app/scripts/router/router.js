define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      MainLayoutView = require('views/main.layoutview'),
      HomePage = require('views/home/home.layoutview'),
      LoginPage = require('views/auth/login.itemview'),
      SignUpPage = require('views/auth/signup.itemview'),
      Article = require('views/article/article.itemview'),
      ChangePasswordPage = require('views/auth/change-password.itemview'),
      currentUser = require('helper/auth.singleton').getInstance();

  var Router = Marionette.AppRouter.extend({

    routes: {
      '': 'showHomepage',
      'login': 'showLoginpage',
      'signup': 'showSignUppage',
      'article': 'showActicleForm',
      'login/:token': 'showLoginpage',
      'changepassword': 'showChangPass'
    },

    initialize: function() {
      this.view = new MainLayoutView({
        router: this
      }).render();
    },

    showHomepage: function() {
      var homePage = new HomePage();

      this.view.show(homePage);

      console.log('currentUser', currentUser);
    },

    showLoginpage: function(token) {
      if(token) {
        var loginPageToken = new LoginPage({
          token: token
        });
        this.view.show(loginPageToken);
      } else {
        var loginPage = new LoginPage();
        this.view.show(loginPage);
      }

    },

    showSignUppage: function() {
      var signupView = new SignUpPage();

      this.view.show(signupView);
    },

    showActicleForm: function() {
      var article = new Article();

      this.view.show(article);
    },

    showChangPass: function() {
      var changePassPage = new ChangePasswordPage();

      this.view.show(changePassPage);
    }
  });

  return Router;
});
