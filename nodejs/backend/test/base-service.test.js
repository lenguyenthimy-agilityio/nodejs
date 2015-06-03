'use strict';
var controller = require('../routes/controller'),
    userService = controller.db.dbUser,
    articleService = controller.db.dbArticle,
    expect = require('chai').expect;

module.exports = function(agent, api) {
  describe('Base service', function() {

    this.timeout(10000);

     var dataUser = {
        firstname: 'vu',
        lastname: 'lee',
        email: 'vulee89@gmail.com',
        password: 'vu'
    };

    /** Test case log out
     */
     it('should return 200 ok when logout success', function(done) {
        agent.put('api/users/logout')
        .expect(200)
        .end(function(err, res) {
          done();
        });
     });

    /**
     * Test case login success
     */
    it('Return 200 ok if login success ', function(done) {
      var self = this;

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

    /*Test case for function find by ID*/
    it('findById user success ', function(done) {
      userService.findById(this.userId, function(err, user) {
        console.log('user', user);
        if(!err) {
          expect(user.email).to.equal(dataUser.email);
          done();
        }
      });
    });

    /*Test case for function create*/
    it('create user success', function(done) {
      var data = {
        firstname: 'abc',
        lastname: '@@@@',
        email: 'abc@gmail.com',
        password: 'le'
      };

      userService.create(data, function(err, user) {
        if(!err) {
          expect(user.email).to.equal(data.email);
          done();
        }
      });
    });

    /*create article*/
    it('creat article is success', function(done) {
      var data = {
        userId: this.userId,
        userName: 'abc',
        title: 'title12222',
        content: 'content 2222222',
        imageUrl: 'Image'
      };
      var self = this;

      articleService.create(data, function(err, article) {
        var respone = {
          userId: article.userId,
          userName: article.userName,
          title: article.title,
          content: article.content,
          imageUrl: article.imageUrl
        };
        if(!err) {
          self.articleId = article._id;
          console.log('this.articleId', self.articleId);
          expect(respone).to.deep.equal(data);
          done();
        }
      });
    });

    /*test case for update function*/
    it('update article success', function(done) {

      var data = {
        title: 'abc123333',
        content: 'content 567'
      },
      self = this;
      console.log('this.articleId', this.articleId);
      /*test case for err*/
      articleService.update('546546758690708978' , data, function(err, article) {

        if(!err) {
          expect(article).to.equal(undefined);
          //done();
        }
      });
      articleService.update(this.articleId , data, function(err, article) {

        if(!err) {
          expect(article._id.toString()).to.equal(self.articleId.toString());
          done();
        }
      });
    });

    /*get list article*/
    it('get all list article success', function(done) {
      articleService.get(function(err, list) {
        expect(list).to.be.a('array');
        done();
      });
    });

    /*test case remove*/
    it('remove article is success', function(done) {
      var self = this;

      articleService.remove(this.articleId, function(err, article) {
        if(!err) {
          expect(article).to.equal(1);
          done();
        }
      });
    });
  });
};
