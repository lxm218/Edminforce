#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"



PACKAGE_ROOT=$PWD/../_packages_
RC_DIR=$PACKAGE_ROOT/ihealth-framework-ui/library
ENV="PACKAGE_DIRS=$PACKAGE_ROOT/both:$RC_DIR/both:$RC_DIR/mobile:$RC_DIR/webapp:$PACKAGE_ROOT/module"

MONGOURL=mongodb://127.0.0.1:27017/KidsArt
#MONGOURL=mongodb://calcolor:Icalcolor123!@aws-us-east-1-portal.13.dblayer.com:10587/calcolor-stag?ssl=true
#MONGOURL=mongodb://calcolor:Icalcolor123!@aws-us-east-1-portal.13.dblayer.com:10587/calcolor?ssl=true

#echo $ENV

stopMongoDB() {
  stopProcess "mongod.*$PORT_MONGODB"
  stopProcess "tail.*logs/mongodb"
}

stopProcess() {
  ps -ef | grep "$1" | grep -v grep | awk '{print $2}' | xargs kill -9
}
runLocalHost(){

    PORT=8000
    #stopMongoDB

    tmp=`echo $1 |sed 's/[0-9]//g'`
    if [ -n "$1" ] && [ -z "${tmp}" ] && [ $1 -gt 2900 ]
    then
        PORT=$1
        echo "PORT=$PORT"
    fi


    export MONGO_URL=$MONGOURL

    echo "---- start set env ----"
    export $ENV
    echo "PACKAGE_DIRS=${PACKAGE_DIRS}"
    echo "---- set env end ----"

    meteor --settings settings-dev.json --port $PORT
}


deploy(){


    sudo $ENV mup deploy

    echo "---- deploy success ----"
}

aws(){
    PORT=8000
    ps -ef |grep meteor|grep $PORT |awk '{print $2}'|xargs sudo kill -9
    export MONGO_URL=$MONGOURL
    echo "---- start set env ----"
    export $ENV
    echo "PACKAGE_DIRS=${PACKAGE_DIRS}"
    echo "---- set env end ----"

    meteor run --port $PORT --settings settings-dev.json >nohup.log &
}

case "$1" in
    deploy)
        deploy
        ;;
    aws)
        aws
        ;;
    *)
        runLocalHost $1
        ;;

esac




