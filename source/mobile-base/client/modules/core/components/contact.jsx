// EdminForce.Components.Contact = (props) => (
//     <RC.Div>
//         <RC.VerticalAlign center={true} className="padding" height="300px">
//             <h2>Contact Us</h2>
//         </RC.VerticalAlign>
//
//         <RC.List id="contactInfo">
//             <RC.ItemIcons uiClass="phone" uiColor="brand2">Phone: 510-580-6883</RC.ItemIcons>
//             <RC.ItemIcons uiClass="envelope" uiColor="brand2">Email: help@calcoloracademy.com</RC.ItemIcons>
//             <RC.ItemIcons uiClass="globe" uiColor="brand2">Address: 47816 Warm Springs Blvd, Fremont, California 94536</RC.ItemIcons>
//         </RC.List>
//     </RC.Div>
// );
//

EdminForce.Components.Contact = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let x = Meteor.subscribe('school');
        return {
            ready: x.ready(),
            school: Collections.school.findOne({})
        };
    },

    render() {
        if (!this.data.ready)
            return (
                <RC.Loading isReady={false}></RC.Loading>
            )

        return (
            <RC.Div>
                <RC.VerticalAlign center={true} className="padding" height="300px">
                    <h2>Contact Us</h2>
                </RC.VerticalAlign>

                <RC.List id="contactInfo">
                    <RC.ItemIcons uiClass="phone" uiColor="brand2">Phone: {this.data.school.phone}</RC.ItemIcons>
                    <RC.ItemIcons uiClass="envelope" uiColor="brand2">Email: {this.data.school.email}</RC.ItemIcons>
                    <RC.ItemIcons uiClass="globe" uiColor="brand2">Address: {this.data.school.address}, {this.data.school.city}, {this.data.school.state} {this.data.school.zipcode}</RC.ItemIcons>
                </RC.List>
            </RC.Div>
        )
    }
})