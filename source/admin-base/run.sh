#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"


#echo PWD: $PWD
#echo MONGO_URL: $MONGO_URL
#
#meteor --port 4000

printf "params: %s %s %s\n " "$1" "$2" "$3"

export MONGO_URL="mongodb://127.0.0.1:27017/EdminForce"

export PACKAGE_ROOT=$PWD/../_packages_
export RC_DIR=$PACKAGE_ROOT/ihealth-framework-ui/library
export PACKAGE_DIRS=$RC_DIR/both:$RC_DIR/mobile:$RC_DIR/webapp:$PACKAGE_ROOT/both:$PACKAGE_ROOT/module




meteor --port 8000
