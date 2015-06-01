
echo '### Install dependencies of frontend'
current_root=$(pwd)

cd "$current_root"
cd "../nodejs/frontend"
sudo npm install
bower install --allow-root

echo "#### Build frontend source code ..."
grunt build

echo '### Install dependencies of backend'
cd "$current_root"
cd "../nodejs/backend"
sudo npm install

