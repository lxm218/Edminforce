#!/usr/bin/env bash



deployAdminBase(){

	echo "---- start to deploy EF Admin Staging ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-staging;
    sudo mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
}

deployMobileBase(){
	# git clean -d -fx;
	sudo chmod 400 edminforce.pem;
	echo "---- connect to mobile-base server ----";
	CMD="cd Edminforce;git reset --hard;git pull;cd source/mobile-base;source aws.sh;"
	#echo "${CMD}"
	ssh -i "edminforce.pem" ubuntu@ec2-52-36-230-108.us-west-2.compute.amazonaws.com "${CMD}"
	sudo chmod 777 edminforce.pem;
}

deployToAdminProduction(){
	echo "---- start to deploy EF Admin Production ----";
	. ./ENV.inc
	echo ${ADMIN_ENV};
	cd admin-production;
	sudo mup setup;
	sudo ${ADMIN_ENV} mup deploy;
	cd ../;
}

case "$1" in
    admin)
        deployAdminBase
        ;;
	mobile)
		deployMobileBase
		;;
	admin-production)
		deployToAdminProduction
		;;
    *)
        echo "usage {admin|mobile}"
        ;;

esac