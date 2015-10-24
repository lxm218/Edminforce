/**
 * Created on 10/23/15.
 */

Cal.ProgramsIndexPage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("admin/programs")

        return {
            programs: DB.Classes.find().fetch()

        }
    },
    render: function () {
        return <div>

            <RB.Panel >
                <Reactable.Table className="prop-table table table-striped table-bordered"
                                 data={this.data.programs}>

                </Reactable.Table>
            </RB.Panel >


        </div>;
    }

});