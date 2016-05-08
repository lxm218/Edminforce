#!/usr/bin/env bash

deployAdminBase(){
    echo "*************************************************";
	 echo "---- start to deploy EF Admin Staging ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-staging;
    sudo mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
    echo "link : https://scalcolor-admin.classforth.com/home";
    echo "*************************************************";
    echo "";
}

deployMobileBase(){
    echo "*************************************************";
	 echo "---- start to deploy EF Mobile Production ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-staging;
    sudo mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://scalcolor.classforth.com";
    echo "*************************************************";
    echo "";
}

deployMobileProduction(){
    echo "*************************************************";
	 echo "---- start to deploy EF Mobile Production ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-production;
    sudo mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://calcolor.classforth.com/";
    echo "*************************************************";
    echo "";
}

deployAdminProduction(){
    echo "*************************************************";
	 echo "---- start to deploy EF Admin Production ----";
	 . ./ENV.inc
	 echo ${ADMIN_ENV};
	 cd admin-production;
    sudo mup setup;
	 sudo ${ADMIN_ENV} mup deploy;
	 cd ../;
 	 echo "link : https://calcolor-admin.classforth.com/home";
    echo "*************************************************";
    echo "";
}

deployAdminDemo(){
    echo "*************************************************";
	 echo "---- start to deploy EF Admin Demo ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-demo;
    sudo mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
    echo "link : https://demo-admin.classforth.com/home";
    echo "*************************************************";
    echo "";
}

deployMobileDemo(){
    echo "*************************************************";
	 echo "---- start to deploy EF Mobile Demo ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-demo;
    sudo mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://demo.classforth.com";
    echo "*************************************************";
    echo "";
}

deployAdminCalphin(){
    echo "*************************************************";
	 echo "---- start to deploy EF Admin Calphin ----";
    . ./ENV.inc
    echo ${ADMIN_ENV};
    cd admin-calphin;
    sudo mup setup;
    sudo ${ADMIN_ENV} mup deploy;
    cd ../;
    echo "link : https://calphin-admin.classforth.com/home";
    echo "*************************************************";
    echo "";

}

deployMobileCalphin(){
    echo "*************************************************";
	 echo "---- start to deploy EF Mobile Calphin ----";
    . ./ENV.inc
    echo ${MOBILE_ENV};
    cd mobile-calphin;
    sudo mup setup;
    sudo ${MOBILE_ENV} mup deploy;
    cd ../;
    echo "link : https://calphin.classforth.com";
    echo "*************************************************";
    echo "";
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
      deployMobileProduction
      ;;
	admin-production)
		deployAdminProduction
		;;
	calphin)
      deployAdminCalphin
		deployMobileCalphin
		;;
   all)
      deployAdminBase
		deployMobileBase
      deployAdminDemo
		deployMobileDemo
      deployMobileProduction
		deployAdminProduction
		;;
   *)
      echo "usage {admin|mobile|admin-production|mobile-production}"
      ;;

esac
