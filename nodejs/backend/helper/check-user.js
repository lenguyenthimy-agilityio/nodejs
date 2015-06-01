'use strict';
/**
 * Check user module
 * @module helper/check-user
 */

/**
 * Function check permission of user
 * If permission you can delete or edit
 * @param {string} userId
 * @param {object} obj - Article or comment
 */
var checkUser = function(userId, obj) {
  var permisson = false;
  if(userId === obj.userId) {
    permisson = true;
  }
  return permisson;
};

/**
 * Expose
 */
module.exports = checkUser;
