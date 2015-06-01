var path = require('path'),
    nconf = require('nconf');

nconf.argv()
     .env()
     .file({file: path.join(__dirname, '/../configs/local.json')});

console.log('Start with this configuration:', nconf.stores.file.file);

module.exports = nconf;
