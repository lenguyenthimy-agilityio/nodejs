'use strict';
var mailer = require('../utils/node-mailer'),
    dbToken = require('../db').dbToken.modelClass,
    configMailer = require('../configs/mailer');

/**
 * Verify token module
 * @module helper/verify-account
 */

 /**
  * Verify function
  * @param {object} req
  * @param {object} res
  * @param {object} user
  */
var verifyToken = function(req, res, user) {
  var tokenVerify = new dbToken({
    userId: user._id
  });
  tokenVerify.createToken(function(err, token){

    if(err) {
      res.send(err);
    } else {
      var mailOptions = mailer.mailOptions,
          from = configMailer.mailer.user;

      mailOptions.from = from;
      mailOptions.to = user.email;
      mailOptions.context = {
        verifyURL: req.protocol + '://'+ req.get('host') + '/#login/' + token
      };
      mailOptions.html = '';

      mailer.transporter.sendMail(mailOptions, function(err, respone){
        if (err) {
          //err = new Error("Couldn't create verification token");
          res.send(err);
        } else {
          console.log('respone', respone);
          res.json(token);
        }
      });
    }
  });
};

module.exports = verifyToken;
