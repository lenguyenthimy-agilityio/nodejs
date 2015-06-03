'use strict';
var controller = require('../routes/controller'),
    tokenService = controller.db.dbToken,
    userService = controller.db.dbUser,
    verifyAccount = require('../helper/verify-account'),
    UserController = {},
    config = require('../utils/config');

var jwtToken = require('jsonwebtoken');

UserController = {

  /**
   * Verify token
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  verifyToken: function(req, res) {
    var token = req.params.token;

    console.log('token', token);
    tokenService.findOne({token: token}, function (err, doc){
      if (err) {
        res.send(err);
      }
      userService.findById(doc.userId, function (err, user) {
         if (err) {
          res.send(err);
        }else {
          user.verified = true;

          user.save(function(err) {
            if(!err) {
              res.json('verified');
            }
          });
        }
      });
    });
  },

  /**
   * Login function
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  login: function(req, res) {
    var email = req.body.email;

    userService.findOne({email: email}, function (err, loginUser) {
      if (!loginUser) {
        res.send(400, {err: 'Email is wrong'});
      }
      else {

        loginUser.verifyPassWord(req.body.password, function(err, isMatch) {

          /*if(isMatch) {
            if(loginUser.verified) {
              req.session.user = loginUser;
              res.send(loginUser);
            } else {
              res.send(403, {err: 'You must verify your account'});
            }
          }  else {
            res.send(400, { message: 'Password is wrong'});
          }*/

          var secretKey = config.get('jwt:secretKey');

          if (!isMatch) {
              console.log('Attempt failed to login with ' + loginUser.email);
              return res.send(401);
          } else {
            if(loginUser.verified) {
              req.session.user = loginUser;
              var token = jwtToken.sign({_id: loginUser._id}, secretKey, { expiresInMinutes: 60 });

              console.log('token', token);

              return res.json({token:token});
            }
          }
        });
      }

    });
  },

  /**
   * Signup function
   * Need verify account when sign up
   * @param {Object} req Request of user
   * @param {object} res Respone from server
   */
  signup: function(req, res, next) {
    var body = req.body;

    userService.findOne({email:body.email}, function(err, user) {
      if(err) {
        return res.send(err);
      } else if (user){
        return res.send(403, {err: 'User is exist'});

      } else {

        var data = {
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password
        };

        userService.create(data, function(err, user) {
          if(err) {
            res.send(err);
          } else {
            //res.send(user);
            verifyAccount(req, res, user);
          }
        });
      }
    });
  },

  logout: function(req, res) {
    req.session.destroy(function(err){
      if(err) {
        res.send(err);
      } else {
        res.json({message: 'Log out success'});
      }
    });
  },

  changePassWord: function(req, res) {
    var userId = req.params.userId,
        data = {
          password: req.body.newPassword
        };
    console.log('userId', userId);
    console.log('req.body', req.body);
    userService.update(userId, data, function(err, user) {
      if(err) {
          res.send(err);
      } else {
          res.send(user);
      }
    });
  }
};

/**
 * Expose
 */
module.exports = UserController;
