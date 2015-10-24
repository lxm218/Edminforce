/**
 * Created on 10/23/15.
 */

Cal.StudentsIndexPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("admin/swimmers")

        return {
            students: DB.Swimmers.find().fetch()

        }
    },

    render: function () {
        return <div>

            <RB.Panel >
                <Reactable.Table className="prop-table table table-striped table-bordered"
                                 data={this.data.students}>

                </Reactable.Table>
            </RB.Panel >


        </div>;
    }

});