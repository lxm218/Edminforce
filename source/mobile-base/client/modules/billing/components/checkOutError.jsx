
EdminForce.Components.CheckoutError = (props) => (
    <RC.Div style={{padding:"10px"}}>
        <RC.VerticalAlign center={true} className="padding" height="300px">
            <h2>{props.title}</h2>
        </RC.VerticalAlign>
        <RC.Div>
            <p>{props.message}</p>
            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={ () => {FlowRouter.go('/checkout')} }>Retry</RC.Button>            
        </RC.Div>
    </RC.Div>
)
