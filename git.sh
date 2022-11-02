#/bin/bash
set -e
MESSAGE=$1

git add ./.mockend.json
git commit -m "$1"
git push
