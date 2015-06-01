'use strict';
var controller = require('../../routes/controller'),
    async = require('async'),
    dbUserService = controller.db.dbUser,
    dbTokenService= controller.db.dbToken,
    request = require('supertest');

var verifyToken = function(email, done, api) {
  async.waterfall([
    function getUser(callback) {
      dbUserService.findOne({email: email}, function(err, user){
        if(err) {
          callback(err);
        } else {
          callback(null, user);
        }
      });
    },

    function getToken(user, callback) {
      dbTokenService.findOne({userId: user._id}, function(err, token) {
        if(err) {
          callback(err);
        } else {
          callback(null, token);
        }
      });
    },
    function testVerify(token) {
      api.get('/api/users/verify/' + token.token)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    }
  ], function() {
    done();
  });
};

module.exports = verifyToken;
