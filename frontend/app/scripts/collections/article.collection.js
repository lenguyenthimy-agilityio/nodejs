define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      ArticleModel = require('models/article.model');

  require('backbone.paginator');

  var ArticleCollection = Backbone.PageableCollection.extend({

    url: '/api/articles',
    model: ArticleModel,
   // mode: 'client',
    state: {
      currentPage: 1,
      pageSize: 2,
    },

    hasPrevious: function() {
      return this.hasPreviousPage();
    },

    hasNext: function() {
      return this.hasNextPage();
    },

    // Get total records
    parseState: function(res) {
      return {
        totalRecords: res.totalEntries
      };
    },

    // Get data of page that we want to get
    parseRecords: function(res) {
      var results = res.results || [];

      return results;
    }
  });

  return ArticleCollection;

});
