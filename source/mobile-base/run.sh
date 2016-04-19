#!/usr/bin/env bash

export IHEALTH_ROOT=$PWD/../_packages_/ihealth-framework-ui/library
export PACKAGE_DIRS=$IHEALTH_ROOT/both:$IHEALTH_ROOT/mobile:$IHEALTH_ROOT/webapp:$PWD/../_packages_/module

LOG=true
PORT=5010
DIR=$PWD
PORT_MONGODB=27017


startMongoDB() {
  echo "[INFO] Start Mongo DB Server"
  nohup mongod --dbpath ./data/db --port $PORT_MONGODB > /dev/null 2>&1 &
}

stopMongoDB() {
  stopProcess "mongod.*$PORT_MONGODB"
  stopProcess "tail.*logs/mongodb"
}

stopProcess() {
  ps -ef | grep "$1" | grep -v grep | awk '{print $2}' | xargs kill -9
}

deploy(){
    REMOTEURL="ef.meteor.com"
    echo "[info]start deploy to ${REMOTEURL}"
    cd src
    meteor deploy ${REMOTEURL}
    echo "---- deploy success ----"
}

runLocal(){
  #stopMongoDB
  #startMongoDB
  export MONGO_URL=mongodb://localhost:27017/EdminForce

  #staging mongodb
  #export MONGO_URL=mongodb://calcolor:Icalcolor123!@aws-us-east-1-portal.13.dblayer.com:10587/calcolor-stag?ssl=true
  meteor run --settings settings.json --port $PORT
}

runForJackyTest(){
    export MONGO_URL=mongodb://localhost:27017/EdminForce
    cd src
    meteor run --port 7000
}


case "$1" in
    deploy)
        deploy
        ;;
    jacky)
        runForJackyTest
        ;;
    *)
        runLocal
        ;;

esac

