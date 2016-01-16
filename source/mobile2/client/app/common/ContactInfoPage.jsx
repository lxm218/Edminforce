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

            <RC.Card key={Math.random()} title="Contact Us">

                <div className="row">
                    <div className="col">

                        <center>
                            ~~~~~ FREMONT ~~~~~<br/>
                            Mon - Fri: 9am - 7pm<br/>
                            Sat - Sun: 8am - 6pm<br/><br/>

                            34075 Fremont Blvd<br/>
                            Fremont, CA 94555<br/>
                            (510) 790-7946<br/><br/>

                            ~~~~~ DUBLIN ~~~~~<br/>
                            M, W, F: 12n - 8pm<br/>
                            Tu, Th, Sa, Su: 9am - 5pm<br/><br/>

                            6175 Dublin Blvd<br/>
                            Dublin, CA 94568<br/>
                            (925) 248-2989<br/>
                        </center>


                    </div>

                </div>

            </RC.Card>

        </div>
    }
})