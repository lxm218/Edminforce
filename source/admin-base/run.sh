#!/usr/bin/env bash

# export MONGO_URL="mongodb://jason:14dDSAdfK48XzAQpWoirL25j@c287.candidate.3.mongolayer.com:10287,candidate.3.mongolayer.com:10287,candidate.2.mongolayer.com:10325/framework?replicaSet=set-5580764dfc2b3f7b5f00001b"



ENV1="PACKAGE_ROOT=$PWD/../_packages_"
ENV2="RC_DIR=$PACKAGE_ROOT/ihealth-framework-ui/library"
ENV3="PACKAGE_DIRS=$RC_DIR/both:$RC_DIR/mobile:$RC_DIR/webapp:$PACKAGE_ROOT/both:$PACKAGE_ROOT/module"

runLocalHost(){
    export MONGO_URL="mongodb://127.0.0.1:27017/EdminForce"

    echo "---- start set env ----"
    export ${ENV1}
    export ${ENV2}
    export ${ENV3}
    echo "---- set env end ----"
    meteor --port 8000
}


deploy(){
    REMOTEURL="edminforce.meteor.com"
    echo "start deploy to ${REMOTEURL}"
    sudo ${ENV1} ${ENV2} ${ENV3} meteor deploy ${REMOTEURL}
    echo "PACKAGE_ROOT = ${PACKAGE_ROOT}"
    echo "RC_DIR = ${RC_DIR}"
    echo "PACKAGE_DIRS = ${PACKAGE_DIRS}"
    echo "---- deploy success ----"
}

case "$1" in
    deploy)
        deploy
        ;;
    *)
        runLocalHost
        ;;

esac




