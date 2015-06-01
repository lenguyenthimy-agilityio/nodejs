'use strict';

var should = require('chai').should(),
    mongoose = require('mongoose'),
    verifyToken = require('./utils/verify-token');

var authen = function(agent, api) {

  describe('Authentication', function() {
    var dataUser = {
        firstname: 'vu',
        lastname: 'lee',
        email: 'vulee89@gmail.com',
        password: 'vu'
    };


    before(function() {
      mongoose.connect('mongodb://localhost/blogOnline');
    });

    /*sign up*/
    it('should return 200 of when sign up success', function(done) {
      api.post('/api/users/signup')
      .expect(200)
      .send(dataUser)
      .end(function(err, res) {
        should.not.exist(err);
        done();
      });
    });

    /*401 Unauthorized not login yet*/
    it('should return 401 Unauthorized not login yet', function(done) {
      agent.get('/api/users/:profile')
      .expect(401)
      .expect({err: 'Unauthorized'})
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*get list user*/
    it('return 200 ok when get list user is success', function(done) {
      api.get('/api/users')
      .expect(200)
      .end(function(err) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*get index router*/
    it('return 200 ok when render index file', function(done) {
      api.get('/')
      .expect(200)
      .end(function(err) {
        if(!err) {
          done();
        }
      });
    });

    /*Login fail when not verify token*/
    it('should return fail when login not verify token', function(done) {
      agent.post('/api/users/login')
      .send(dataUser)
      .expect(403)
      .expect({err: 'You must verify your account'})
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Verify token*/
    it('should return 200 ok when verify token', function(done) {

      verifyToken(dataUser.email, done , api);
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
        should.not.exist(err);
        done();
      });
    });

    /**
     * Test case send user profile
     */
    it('should return 200 when get user profile', function(done) {

      agent.get('/api/users/:profile')
      .expect(200)
      .end(function(err, respone) {
        if(err) {
          return done(err);
        } else {
          console.log('respone profile', respone.body);
          done();
        }
      });
    });

    /*Test case change pass word*/
    it('return 200 ok change password is success', function(done) {
      api.put('/api/users/change-password/' + this.userId)
      .send({password: 'vu'})
      .expect(200)
      .end(function(err) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /** Test case log out
     */
     it('should return 200 ok when logout success', function(done) {
        agent.put('/api/users/logout')
        .expect(200)
        //.expect({message: 'Log out success'})
        .end(function(err, res) {
          if(err) {
            return done(err);
          } else {
            done();
          }
        });
     });
    /*Sign up when user is exist*/

    it('should return message User is exits when email is repeat', function(done) {
      api.post('/api/users/signup')
      .send(dataUser)
      .expect(403)
      .expect({err: 'User is exist'})
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*wrong email*/
    it('should return 403 when type email is wrong', function(done) {
      var data = {
        email: '123@gmail.com',
        password: 'vu'
      };

      api.post('/api/users/login')
      .send(data)
      .expect(400)
      .expect({err: 'Email is wrong'})
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });

    /*Wrong password*/
    it('should return 400 password is wrong', function(done) {
      var data = {
        email: 'vulee89@gmail.com',
        password: 'le'
      };

      api.post('/api/users/login')
      .send(data)
      .expect(400)
      .expect({message: 'Password is wrong'})
      .end(function(err, res) {
        if(err) {
          return done(err);
        } else {
          done();
        }
      });
    });
  });
};


module.exports = authen;
