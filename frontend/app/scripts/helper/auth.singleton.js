define(function(require) {
  'use strict';
  var UserModel = require('../models/user.model'),
      _instance = null;

  var AuthSingleton = function(){};

  AuthSingleton.getInstance = function() {
    if(!_instance) {
      _instance = new UserModel();
    }
    return _instance;
  };

  return AuthSingleton;

});
