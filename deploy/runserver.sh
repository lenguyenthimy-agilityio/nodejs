echo '#### Run server'
current_root=$(pwd)

cd "$current_root"
<<<<<<< HEAD
cd "../backend"
forever stopall
=======
cd "../nodejs/backend"
>>>>>>> 28ba9dfe3a4ad6211451af48eaa5ee97c9c3ca22
forever start bin/www --server=development
