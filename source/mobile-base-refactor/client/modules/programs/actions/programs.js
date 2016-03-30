
EdminForce.Actions.Programs = {
    bookTrial({LocalState}, programId) {
        
    },
    
    clearErrors({LocalState}, errorName) {
        LocalState.set(errorName, null);
        LocalState.set('WAIT_ACCOUNT', false);
    }
};

EdminForce.Contexts.Programs = {
    LocalState: new ReactiveDict()
}

ReactDI.injectContext(EdminForce.Contexts.Programs, EdminForce.Actions.Programs);