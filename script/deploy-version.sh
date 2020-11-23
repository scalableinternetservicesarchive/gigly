#!/bin/bash

##########################################################################
# deploy.sh
#
# Usage:
#   ./script/deploy.sh [sha]
#
##########################################################################

set -e

usage="Usage: deploy.sh [sha]"

if [ -z "$1" ]; then
  echo "$usage"
  exit 1
fi

echo "DEPLOYING VERSION: $1"

echo "updating lambda gigly"
aws lambda update-function-code \
  --region us-west-2 \
  --function-name gigly \
  --s3-bucket cloudcity-build-artifacts \
  --s3-key server/$1.jar

echo "updating gigly-app-web"
./script/deploy-ecs.sh gigly-app-web $1

# echo "updating gigly-app-background"
# ./script/deploy-ecs.sh gigly-app-background $1

echo "DONE"
