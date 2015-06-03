'use strict';
var databaseManager = require('../db'),
    mongoConnection = require('../utils/mongodb-connection');

var App = {
  db: databaseManager,

  /**
   * Init function
   * @param {Function} fn
   */
  init: function(callback) {
    if(this.isDone) {
      return callback && callback();
    } else {
      this.isDone = true;
      mongoConnection.init(callback);
    }
  }
};
/**
 * Expose
 */
module.exports = App;
