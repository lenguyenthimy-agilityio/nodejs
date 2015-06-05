echo '#### Run server'
current_root=$(pwd)

cd "$current_root"
cd "../backend"
forever stopall
forever start bin/www --server=development --port=8080
