'use strict';

var oop = require('node-g3').oop;

/**
 * Base controller module
 * @module base-controller
 * @property {function} get {@link module:base-controller~get}
 * @property {function} post {@link module:base-controller~post}
 * @property {function} put {@link module:base-controller~put}
 * @property {function} delete {@link module:base-controller~delete}
 * @property {function} findOne {@link module:base-controller~findOne}
 * @property {function} findById {@link module:base-controller~findById}
 * @property {function} getService {@link module:base-controller~getService}
 * @property {function} handle {@link module:base-controller~handle}
 * @property {function} handle {@link module:base-controller~customMethod}
 */
var BaseController = oop.Base.extend({

  dbServiceName: null,
  dbControllerName: null,

  methods: {
    'get': 'get',
    'post': 'post',
    'put': 'put',
    'delete': 'delete'
  },

  actions: {},

  /**
   * @author Le Nguyen
   * @constructor This is constructor of base controller
   * @this {module:base-controller}
   */
  constructor: function(opts) {
    this.app = opts.app;
    this.db = opts.db;
  },

  /**
   * @inner
   * Get object function
   * @param {object} opts
   * @param {function} callback
   */
  get: function(opts, callback) {
    this.getService().get(opts, callback);
  },

  /**
   * @inner
   * Post object function
   * @param {object} opts
   * @param {function} callback
   */
  post: function(opts, callback) {
    this.getService().create(opts.data, callback);
  },

  /**
   * @inner
   * Put object function
   * @param {object} opts
   * @param {function} callback
   */
  put: function(opts, callback) {
    this.getService().update(opts.action, opts.data, callback);
  },

  /**
   * @inner
   * Delete object function
   * @param {object} opts
   * @param {function} callback
   */
  delete: function(opts, callback) {
    this.getService().remove(opts.action, callback);
  },

  /**
   * @inner
   * Find one  object function
   * @param {object} opts
   * @param {function} callback
   */
  findOne: function(opts, callback) {
    this.getService().findOne(opts, callback);
  },

  /**
   * @inner
   * Fins one object function
   * @param {object} opts
   * @param {function} callback
   */
  findById: function(opts, callback)  {
    this.getService().findById(opts, callback);
  },

  /**
   * @inner
   * @inner
   * Get service function
   * @return {module:services/base-service} Function of service
   */
  getService: function() {

    console.log('this.dbServiceName', this.dbServiceName);
    return this.db[this.dbServiceName];
  },

  /**
   * @inner
   * Hanle function
   * @param {object} opts
   * @param {function} callback
   * @return {module:server/router}
   */
  handle: function(opts, callback) {
    var method = this.methods[opts.method];

    if(method) {
      return this.customMethod(opts, callback);
    } else {
      return callback('wrong request');
    }
  },

  /**
   * @inner
   * Custom method  function
   * @param {object} opts
   * @param {function} callback
   * @return {module:controllers/users}
   */
  customMethod: function(opts, callback) {
    if(opts.action && this.actions[opts.action]) {

      var actionObj = this.actions[opts.action];

      console.log('actionObj.method', actionObj.method);

      if(actionObj.method === opts.method && actionObj.fn) {
        return this[actionObj.fn].call(this, opts, callback);
      }
    }
    //default
    var methodDefault = this.methods[opts.method];

    this[methodDefault].call(this, opts, callback);
  }

});

module.exports = BaseController;
