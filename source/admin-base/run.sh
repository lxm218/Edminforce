#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"



PACKAGE_ROOT=$PWD/../_packages_
RC_DIR=$PACKAGE_ROOT/ihealth-framework-ui/library
ENV="PACKAGE_DIRS=$RC_DIR/both:$RC_DIR/mobile:$RC_DIR/webapp:$PACKAGE_ROOT/both:$PACKAGE_ROOT/module"
#echo $ENV

runLocalHost(){

    PORT=8000

    tmp=`echo $1 |sed 's/[0-9]//g'`
    if [ -n "$1" ] && [ -z "${tmp}" ] && [ $1 -gt 2900 ]
    then
        PORT=$1
        echo "PORT=$PORT"
    fi


    export MONGO_URL="mongodb://127.0.0.1:27017/EdminForce"

    echo "---- start set env ----"
    export $ENV
    echo "PACKAGE_DIRS=${PACKAGE_DIRS}"
    echo "---- set env end ----"

    meteor --settings settings-dev.json --port $PORT
}


deploy(){
    REMOTEURL="edminforce.meteor.com"
    echo "start deploy to ${REMOTEURL}"
    sudo $ENV meteor deploy ${REMOTEURL} --settings settings-dev.json

    echo "---- deploy success ----"
}

case "$1" in
    deploy)
        deploy
        ;;
    *)
        runLocalHost $1
        ;;

esac




