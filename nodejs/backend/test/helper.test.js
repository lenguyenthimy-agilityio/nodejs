'use strict';
var checkUser = require('../helper/check-user'),
    customJSON = require('../helper/custom-json'),
    controller = require('../routes/controller'),
    userService = controller.db.dbUser,
    articleService = controller.db.dbArticle,
    expect = require('chai').expect,
    mongoose = require('mongoose');

module.exports = function(agent, api) {
  describe('Check user owner', function(){
    it('Return 200 ok if login success ', function(done) {
      var self = this;
      var dataUser = {
        firstname: 'vu',
        lastname: 'lee',
        email: 'vulee89@gmail.com',
        password: 'vu'
      };
      agent.post('/api/users/login')
      .send(dataUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, respone) {
        self.userId = respone.body._id;
        console.log('self.userId', self.userId);
        done();
      });
    });

    /*test check user*/
    it('success check user is owner', function(done) {
      var self = this;

      userService.findById(this.userId, function(err, user) {

        checkUser(self.userId, user._id);
        expect(user._id.toString()).to.equal(self.userId.toString());
        done();
      });
    });
    /*post article*/
    it('should return 200 ok when post artcle success', function(done) {
      var self = this;

      var data = {
        userId: this.userId,
        userName: 'le nguyen',
        title: 'Test 12',
        content:'Conten 12',
        imageUrl: 'images/' + 'download1428652426831.jpg'
      };


      agent.post('/api/article/')
      .expect(200)
      .send(data)
      .end(function(err, res){
        if(err) {
          return done(err);
        } else {
          self.articleId = res.body._id;
          done();
        }
      });
    });
    /*check custom json*/
    it('check custom json', function(done) {
      var self = this;
       articleService.get(function(err, articles) {

        customJSON(articles, self.userId);

        expect(articles).to.be.a('array');
        done();
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
