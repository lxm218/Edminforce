/**
 * Created on 9/14/15.
 */

Cal.CRRegistraionInfoPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {

        return <div key={Math.random()}>



            <RC.Card key={Math.random()} title="Register Info">
                <div className="row">
                    <div className="col">

                        <p>

                            sfas
                            sfasf
                            fasf
                            sfas
                            sfasf
                            fasfsfas
                            sfasf
                            fasfsfas
                            sfasf
                        </p>

                        <p>
                            fasfsfas
                            sfasf
                            fasfsfas
                            sfasf
                            fasfsfas
                            sfasf
                            fasfsfas
                            sfasf
                            fasfsfas
                            sfasf
                            fasf
                        </p>

                    </div>

                </div>

            </RC.Card>


            <p className="padding-left padding-right">

                <a href="/classRegister/register"
                   className="button button-full button-brand ">

                    Continue
                </a>
            </p>




        </div>
    }
})