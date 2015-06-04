var plan = require('flightplan');
'use strict';
var username = 'deploy';

// configuration
plan.target('staging', [
  {
    host: 'localhost',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: '/home/vagrant/.ssh/id_rsa'
  }
]);

plan.target('production', [
  {
    host: 'localhost',
    username: username,
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: '/home/vagrant/.ssh/id_rsa'
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

// run server on local
plan.local('local-run', function(local) {
  local.with('cd /home/deploy/nodejs/deploy', function(){
    local.exec('sh ./runserver.sh');
  });
});

/**
 * run command on server
 */
//install environment in server
plan.remote('server-install', function(remote) {
  remote.with('cd /home/deploy/nodejs/deploy', function(){
    remote.exec('sh ./install.sh');
  });
});

// Install dependences in server
plan.remote('server-deploy', function(remote) {
  remote.with('cd /home/deploy/nodejs/deploy', function(){
    remote.exec('sh ./deploy.sh');
  });
});

// run server in server
plan.remote('server-run', function(remote) {
  remote.with('cd /home/deploy/nodejs/deploy', function(){
    remote.exec('sh ./runserver.sh');
  });
});
