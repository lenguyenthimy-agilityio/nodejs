'use strict';
var _ = require('underscore');

/**
 * Module router
 * @module server/router
 */

/**
 * @class controller
 */
var Controller = function (opts){
  /** @type {object}*/
  this.db = opts.db;
  /** @type {object}*/
  this.apis = opts.apis;
  this.controllers = {};
  this.init();
};

/**
 * @function Init function of router
 * @param {function} fn
 */
Controller.prototype.init = function(fn) {
  var self = this;

  _.each(this.apis, function(item) {
    var ControllerClass = require('./controllers/' + item),
        controller = new ControllerClass({db: self.db});

    self.controllers[item] = controller;

    fn && fn();
  });
};

/**
 * @function Handle function
 * @param {object} opts
 * @param {function} fn
 */
Controller.prototype.handle = function(opts, fn) {
  var controller = this.controllers[opts.controller];

  if (controller) {
      return controller.handle(opts, fn);
    } else {
      return fn && fn('wrong request!!!');
  }
};

module.exports = Controller;
