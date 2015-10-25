/**
 * Created on 10/25/15.
 */

Cal.SessionsIndexPage = React.createClass({

    propTypes: {},
    mixins: [ReactMeteorData],
    getMeteorData() {

        //sessions

        Meteor.subscribe("sessions")

        return {
            sessions: DB.Sessions.find().fetch()

        }

    },

    render: function () {

        var columns = [
            {label: "Name", key: 'name', type: ""},
            {label: "RegisterStartDate", key: 'registerStartDate', type: ""},
            {label: "StartDate", key: 'startDate', type: ""},
            {label: "Status", key: 'Status', type: ""}

        ]
        var Table = Reactable.Table,
            Thead = Reactable.Thead,
            Th = Reactable.Th,
            Tr = Reactable.Tr,
            Td = Reactable.Td


        return <div>

            <RB.Panel >

                <RB.ButtonToolbar>

                    <RB.Button> New Session</RB.Button>

                </RB.ButtonToolbar>

                <Table
                    sortable={true}
                    filterable={['name', 'registerStartDate','startDate']}
                    className="prop-table table table-striped table-bordered">
                    <Thead>
                    {
                        columns.map(function (col) {

                            return <Th column={col.key} key={col.key}>
                                <strong className="name-header">{col.label}</strong>
                            </Th>
                        })
                    }
                    </Thead>


                    {
                        this.data.sessions.map(function (item) {
                            return <Tr key={item._id}>
                                {
                                    columns.map(function (col) {


                                        if (col.key == 'name' ) {
                                            console.log(col)

                                            let link = (
                                                <a href={"/adminSessions/detail/"+item._id}> {item.name} </a>
                                            )

                                            return <Td column={col.key}  key={col.key}  data={link}>

                                            </Td>
                                        }else {

                                            return <Td column={col.key} key={col.key} data= {item[col.key]}>
                                                {item[col.key]}
                                            </Td>
                                        }
                                    })
                                }


                                <Td column="action">

                                </Td>
                            </Tr>
                        })
                    }
                </Table>

            </RB.Panel >

        </div>;
    }

});