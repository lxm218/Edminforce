
EdminForce.Actions.Billing = {
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Billing = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts.Billing, EdminForce.Actions.Billing);