{
    injectTapEventPlugin();

    let {
        Home
        } = EdminForce.Components;


    EdminForce.Components.App = React.createClass({

        render: function () {

            return (
                <div>
                    <Home></Home>
                </div>
            );
        }
    });

}