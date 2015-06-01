'use strict';
var _ = require('underscore');

/**
 * CustomJSON module
 * @module helper/custom-json
 */

 /**
  * CustomJSON function
  * Add myself to data
  * @param {object} datas
  * @param {string} userId User's id
  */
var customJSON = function(datas, userId) {
 var results = _.map(datas, function(data) {
    data = data.toJSON() ? data.toJSON() : data;

    data.myself = data.userId === userId? true : false;
    return data;
  });

  return results;
};

/**
 * Expose
 */
module.exports = customJSON;
