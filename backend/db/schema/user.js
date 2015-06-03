'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    hashPassword = require('../../utils/hash-password');

/**
 * New user schema
 */
var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  verified: Boolean
}, {
  collection: 'User'
});

/**
 * Hash password before save
 */
UserSchema.pre('save', function(next) {
  var user = this;
  //debugger;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = hashPassword(user.password);
  next();
});


UserSchema.methods.verifyPassWord = function(password, callback) {
 // debugger;
  if(this.password === hashPassword(password)) {
    callback(null, true);
  } else {
    callback({err: 'unauthorized'});
  }
};

var userModel = mongoose.model('User', UserSchema);

/**
 * Expose
 */

module.exports = userModel;
