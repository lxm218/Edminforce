#!/usr/bin/env bash

sudo chmod 400 edminforce.pem;

deployAdminBase(){

	echo "---- connect to admin-base server ----";
	CMD="cd Edminforce;git pull;cd source/admin-base;source run.sh aws;"
	#echo "${CMD}"
	ssh -i "edminforce.pem" ubuntu@ec2-52-36-236-78.us-west-2.compute.amazonaws.com "${CMD}"
	sudo chmod 777 edminforce.pem;
}

deployMobileBase(){

	echo "---- connect to mobile-base server ----";
	CMD="cd Edminforce;git pull;cd source/mobile-base;source aws.sh;"
	echo "${CMD}"
	ssh -i "edminforce.pem" ubuntu@ec2-52-36-230-108.us-west-2.compute.amazonaws.com "${CMD}"
	sudo chmod 777 edminforce.pem;
}

case "$1" in
    admin)
        deployAdminBase
        ;;
	mobile)
		deployMobileBase
		;;
    *)
        echo "usage {admin|mobile}"
        ;;

esac