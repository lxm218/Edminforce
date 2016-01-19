#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"

#echo PWD: $PWD
#echo MONGO_URL: $MONGO_URL
#
#meteor --port 4000

printf "params: %s %s %s\n " "$1" "$2" "$3"

export PACKAGE_ROOT=$PWD/../library
export PACKAGE_DIRS=$PACKAGE_ROOT/both:$PACKAGE_ROOT/mobile:$PACKAGE_ROOT/webapp:$PWD/../_packages_/both:$PWD/../_packages_/module




meteor --port 8000
