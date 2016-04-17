#!/usr/bin/env bash

echo "pwd = ${PWD}"

PACKAGE_ROOT=$PWD/../_packages_
RC_DIR=$PACKAGE_ROOT/ihealth-framework-ui/library
export PACKAGE_DIRS=$RC_DIR/both:$RC_DIR/mobile:$RC_DIR/webapp:$PACKAGE_ROOT/both:$PACKAGE_ROOT/module
echo "---- set env complete ----"

echo "PACKAGE_DIRS = ${PACKAGE_DIRS}"
