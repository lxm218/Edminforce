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

        bookTrial(){
            let params = {
                programId: this.props.program._id
            };
            let path = FlowRouter.path("/programs/:programId", params);
            FlowRouter.go(path);
        },

        click(){
            if (this.state.style.display == 'none') {
                this.setState({
                    style: {
                        display: "block"
                    }
                });
            } else {
                this.setState({
                    style: {
                        display: "none"
                    }
                });
            }
        },

        render: function () {

            // Fill with your UI
            return (
                <RC.Div>
                    <RC.Button bgColor="brand1" onClick={this.click}>{this.props.program.name}</RC.Button>
                    <RC.Div style={this.state.style}>
                        <div style={{"fontSize":"12px"}} dangerouslySetInnerHTML={{__html: this.props.program.description}} />
                        //<RC.Button bgColor="brand2" theme="inline">Simple Art Work</RC.Button>
                        <RC.Button bgColor="brand2" theme="inline" onClick={this.bookTrial}>Book Trial Class</RC.Button>
                    </RC.Div>
                </RC.Div>
            );
        }
    });

}
