{

    // Don't forget to change `SomeName` to correct name
    EdminForce.Components.Classes = React.createClass({
        book(){
            let params = {
                cartId: "111"
            };
            let path = FlowRouter.path("/classes/:cartId/confirm", params);
            FlowRouter.go(path);
        },

        render: function () {

            const options = [
                "African Wild Dog",
                "Badger",
                "Catfish",
                "Donkey",
                "Fire-Bellied Toad",
                "Giant Clam",
                "Hercules Beetle",
                "Italian Blue Shark"
            ]
            return ( <RC.Div>
                    <h3>Registration for 2016</h3>
                    <RC.Select options={options} value="Donkey" label="Students" labelColor="brand1"/>
                    <RC.Select options={options} value="Fire-Bellied Toad" label="Classes" labelColor="brand1"/>
                    <RC.Button bgColor="brand2" bgColorHover="dark" onClick={this.book}>Book</RC.Button>

                </RC.Div>
            );
        }

    });

}