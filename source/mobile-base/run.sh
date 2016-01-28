#!/usr/bin/env bash

export IHEALTH_ROOT=$PWD/../_packages_/ihealth-framework-ui/library
export PACKAGE_DIRS=$IHEALTH_ROOT/both:$IHEALTH_ROOT/mobile:$IHEALTH_ROOT/webapp:$PWD/../_packages_/module

LOG=true
PORT=5010
DIR=$PWD


startMongoDB() {
  echo "[INFO] Start Mongo DB Server"
  nohup mongod --dbpath ./data/db --port 6001 > /dev/null 2>&1 &
}

stopMongoDB() {
  stopProcess "mongod.*$PORT_MONGODB"
  stopProcess "tail.*logs/mongodb"
}

stopProcess() {
  ps -ef | grep "$1" | grep -v grep | awk '{print $2}' | xargs kill -9
}

#stopMongoDB
#startMongoDB

#export MONGO_URL=mongodb://localhost:6001/meteor

cd src

meteor run --port $PORT