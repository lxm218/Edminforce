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
                    <RC.Button bgColor="brand1" onClick={this.bookTrial}>Beginning</RC.Button>
                    <RC.Div>
                        Class Level: 1
                    </RC.Div>
                    <RC.Button bgColor="brand2" onClick={this.bookTrial}>Book Trial</RC.Button>
                </div>
            );
        }
    });

}