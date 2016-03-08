{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsCollapse = React.createClass({

        propTypes: {
            program: React.PropTypes.object
        },

        getInitialState(){
            return {
                style: {
                    display: "none"
                }
            }
        },
        componentDidMount(){
            console.log("componentDidMount");
            if(this.props.collapse){
                this.setState({
                    style:{
                        display: "none"
                    }
                });
            }
        },

        componentWillReceiveProps(nextProps){
            //console.log("componentWillReceiveProps: ", nextProps);
            if(nextProps.collapse !== this.props.program._id){
                this.setState({
                    style:{
                        display: "none"
                    }
                });
            }else{
                this.setState({
                    style:{
                        display: "block"
                    }
                });
            }
        },

        bookTrial(){
            let params = {
                programId: this.props.program._id
            };
            let path = FlowRouter.path("/programs/:programId", params);
            FlowRouter.go(path);
        },

        click(){
            this.props.collapseAll(this.props.program._id);
        },

        render: function () {

            // Fill with your UI
            return (
                <RC.Div>
                    <RC.Button className="programs-button" bgColor="brand1" onClick={this.click}>{this.props.program.name}</RC.Button>
                    <RC.Div className="programs-description" style={this.state.style}>
                        <div style={{"fontSize":"12px"}} dangerouslySetInnerHTML={{__html: decodeURIComponent(this.props.program.description)}} />

                        <div style={{textAlign:"center"}}>
                            <RC.Button bgColor="brand2" theme="inline" onClick={this.bookTrial}>Book Trial Class</RC.Button>
                        </div>
                    </RC.Div>
                </RC.Div>
            );
        }
    });

}
