'use strict';
var _ = require('underscore'),
    oop = require('node-g3').oop;


/**
 * Module Base service
 * @module services/base-service
 * @property {function} findById {@link module:services/base-service~findById}
 * @property {function} findOne {@link module:services/base-service~findOne}
 * @property {function} get {@link module:services/base-service~get}
 * @property {function} create {@link module:services/base-service~create}
 * @property {function} update {@link module:services/base-service~update}
 * @property {Functiom} remove {@link module:services/base-service~remove}
 */
var BaseServices =  oop.Base.extend({

  modelClass: null,

  /**
   * @constructor This is constructor of base service
   * @param {object} opts
   */
  constructor: function(opts) {
    this.opts = opts;
  },

  /**
   * @inner
   * Find object follow id
   * @param {string} id Id's object
   * @param {function} callback Call when find object by id was done
   */
  findById: function(id, callback) {
    this.modelClass.findById(id, callback);
  },

  /**
   * @inner
   * Fine one object
   * @param {object} data Data need find
   * @param {function} callback Call when find one object was done
   */
  findOne: function(data, callback) {
    this.modelClass.findOne(data, callback);
  },

  /**
   * @inner
   * Get all data
   * @param {object} data Data need get
   * @param {function} callback Call when get data was done
   */
  get: function(data, callback) {
    this.modelClass.find(data, callback);
  },

  /**
   * @inner
   * Create model function
   * @param {object} data New data which will save to database
   * @param {function} callback Call when save data was done
   */
  create: function(data, callback) {
    new this.modelClass(data).save(callback);
  },

  /**
   * @inner
   * Update model function
   * @param {string} id Id's object need updated
   * @param {object} data Data need updated
   * @parma {function} callback Call when updated
   */
  update: function(id, data, callback) {
    this.modelClass.findById(id, function(err, model) {
      if(err || !model) {
        return callback(err);
      }
      _.each(data, function(value, key) {
        if (data && data[key]) {
          model[key] = data[key];
        }
      });
      //save model
      model.save(callback);
    });
  },

  /**
   * @inner
   * Remove model function
   * @param {string} id Id's object need remove
   * @parma {function} callback Call when remove object was done
   */
  remove: function(id, callback) {
    //this.modelClass.findByIdAndRemove(id, callback);
    this.modelClass.remove({_id: id}, callback);

  }
});

/**
 * Expose
 */
 module.exports = BaseServices;
