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
plan.local('local', function(local) {
  local.log('Run local server');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  //local.exec('sh ./runserver.sh');
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote('local', function(remote) {
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+ appName, {user: username});

  remote.with('cd /home/deploy/onlineBlog/backend', function(){
    remote.exec('ls -la');
    remote.exec('sudo chmod +x bin/www');
    remote.exec('forever list');
    // remote.exec('forever stop bin/www');
    remote.exec('forever start bin/www');
  });
  //remote.exec('forever stop ~/' + startFile, {failsafe: true});
 // remote.exec('forever start ~/'+ startFile);
  //remote.exec('sh ./deploy.sh');
  //remote.exec('sh ./runserver.sh');
});
