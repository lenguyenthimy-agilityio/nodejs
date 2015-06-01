/*global console */

require.config({
  paths: {
    'underscore': '../bower_components/underscore/underscore',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    'jquery': '../bower_components/jquery/dist/jquery',
    'backbone' :'../bower_components/backbone/backbone',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'marionette': '../bower_components/marionette/lib/backbone.marionette',
    'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
    'backbone.validation':   '../bower_components/backbone-validation/dist/backbone-validation',
    'jquery.ui.widget': '../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload': '../bower_components/blueimp-file-upload/js/jquery.fileupload',
    'backbone.paginator': '../bower_components/backbone.paginator/lib/backbone.paginator',
    'backgrid': '../bower_components/backgrid/lib/backgrid',
    'backgrid.paginator': '../bower_components/backgrid-paginator/backgrid-paginator'
  },

  shim: {
    'jquery': {
      exports: '$'
    },

    'bootstrap': {
      deps: ['jquery']
    },

    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },

    'underscore': {
      exports: '_'
    },

    'underscore.string': {
      deps: ['underscore']
    },

    'backbone-route-filter': {
      deps: ['backbone']
    },

    'backbone.wreqr': {
      deps: ['backbone']
    },

    'backbone.babysitter': {
      deps: ['backbone']
    },

    'backbone.marionette' : {
      deps: ['backbone', 'backbone.wreqr', 'backbone.babysitter'],
      exports: 'Marionette'
    },

    'backbone-validation': {
      deps: ['backbone'],
      exports: 'BackboneValidation'
    },

    'jquery.ui.widget': {
      deps: ['jquery']
    },

   'jquery.fileupload': {
    deps: ['jquery.ui.widget']
   },

   'backbone.paginator': {
    deps: ['backbone']
   },

   'backgrid': {
    deps: ['backbone']
   },

   'backgrid.paginator' : {
    deps: ['backgrid']
   }
  }
});


require(['app', 'helper/auth.singleton'], function(App, Auth) {
  'use strict';

  function authention() {
    var currentUser = Auth.getInstance();

    currentUser.fetch({
      action: 'profile'
    });
  }

  authention();
  setTimeout(function() {
    App.start();
  }, 500 );
});
