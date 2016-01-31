{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.ProgramsList = React.createClass({

        bookTrial(){
            //TODO Add condition of book trail

            // To show the flow, jump to login page
            FlowRouter.go('/programs/111');
        },

        render: function () {

            // Fill with your UI
            return (
                <div>
                    Program Lists
                    <RC.Button onClick={this.bookTrial}>Book Trial</RC.Button>
                </div>
            );
        }
    });

}