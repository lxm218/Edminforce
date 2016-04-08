
EdminForce.Actions.Billing = {
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
    }
};

EdminForce.Contexts.Billing = {
    LocalState: new ReactiveDict(),
    MethodCache: {},    
}

ReactDI.injectContext(EdminForce.Contexts.Billing, EdminForce.Actions.Billing);