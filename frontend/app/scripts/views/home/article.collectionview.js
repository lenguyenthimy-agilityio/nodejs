define(function(require) {
  'use strict';

  var Marionette = require('marionette'),
      ArticleItemView = require('views/home/article.itemview'),
      ArticleCollection = require('collections/article.collection');

  var ArticleCollectionView = Marionette.CollectionView.extend({
    childView: ArticleItemView,
    className: 'list-article',

    initialize: function() {
      this.collection = new ArticleCollection();
    }
  });
  return ArticleCollectionView;
});
