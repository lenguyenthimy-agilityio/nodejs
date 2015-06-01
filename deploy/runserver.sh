echo '#### Run server'
current_root=$(pwd)

cd "$current_root"
cd "../nodejs/backend"
forever start bin/www --server=development
