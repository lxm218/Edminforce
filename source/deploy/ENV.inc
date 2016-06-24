
PACKAGE_ROOT=$PWD/../_packages_;
RC_DIRS=${PACKAGE_ROOT}/ihealth-framework-ui/library/both:${PACKAGE_ROOT}/ihealth-framework-ui/library/mobile:${PACKAGE_ROOT}/ihealth-framework-ui/library/webapp;
MODULE_DIRS=${PACKAGE_ROOT}/module;

ADMIN_PACKAGE_DIRS=${RC_DIRS}:${MODULE_DIRS}:${PACKAGE_ROOT}/both;


ADMIN_ENV="PACKAGE_DIRS=${ADMIN_PACKAGE_DIRS}";



#MOBILE_BASE_PACKAGES=${PACKAGE_ROOT}/../mobile-base/packages;

MOBILE_PACKAGE_DIRS=${RC_DIRS}:${MODULE_DIRS};

MOBILE_ENV="PACKAGE_DIRS=${MOBILE_PACKAGE_DIRS}";