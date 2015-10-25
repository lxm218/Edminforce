/**
 * Created on 10/23/15.
 */

Cal.RegistrationIndexPage = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("admin/registers")

        return {
            programs: DB.ClassesRegister.find().fetch()

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