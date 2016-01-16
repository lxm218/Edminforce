#!/usr/bin/env bash

export PACKAGE_ROOT=$PWD/../library
export PACKAGE_DIRS=$PACKAGE_ROOT/both:$PACKAGE_ROOT/mobile:$PACKAGE_ROOT/webapp:$PWD/../_packages_/both:$PWD/../_packages_/module

cd src

meteor run --port 5000