Cal.CRFastrackProgramIntro = React.createClass({
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
                        Fastrack program-Get ready for competitive swimming: twice a week, for selected swimmers to receive special lessons and training.
                    </p>

                    <p className="padding-left padding-right">
                        Tue and Thu 6:30-7:30am
                    </p>

                    <br/>
                    <br/>
                    <br/>

                    <p className="padding-left padding-right">
                        Price: $354; (29 Practices; $12/practice)
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