#!/bin/bash

echo '### Updating system ...'
sudo apt-get update -y
sudo apt-get -y install git-core python g++ make checkinstall zlib1g-dev zip curl

echo "### Install Node & npm ..."
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get -y install nodejs
# Update npm
sudo npm -y -g install npm

echo '### Install MongoDB'
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee -a /etc/apt/sources.list.d/10gen.list
sudo apt-get -y update
sudo apt-get -y install mongodb-10gen

echo '### Install bower and grunt'
sudo npm install -g grunt-cli bower

echo '#### Install forever'

sudo npm install -g forever



