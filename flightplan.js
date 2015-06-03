var plan = require('flightplan');
'use strict';
var appName = 'onlineBlog';
var username = 'deploy';
var startFile = 'bin/www';

var tmpDir = appName + '-' + new Date().getTime();

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

// run commands on localhost
plan.local('build', function(local) {
  local.with('cd /home/deploy/nodejs/deploy', function() {
    local.exec('ls -la');
    local.exec('sh deploy.sh');
  });
});

// run commands on remote hosts (destinations)
plan.remote('local', function(remote) {

  remote.with('cd /home/deploy/onlineBlog/backend', function(){
    remote.exec('ls -la');
    remote.exec('sudo chmod +x bin/www');
    remote.exec('forever list');
    // remote.exec('forever stop bin/www');
    remote.exec('forever start bin/www');
  });

});
