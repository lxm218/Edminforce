
EdminForce.Actions._ModuleName_ = {
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
        LocalState.set('WAIT_ACCOUNT', false);
    }
};

EdminForce.Contexts._ModuleName_ = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts._ModuleName_, EdminForce.Actions._ModuleName_);