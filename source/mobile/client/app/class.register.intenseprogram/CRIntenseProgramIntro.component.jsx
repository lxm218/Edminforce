Cal.CRIntenseProgramIntro = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData: function () {
        return {};
    },
    register: function () {
        console.log("Click Register");
    },
    render: function () {
        return (
            <div key={Math.random()}>

                <RC.Card key={Math.random()} title="Intense Program">

                    <p className="padding-left padding-right">
                        Four times a week: Mon-Thu
                    </p>

                    <p className="padding-left padding-right">
                        Classes range from 9am-5pm
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