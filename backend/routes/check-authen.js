'use strict';
var checkAuthen = function (req, res, next) {
    //console.log('rep.session', req.session);
  req.user = req.user || req.session.user;

  if(req && req.user) {
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
module.exports = checkAuthen;
