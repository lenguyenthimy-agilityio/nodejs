'use strict';
var app = require('../app'),
    request = require('supertest'),
    api = request(app),
    agent = request.agent(app),
    authenTest = require('./authen'),
    articletest = require('./article-test'),
    connectDatabase = require('./connect-db.test'),
    errTest = require('./err.test');

errTest(agent, api);
authenTest(agent, api);
articletest(agent, api);
connectDatabase(agent, api);
