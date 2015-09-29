/**
 * Created on 9/22/15.
 */

Cal.ContactInfoPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <div key={Math.random()}>

            <RC.Card key={Math.random()} title="Contact Info">
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

        </div>
    }
})