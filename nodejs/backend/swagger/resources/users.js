'use strict';
var swagger = require('swagger-node-express'),
    controller = require('../../routes/controller'),
    userService = controller.db.dbUser,
    userController = require('../../controllers/user');

var users = {

  /**
   * Get all users
   */
  getAllUsers :{
    'spec': {
      summary : 'Get all list user',
      path : '/api/users',
      method: 'GET',
      type : 'Users',
      nickname : 'getAllUser',
      produces : ['application/json'],
      responseMessages : [swagger.errors.invalid('id'), swagger.errors.notFound('user')]
    },
    'action': function (req,res) {

      userService.get({}, function(err, user) {
        if(err) {
          throw swagger.errors.notFound('user', res);
        } else {
          res.send(user);
        }
      });
    }
  },

  /**
   * Login
   */
  login: {
    'spec': {
      summary: 'Login',
      path: '/api/users/login',
      method: 'POST',
      type: 'Users',
      nickname: 'login',
      produces: ['application/json'],
      parameters: [swagger.paramTypes.form('email', 'Your email', 'string'),
                   swagger.paramTypes.form('password', 'Your password', 'string')
                  ]
    },
    'action' : function(req, res) {
      userController.login(req, res);
    }
  },

  /**
   * Get user profile
   */
  getUserProfile: {
    'spec': {
      summary: 'Get user profile',
      path: '/api/users/profile',
      method: 'GET',
      nickname: 'getUserProfile',
      produces: ['application/json']
    },
    'action': function(req, res) {
      if(req.session && req.session.user) {
        res.send(req.session.user);
      } else {
        res.send(401, {err: 'Unauthorized'});
      }
    }
  },

  /**
   * Sign up
   */
  signup: {
    'spec': {
      summary: 'Sign up',
      path: '/api/users/signup',
      method: 'POST',
      nickname: 'signup',
      produces: ['application/json'],
      parameters: [swagger.paramTypes.form('firstname', 'Your first name', 'string'),
                   swagger.paramTypes.form('lastname', 'Your last name', 'string'),
                   swagger.paramTypes.form('email', ' Your email', 'string'),
                   swagger.paramTypes.form('password', 'Your password', 'string')
                  ]
    },

    'action': function(req, res) {
      userController.signup(req, res);
    }
  },

  /**
   * Verify token
   */
  verifyToken: {
    'spec': {
      summary: 'Verify token account',
      path: '/api/users/verify/{token}',
      method: 'GET',
      nickname: 'verifyToken',
      produces: ['application/json'],
      parameters:  [swagger.params.path('token', 'User\'s token', 'string')]
    },

    'action': function(req, res) {
      userController.verifyToken(req, res);
    }
  },

  /**
   * Log out
   */
  logout: {
    'spec': {
      summary: 'Logout function',
      path: '/api/users/logout',
      method: 'PUT',
      nickname: 'logout',
      produces: ['application/json']
    },
    'action': function(req, res) {
      userController.logout(req, res);
    }
  },

  /**
   * Change password
   */
  changePassword: {
    'spec': {
      summary: 'Change password function',
      path: '/api/users/change-password/{userId}',
      method: 'PUT',
      nickname: 'changePassword',
      produces: ['application/json'],
      parameters: [swagger.paramTypes.path('userId', 'id of user', 'string'),
                  swagger.paramTypes.form('newPassword', 'User change password', 'string')]
    },
    'action': function(req, res) {

      userController.changePassWord(req, res);
    }
  }
};

module.exports = users;
