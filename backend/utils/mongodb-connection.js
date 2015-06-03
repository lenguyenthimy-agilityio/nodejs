'use strict';
var mongoose = require('mongoose'),
    config = require('./config');
/**
 * Init App
 * @module utils/mongodb-connection
 */

var getDatabase = function(){
  console.log('NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return config.get('database:development:connectionString');
  } else if (process.env.NODE_ENV === 'test'){
    return config.get('database:test:connectionString');
  } else {
    return config.get('database:development:connectionString');
  }

};

var App = {
  init: function(callback) {
    mongoose.connect(getDatabase(), function(err) {
      if(err) {
        console.log(err);
      }
      console.log('connect success');
      callback && callback();
    });
  }
};

module.exports = App;
