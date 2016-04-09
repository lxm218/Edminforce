
EdminForce.Components.Payment = () => (
    <div>
        <RC.Button onClick={FlowRouter.go("/paymentCredit")}>Use Credit Card, 3% Process Fee</RC.Button>
        <RC.Button onClick={FlowRouter.go("/paymentECheck")}>Use ECheck, $0.5 Process Fee</RC.Button>
    </div>
) 