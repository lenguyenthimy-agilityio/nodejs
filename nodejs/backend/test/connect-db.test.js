'use strict';
var controllerConnection = require('../routes/controller'),
    mongoose = require('mongoose'),
    expect = require('chai').expect;

module.exports = function(agent, api) {
  describe('Connection Database', function() {
    it('connect success database', function(done) {
      controllerConnection.init(function(err) {
        if(err) {
          console.log(err);
          return;
        } else {
          expect(err).to.equal(undefined);
          done();
        }
      });
    });
    after(function(done) {
      mongoose.connection.db.executeDbCommand({dropDatabase: 1}, function() {
        mongoose.connection.close();
        done();
      });
    });
  });
};
