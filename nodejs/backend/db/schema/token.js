'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('uuid');

/**
 * New token schema
 */
var TokenSchema = new Schema( {
  userId: String,
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    //required: true,
    default: Date.now,
    expires: '4h'
  }
}, {
  collection: 'tokens'
});

/**
 * Create function create token
 * @param {Function} fn
 */
TokenSchema.methods.createToken = function(done){
  var verifyToken = this,
      token = uuid.v4();

  verifyToken.set('token', token);

  verifyToken.save(function(err) {
    if (err) {
      return done(err);
    } else {
      return done(null, token);
    }
  });

};

/**
 * init token model
 */

var TokenModel = mongoose.model('token', TokenSchema);

/**
 * Expose
 */
module.exports = TokenModel;
