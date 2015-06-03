define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      tplHomeLayout = require('hbs!templates/home/home.layoutview'),
      ArticleCollectionView = require('views/home/article.collectionview');

  require('backgrid.paginator');
  var HomePageLayoutView = Marionette.LayoutView.extend({

    template: tplHomeLayout,

    regions: {
      listArticle: '#list-article',
       paginator: '.paginator-article'
    },

    ui: {
      paginator: '.paginator-article'
    },

    initialize: function(options) {
      console.log(options);
      this.articleCollectionView = new ArticleCollectionView();
    },

    onRender: function() {
      var self = this;

      this.articleCollectionView.collection.fetch({
        success: function() {
          self.listArticle.show(self.articleCollectionView);
        }
      });
    },

    onShow: function() {
      var paginator = new Backgrid.Extension.Paginator({
        collection: this.articleCollectionView.collection
      });
      this.paginator.show(paginator);
    }
  });
  return HomePageLayoutView;
});
