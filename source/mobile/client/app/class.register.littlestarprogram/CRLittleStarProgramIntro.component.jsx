Cal.CRLittleStartProgramIntro = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function () {
        return {};
    },
    register: function () {
        //console.log("Click Register");
        FlowRouter.go('littlestar_register');
    },
    render: function () {
        return (
            <div key={Math.random()}>

                <RC.Card key={Math.random()} title="Little Star Program">

                    <p className="padding-left padding-right">
                        Little Star Program created and designed by Head Coach: twice a week, for selected swimmers to receive special lessons and training.
                    </p>

                    <p className="padding-left padding-right">
                        Tue and Thu 3:45-4:45pm
                    </p>

                    <br/>
                    <br/>
                    <br/>

                    <p className="padding-left padding-right">
                        Price: $528 (29 classes; $18/cls)
                    </p>

                </RC.Card>


                <p className="padding-left padding-right">

                    <button onClick={this.register}
                            className="button button-full button-brand ">
                        Register
                    </button>
                </p>


            </div>
        );
    }
});