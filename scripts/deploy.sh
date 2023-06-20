#!/usr/bin/env sh

# Make sure the script throws the error encountered
set -e


# Generate static files
pnpm build:docs

# Go to the generated folder
cd docs/

# If you are publishing to a custom domain
# echo 'github.saqqdy.com' > CNAME

git init
git add .
git commit -m 'deploy'

# if publishing to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# Replace <USERNAME> with your own Github username and <REPO> with the repository name, for example, in my case it's
git push -f git@github.com:saqqdy/clipboard-parser.git master:gh-pages

cd -
