'use strict';
var verifyToken =  require('./utils/verify-token'),
    mongoose = require('mongoose');

module.exports = function(agent, api) {
  describe('Article and Comment', function() {
    var articleId = '',
        dataUser1 = {
        firstname: 'vu',
        lastname: 'lee',
        email: 'vulee89@gmail.com',
        password: 'vu'
    },
    dataUser2 = {
      firstname: 'le',
      lastname: 'nguyen',
      email: 'le.nguyenthimy@asnet.com.vn',
      password: 'le'
    };

    /*Post image*/
    it('it return 401 ok when upload image not login yet', function(done) {
      agent.post('/api/article/upload')
      .expect(401)
      .end(function(err){
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });
    /**
     * Test case login success
     */
    it('Return 200 ok if login success ', function(done) {
      var self = this;

      agent.post('/api/users/login')
      .send(dataUser1)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, respone) {
        self.userId = respone.body._id;
        console.log('self.userId', self.userId);
        done();
      });
    });


    /*Post image*/
    it('it return 200 ok when upload image success', function(done) {
      agent.post('/api/article/upload')
      .expect(200)
      .end(function(err){
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Post article*/
    it('should return 200 ok when post artcle success', function(done) {
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
          articleId = res.body._id;
          done();
        }
      });
    });

    /*Get list article*/
    it('should return 200 ok when get list article success', function(done) {
      var data = {
        userId: this.userId,
        page: 1,
        limit: 2
      };
      agent.get('/api/article/')
      .expect(200)
      .send(data)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });


    /**
     * Edit article
     */
    it('should return 200 ok when edit article success', function(done) {
      var data = {
            title: 'acccc',
            content: 'jdhgjfhgfjghfj'
          };
      console.log('articleId', articleId);

      agent.put('/api/article/' + articleId)
      .expect(200)
      .send(data)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Delete article*/
    it('should return 200 ok when delete one article', function(done) {
      agent.delete('/api/article/' + articleId)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });


    /*post article again*/

    it('should return 200 ok when post artcle success', function(done) {
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
          articleId = res.body._id;
          done();
        }
      });
    });

    /*get list comment*/

    it('should return 200 ok when get list comment follow article success', function(done){

      console.log('articleId again', articleId);

      agent.get('/api/comment/' + articleId)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*post one comment*/
    it('should return 200 ok when post one comment success', function(done) {
      var data = {
        articleId: articleId,
        userId: this.userId,
        commentContent: 'abc',
        userName: 'le nguyen'
      },
      self = this;
      api.post('/api/comment')
      .expect(200)
      .send(data)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          self.commentId = res.body._id;
          done();
        }
      });
    });

    /*edit comment*/
    it('should return 200 ok when edit comment success', function(done) {
      var data = {
        commentContent: 'lenguyen@123'
      },
      commentId = this.commentId;

      agent.put('/api/comment/' + commentId)
      .expect(200)
      .send(data)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*delete comment*/
    it('should return 200 ok when delete comment success', function(done) {
      agent.delete('/api/comment/' + this.commentId)
      .expect(200)
      .end(function(err) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*post one comment again to check permisson delete and edit*/
    it('should return 200 ok when post one comment success', function(done) {
      var data = {
        articleId: articleId,
        userId: this.userId,
        commentContent: 'abc',
        userName: 'le nguyen'
      },
      self = this;
      api.post('/api/comment')
      .expect(200)
      .send(data)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          self.commentId = res.body._id;
          done();
        }
      });
    });
    /*sign up*/
    it('should return 200 of when sign up success', function(done) {
      api.post('/api/users/signup')
      .expect(200)
      .send(dataUser2)
      .end(function(err, res) {
        done();
      });
    });

    it('should return 200 ok when verify token', function(done) {

      verifyToken(dataUser2.email, done, api);
    });


    it('Return 200 ok if login success ', function(done) {
      var self = this;

      agent.post('/api/users/login')
      .send(dataUser2)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, respone) {
        self.userId = respone.body._id;
        console.log('self.userId', self.userId);
        done();
      });
    });

    /*Check permission when edit artcle*/
    it('should return 403 when can not edit article', function(done) {
      var  data = {
        title: 'Test 1',
        content: 'ABC'
      };

      agent.put('/api/article/' + articleId)
      .send(data)
      .expect(403)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Check permission when delete article*/
    it('should return 403 when can not delete article', function(done) {

      agent.delete('/api/article/' + articleId)
      .expect(403)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Can not delete comment*/
    it('should return 403 when can not delete article', function(done) {

      agent.delete('/api/comment/' + this.commentId)
      .expect(403)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Can not edit comment*/
    it('should return 403 when can not edit article', function(done) {
      agent.put('/api/comment/' + this.commentId)
      .expect(403)
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*after(function(done) {
      mongoose.connection.db.executeDbCommand({dropDatabase: 1}, function() {
        mongoose.connection.close();
        done();
      });
    });*/
  });

};
