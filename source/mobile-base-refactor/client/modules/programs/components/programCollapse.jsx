
EdminForce.Components.ProgramCollapse = (props) => (
    <RC.Div>
        <RC.Button className="programs-button" 
                   bgColor="brand1"
                   onClick={props.toggleExpand.bind(null,props.program._id)}>{props.program.name}</RC.Button>
        {
            props.expand ? (
                <RC.Div className="programs-description" style={{"display":"block"}}>
                    <div style={{"fontSize":"12px"}}
                         dangerouslySetInnerHTML={{__html: decodeURIComponent(props.program.description)}}/>
                    <div style={{textAlign:"center"}}>
                        <RC.Button bgColor="brand2" theme="inline" onClick={props.bookTrial.bind(null,props.program._id)}>Book Trial Class</RC.Button>
                    </div>
                </RC.Div>
            ) : null
        }
    </RC.Div>
);