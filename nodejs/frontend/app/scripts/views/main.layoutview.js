define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      tplLayout = require('hbs!templates/main.layout'),
      HeaderItemView = require('views/header/header.itemview');


  var MainLayout = Marionette.LayoutView.extend({

    template: tplLayout,

    el: '.container',

    regions: {
      header: '#header',
      bodyPanel: '#body-container',
      popupPanel: '#popup-container'
    },

    initialize: function(options) {
      this.router = options.router;
      this.headerItemView = new HeaderItemView();
    },

    onRender: function() {
      this.header.show(this.headerItemView);
    },

    show: function(view) {
      this.bodyPanel.show(view);
    }
  });
  return MainLayout;
});
