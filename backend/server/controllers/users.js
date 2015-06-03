'use strict';
var BaseController = require('../base-controller'),
    verifyAccount = require('../../helper/verify-account');

/**
 * User module
 * @module controllers/users
 * @extends {module:base-controller}
 * @property {object} actions {@link module:controllers/user~actions}
 * @property {function} login {@link module:controllers/users~login}
 * @property {function} signup {@link module:controllers/users~signup}
 * @property {function} verifyToken {@link module:controllers/users~verifyToken}
 * @property {function} getUserProfile {@link module:controllers/users~getUserProfile}
 * @property {function} logout {@link module:controllers/users~logout}
 * @property {function} changePassword {@link module:controllers/users~changePassword}
 */
var User = BaseController.extend({
  dbServiceName: 'dbUser',

  actions: {
    'login': {
      method: 'post',
      fn: 'login'
    },

    'signup': {
      method: 'post',
      fn: 'signup'
    },

    'verify': {
      method: 'get',
      fn: 'verifyToken'
    },

    'profile': {
      method: 'get',
      fn: 'getUserProfile'
    },
    'logout': {
      method: 'put',
      fn: 'logout'
    },

    'change-password': {
      method: 'put',
      fn: 'changePassword'
    }
  },

  /**
   * @inner
   * Login function
   * @param {object} opts Contain options
   * @param {function} callback call when send request login
   */
  login: function(opts, callback) {

    var email = opts.data.email;

    console.log('email', email);

    this.getService().findOne({email: email}, function(err, loginUser) {
      if (!loginUser) {
        opts.res.send(400, {err: 'Email is wrong'});
      }
      else {
        loginUser.verifyPassWord(opts.data.password, function(err, isMatch) {

          if(isMatch) {
            if(loginUser.verified) {
              opts.req.session.user = loginUser;
              opts.res.send(loginUser);
            } else {
              opts.res.send(403, {err: 'You must verify your account'});
            }
          }  else {
            opts.res.send(400, { message: 'Password is wrong'});
          }
        });
      }
    });
  },

  /**
   * @inner
   * Sign up function
   * @param {object} opts Contain options
   * @param {function} callback call when send request sign up
   */
  signup: function(opts, callback) {
    var body = opts.data,
        self = this;

    this.getService().findOne({email:body.email}, function(err, user) {
      if(err) {
        return callback(err);
      } else if (user){
        return opts.res.send(403, {err: 'User is exist'});

      } else {

        var data = {
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password
        };

        self.getService().create(data, function(err, user) {
          if(err) {
            callback(err);
          } else {
            //res.send(user);
            verifyAccount(opts.req, opts.res, user);
          }
        });
      }
    });
  },

  /**
   * @inner
   * Get profile function
   * @param {object} opts Contain options
   */
  getUserProfile: function(opts) {
    var req = opts.req,
        res = opts.res;
    if(req.session && req.session.user) {
      res.send(req.session.user);
    } else {
      res.send(401, {err: 'Unauthorized'});
    }
  },

  /**
   * @inner
   * Verify token function
   * @param {object} opts Contain options
   * @param {function} callback call when send request verify token
   */
  verifyToken: function(opts, callback) {

    this.getService().verifyToken(opts, callback);
  },

  /**
   * @inner
   * Log out function
   * @param {object} opts Contain options
   * @param {function} callback call when send request log out
   */
  logout: function(opts, callback) {
    opts.req.session.destroy(function(err){
      if(err) {
        callback(err);
      } else {
        opts.res.json({message: 'Log out success'});
      }
    });
  },

  /**
   * @inner
   * Change password function
   * @param {object} opts Contain options
   * @param {function} callback call when send request change password
   */
  changePassword: function(opts, callback) {
    var req = opts.req,
        userId = opts.childAction,
        data = {
          password: req.body.newPassword
        };

    this.getService().update(userId, data, function(err, user) {
      if(err) {
        callback(err);
      } else {
        opts.res.send(user);
      }
    });
  }

});

module.exports = User;
