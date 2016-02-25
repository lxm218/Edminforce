#!/usr/bin/env bash


export IHEALTH_ROOT=$PWD/../_packages_/ihealth-framework-ui/library
export PACKAGE_DIRS=$IHEALTH_ROOT/both:$IHEALTH_ROOT/mobile:$IHEALTH_ROOT/webapp:$PWD/../_packages_/module

export MONGO_URL=mongodb://172.31.19.151:27017/EdminForce

PORT=8000
ps -ef |grep meteor|grep $PORT |awk '{print $2}'|xargs sudo kill -9

echo "PACKAGE_DIRS=${PACKAGE_DIRS}"

meteor run --port $PORT >nohup.log &