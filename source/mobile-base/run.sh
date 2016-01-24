#!/usr/bin/env bash

export PACKAGE_ROOT=$PWD/../library
export PACKAGE_DIRS=$PACKAGE_ROOT/both:$PACKAGE_ROOT/mobile:$PACKAGE_ROOT/webapp:$PWD/../_packages_/both:$PWD/../_packages_/module

LOG=true
PORT=5000
DIR=$PWD


startMongoDB(){
  echo "[INFO] Start Mongo DB Server"
  nohup mongod --dbpath ./data/db --port 6001 > /dev/null 2>&1 &
}

stopMongoDB() {
  stopProcess "mongod.*$PORT_MONGODB"
  stopProcess "tail.*logs/mongodb"
}

stopMongoDB
startMongoDB

export MONGO_URL=mongodb://localhost:6001/meteor

cd src

meteor run --port $PORT