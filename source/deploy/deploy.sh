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
    echo "link : https://sadmin.calcolor.classforth.com";
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
    echo "link : http://www.classforth.com";
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
	echo "link : http://admin.classforth.com/home";
}

case "$1" in
  admin)
    deployAdminBase
    ;;
	mobile)
		deployMobileBase
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
