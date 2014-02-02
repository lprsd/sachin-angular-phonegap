cp -R ../fe/dist .
rm -rf www
mv dist www
git status
git commit -am $1
