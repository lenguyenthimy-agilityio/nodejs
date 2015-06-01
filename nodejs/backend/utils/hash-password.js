'use strict';
var crypto = require('crypto');

/**
 * Hash password module
 * @module utils/hash-password
 */

 /**
  * Function hash password
  * @param {string} pwd Password user type
  */
var hashFunction = function(pwd) {
  var shasum = crypto.createHash('sha1');

  shasum.update(pwd);

  var d = shasum.digest('hex');

  console.log(d);

  return d;
};

module.exports = hashFunction;
