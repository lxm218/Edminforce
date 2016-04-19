

EdminForce.Actions.Home = {
    goToPrograms() {
        FlowRouter.go('/programs');
    },

    goToAccount() {
        EdminForce.utils.authGo('/account');
    },

    goToContact() {
        FlowRouter.go('/contact');
    }
}