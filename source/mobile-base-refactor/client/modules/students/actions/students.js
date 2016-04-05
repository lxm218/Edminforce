
EdminForce.Actions.Students = {
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Students = {
    LocalState: new ReactiveDict(),
    SubManager: new SubsManager({
        // maximum number of cached subscriptions
        cacheLimit: 20,
        // expiration time in minutes
        expireIn: 30
    })
}

ReactDI.injectContext(EdminForce.Contexts.Students, EdminForce.Actions.Students);