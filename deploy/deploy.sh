
echo '### Install dependencies of frontend'
current_root=$(pwd)

cd "$current_root"
<<<<<<< HEAD
cd "../frontend"
sudo npm install
bower install
=======
cd "../nodejs/frontend"
sudo npm install
bower install --allow-root
>>>>>>> 28ba9dfe3a4ad6211451af48eaa5ee97c9c3ca22

echo "#### Build frontend source code ..."
grunt build

echo '### Install dependencies of backend'
cd "$current_root"
<<<<<<< HEAD
cd "../backend"
sudo apt-get clean
=======
cd "../nodejs/backend"
>>>>>>> 28ba9dfe3a4ad6211451af48eaa5ee97c9c3ca22
sudo npm install

