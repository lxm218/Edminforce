#!/usr/bin/env bash

deployAdminBase(){

	echo "---- start to deploy EF Admin Staging ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-staging;
    # sudo mup setup;
    #sudo ${MOBILE_ENV} mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
    echo "link : https://scalcolor-admin.classforth.com/home";
}

deployMobileBase(){
	echo "---- start to deploy EF Mobile Production ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-staging;
    # sudo mup setup;
    #sudo ${MOBILE_ENV} mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://scalcolor.classforth.com";
}

deployMobileBaseProduction(){
	echo "---- start to deploy EF Mobile Production ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-production;
    # sudo mup setup;
    #sudo ${MOBILE_ENV} mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://calcolor.classforth.com/";
}

deployToAdminProduction(){
	echo "---- start to deploy EF Admin Production ----";
	. ./ENV.inc
	echo ${ADMIN_ENV};
	cd admin-production;
   # sudo mup setup;
	#sudo ${MOBILE_ENV} mup setup;
	sudo ${ADMIN_ENV} mup deploy;
	cd ../;
	echo "link : https://calcolor-admin.classforth.com/home";
}

deployAdminDemo(){

	echo "---- start to deploy EF Admin Demo ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-demo;
    sudo mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
    echo "link : https://demo-admin.classforth.com/home";
}

deployMobileDemo(){
	echo "---- start to deploy EF Mobile Demo ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-demo;
    sudo mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://demo.classforth.com";
}
case "$1" in
   admin)
     deployAdminBase
     ;;
	mobile)
		deployMobileBase
		;;
   admin-demo)
     deployAdminDemo
     ;;
	mobile-demo)
		deployMobileDemo
		;;
	mobile-production)
    deployMobileBaseProduction
    ;;
	admin-production)
		deployToAdminProduction
		;;
    *)
        echo "usage {admin|mobile|admin-production|mobile-production}"
        ;;

esac
