'use strict';
var express = require('express'),
    router = express.Router(),
    controller = require('./controller'),
    userController = require('../controllers/user'),
    userService = controller.db.dbUser;


/**
 * Verify token
 */
router.get('/verify/:token', userController.verifyToken);

/**
 * GET users listing.
 */
router.get('/', function(req, res) {
  userService.get({}, function(err, user) {
    res.send(user);
  });
});

/**
 * Get use profile
 */
router.get('/:profile',function(req, res) {

  req.user = req.user || req.session.user;
  debugger;
  if(req.user) {
    res.send(req.user);
  } else {
    res.send(401, {err: 'Unauthorized'});
  }
});

/**
 * Sign up api
 */
router.post('/signup', userController.signup);

/**
 * Login
 */
router.post('/login', userController.login);

/**
 * Logout api
 */
router.put('/logout', userController.logout);

/**
 * Change pass
 */
router.put('/change-password/:userId', userController.changePassWord);

/**
 * Expose
 */
module.exports = router;
