'use strict';
var plan = require('flightplan'),
    config = require('./config.deloy');

var username = 'root';

// configuration
plan.target(config.target.staging, [
  {
    host: '128.199.139.164',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    //privateKey: '/home/vagrant/.ssh/id_rsa'
  }
]);

plan.target(config.target.production, [
  {
    host: '128.199.139.164',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    //privateKey: '/home/vagrant/.ssh/id_rsa'
  }
]);

/**
 * run commands on localhost
 */
 //install environment in local
plan.local('local-install', function(local) {
  local.with('cd /home/deploy/nodejs/deploy', function(){
    local.exec('sh ./install.sh');
  });
});

//install dependences on local
plan.local('local-deploy', function(local) {
  local.with('cd /home/deploy/nodejs/deploy', function(){
    local.exec('sh ./deploy.sh');
  });
});

//stop server local
plan.local('local-stop', function(local) {
  local.with('cd /home/deploy/nodejs/deploy', function(){
    local.exec('forever list');

    var server = local.prompt('What is server want to stop? [number]');

    local.exec('forever stop ' + server);
  });
});

// run server on local
plan.local('local-run', function(local) {
  local.with('cd /home/deploy/nodejs/backend', function(){
    var server = local.prompt('What is server want to start? [uid]');

    local.exec('forever start --uid ' + server + ' bin/www --server=development');
  });
});

/**
 * run command on server
 */
//install environment in server
plan.remote('server-install', function(remote) {
  remote.with('cd /root/nodejs/deploy', function(){
    remote.exec('sh ./install.sh');
  });
});

// Install dependences in server
plan.remote('server-deploy', function(remote) {
  remote.with('cd /root/nodejs/deploy', function(){
    remote.exec('sh ./deploy.sh');
  });
});

//stop server local
plan.local('server-stop', function(remote) {
  remote.exec('forever list');
  var server = remote.prompt('What is server want to stop? [number]');

  remote.exec('forever stop ' + server);

});

// run server in server
plan.remote('server-run', function(remote) {
  remote.with('cd /root/nodejs/backend', function(){

    var server = remote.prompt('What is server want to start? [uid]');

    var port = remote.prompt('What is port want to start? [number]');

    remote.exec('forever start --uid ' + server + ' bin/www --server=development --port=' + port);
  });
});
