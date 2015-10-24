/**
 * Created on 10/19/15.
 */

Cal.FamiliesIndexPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {

        Meteor.subscribe("accounts")

        return {
            families: Meteor.users.find().fetch()

        }
    },

    openEdit(item){

        alert(item._id)

    },


    render: function () {

        var self = this;

        var Table = Reactable.Table,
            Thead = Reactable.Thead,
            Th = Reactable.Th,
            Tr = Reactable.Tr,
            Td = Reactable.Td


        var columns = [
            {label: "Customer Name", key: 'name', type: "profile"},
            {label: "Program", key: 'program', type: ""},
            {label: "Email", key: 'address', type: "email"},
            {label: "Phone", key: 'phone', type: "profile"},
            {label: "Action", key: 'action', type: "action"}

        ]







        return <div>

            <RC.Grids>

                <div size="full">

                    <RC.Card>
                        <Table
                            sortable={true}
                            filterable={['name', 'address']}
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
                                this.data.families.map(function (item) {
                                    return <Tr key={item._id}>
                                        {
                                            columns.map(function (col) {


                                                if (col.type == 'profile' && col.key == 'name' ) {
                                                    console.log(col)

                                                    let link = (
                                                        <a href={"/adminFamilies/detail/"+item._id}> {item.profile[col.key]} </a>
                                                    )

                                                    return <Td column={col.key}  key={col.key}  data={link}>
                                                        {Reactable.unsafe(link)}
                                                    </Td>
                                                }else if (col.type == 'profile') {

                                                    return <Td column={col.key}  key={col.key}  data={item.profile[col.key]}>
                                                        {item.profile[col.key]}
                                                    </Td>
                                                } else if (col.type == 'email') {

                                                    return <Td column={col.key}  key={col.key} data={item.emails[0] && item.emails[0].address}>
                                                        {item.emails[0] && item.emails[0].address}
                                                    </Td>
                                                }else {

                                                    return <Td column={col.key} key={col.key} data= {item[col.key]}>
                                                        {item[col.key]}
                                                    </Td>
                                                }
                                            })
                                        }


                                        <Td column="action">
                                            <RC.Button className="bg-brand" text="Edit" clickHandler={self.openEdit.bind(self,item)}>

                                            </RC.Button>

                                        </Td>
                                    </Tr>
                                })
                            }
                        </Table>

                    </RC.Card>


                </div>


            </RC.Grids>

        </div>;
    }

});