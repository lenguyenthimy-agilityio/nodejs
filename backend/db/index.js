'use strict';
var userServices = require('./services/users'),
    articleServices = require('./services/articles'),
    commentServices = require('./services/comments'),
    tokenServices = require('./services/tokens'),
    _ = require ('underscore'),
    allServices =  {
      dbUser: userServices,
      dbArticle: articleServices,
      dbComment: commentServices,
      dbToken: tokenServices
    },
    neededServices = {};

    _.each(allServices, function (item, key) {
      neededServices[key] = new item();
    });

/**
 * Expose
 */
module.exports = neededServices;
