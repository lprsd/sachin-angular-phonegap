git pull
grunt build:phonegap
cd ../build
cp -R ../fe/dist .
rm -rf www
mv dist www
git commit -am $1
git push
