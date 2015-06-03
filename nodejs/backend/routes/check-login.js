'use strict';
var checkLogin = function (req, res, next) {
    //console.log('rep.session', req.session);
  if(req && req.session && req.session.user) {
    console.log('session exist');
    next();
  } else {
    console.log('Must login before');
    res.send(401);
  }

};
/**
 * Expose
 */
module.exports = checkLogin;
