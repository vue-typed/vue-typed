#! /bin/bash

cd docs
rm -rf _book
gitbook build
cd _book
git init
git add .
git commit -m "update book"
git push -f git@github.com:vue-typed/vue-typed.git master:gh-pages