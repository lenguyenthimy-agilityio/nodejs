'use strict';
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    multer = require('multer'),
    app = express(),
    config = require('./utils/config');

var routes = require('./routes/index'),
    users = require('./routes/users'),
    article = require('./routes/article'),
    comment = require('./routes/comment');

/*optimist*/

var arvg = require('optimist').argv,
    server = arvg.server;

console.log('server', server);

process.env.NODE_ENV = server;

/*JWT express*/

var jwt = require('express-jwt');

console.log('jwt:secretKey', config.get('jwt:secretKey'));

app.use(jwt({
  secret: config.get('jwt:secretKey'),
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.api_key) {

      console.log('req.query.token', req.query.api_key);
      return req.query.api_key;
    }
    return null;
  }
}));

/**
 * Invalid token
 */
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(401, 'invalid token...');
  }
});

/*swagger*/
var swagger = require('swagger-node-express').createNew(app);

/*Resource of swagger*/
var userResource = require('./swagger/resources/users'),
    articleResource = require('./swagger/resources/articles'),
    commentResource = require('./swagger/resources/comments'),
    controller = require('./routes/controller'),
    models = require('./swagger/models');

// innit controller
controller.init();

// config swagger
swagger.setAppHandler(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));



/*upload file*/
app.use(multer({
  dest: './public/images'
  //putSingleFilesInArray: true
}));

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/articles', article);
app.use('/api/comments', comment);

/**
 * add models
 */
swagger.addModels(models)
       .addGet(userResource.getAllUsers)
       .addPost(userResource.signup)
       .addGet(userResource.verifyToken)
       .addPost(userResource.login)
       .addGet(userResource.getUserProfile)
       .addPut(userResource.logout)
       .addPut(userResource.changePassword)

/*article*/
      .addPost(articleResource.postArticle)
      .addGet(articleResource.getListArticle)
      .addPut(articleResource.editArticle)
      .addDelete(articleResource.deleteArticle)

/*comment*/
      .addPost(commentResource.postComment)
      .addGet(commentResource.getListCommentByArticleId)
      .addPut(commentResource.editComment)
      .addDelete(commentResource.deleteComment);


swagger.configureDeclaration('api/users', {
  description : 'Operations about Authen',
  authorizations : ['oauth2'],
  produces: ['application/json']
});

swagger.configureDeclaration('api/articles', {
  description : 'Operations about Articles',
  authorizations : ['oauth2'],
  produces: ['application/json']
});

swagger.configureDeclaration('api/comments', {
  description : 'Operations about Comments',
  authorizations : ['oauth2'],
  produces: ['application/json']
});

// Configures the app's base path and api version.
swagger.configureSwaggerPaths('http://localhost:3000', 'api-docs', '');
swagger.configure('http://localhost:3000', '1.0.0');

// set api info
swagger.setApiInfo({
  title: 'Swagger Sample App',
  description: 'This is a sample server Petstore server. You can find out more about Swagger at <a href=\'http://swagger.wordnik.com\'>http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \'special-key\' to test the authorization filters',
  termsOfServiceUrl: 'http://helloreverb.com/terms/',
  contact: 'apiteam@wordnik.com',
  license: 'Apache 2.0',
  licenseUrl: 'http://www.apache.org/licenses/LICENSE-2.0.html'
});

swagger.setAuthorizations({
  apiKey: {
    type: 'apiKey',
    passAs: 'header'
  }
});
// Serve up swagger ui at /docs via static route
var docsHandler = express.static(__dirname + '/node_modules/swagger-node-express/swagger-ui');

app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docsHandler(req, res, next);
});

/**
 * Expose
 */
module.exports = app;
