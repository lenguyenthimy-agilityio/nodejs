 'use strict';
/**
 * Server module
 * @module server/index
 */

 var async = require('async'),
    _ = require('underscore'),
    Router = require('./router'),
    Log = require('log'),
    log = new Log('info'),
    DatabaseManager = require('../db'),
    mongoConnection = require('../utils/mongodb-connection'),
    Server;

Server = function(opts) {
  var sefl = this,
      webapp = this.webapp = opts.app,
      db = this.db = DatabaseManager;

  this.router = new Router({db: db, apis: ['users', 'articles', 'comments', 'tokens']});

  /**
   * @function
   * api handler function
   * @param {object} req Request of user
   * @param {object} res Respone of server
   * @param {function} next
   */
  var apiHandler = function(req, res, next) {
    var requestParams = _.clone({
      controller: req.params.controller,
      action: req.params.action,
      childAction: req.params.childAction,
      query: req.query,
      method: req.method.toLowerCase(),
      data: req.body
    });

    log.info('requestParams', requestParams);

    requestParams = _.extend(requestParams, {
      req: req,
      res: res,
      next: next
    });

    sefl.router.handle(requestParams, function(err, results) {
      res.set('Content-Type', 'application/json');
      if(err) {
        res.send(404, err);
      } else {
        res.send(200, results);
      }
    });
  };

  webapp.all('/api/:controller', apiHandler);
  webapp.all('/api/:controller/:action', apiHandler);
  webapp.all('/api/:controller/:action/:childAction', apiHandler);

  //init mongoose
  mongoConnection.init();

};

/**
 * Expose
 */
module.exports = Server;
