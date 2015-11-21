#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"

#echo PWD: $PWD
#echo MONGO_URL: $MONGO_URL
#
#meteor --port 4000

printf "params: %s %s %s\n " "$1" "$2" "$3"

export PACKAGE_ROOT=$PWD/../_packages_
export PACKAGE_DIRS=$PACKAGE_ROOT/ihealth:$PACKAGE_ROOT/both:$PACKAGE_ROOT/mobile:$PACKAGE_ROOT/webapp


if [ $1 = "env" ] ; then

  printf "packages path has been setted \n PACKAGE_DIRS: %s\n" $PACKAGE_DIRS
  exit 0

fi


meteor --port 8000
