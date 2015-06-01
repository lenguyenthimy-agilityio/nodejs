'use strict';
var mongoose = require('mongoose');

module.exports = function(agent, api) {
  describe('Test case err for all file', function() {
    before(function() {
      mongoose.disconnect();
    });

    this.userId = '65746486599760807536453757548675';

    it('should return err sign up when disconnect database', function(done) {
      api.post('/api/users/signup')
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    it('should return err change password when disconnect database', function(done) {
      api.put('/api/users/change-password/' + this.userId)
      .end(function(err) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });
  });
};
