// EdminForce.Components.Home0 = ({actions}) => (
//     <RC.Div>
//         <RC.List style={{padding: "30px"}}>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <p className="font_8" style={{textAlign:"center"}}>Welcome! Please select following options to continue</p>
//             </RC.Item>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToPrograms}>Trial Class</RC.Button>
//             </RC.Item>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToRegistration}>Registration</RC.Button>
//             </RC.Item>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToMakeup}>Make up Class</RC.Button>
//             </RC.Item>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToAccount}>My Account</RC.Button>
//             </RC.Item>
//             <RC.Item style={{border: "none", padding: 0}}>
//                 <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToStudents}>Class Records</RC.Button>
//             </RC.Item>
//         </RC.List>
//
//         <RC.Div style={{"textAlign": "center"}}>
//             <p/>
//             <p className="font_8">If you have any questions regarding how to use this site, please watch tutorial video <a href="http://classforth.com/tutorial-students/" className="color_19" target="_blank">here</a>.</p>
//             <p/>
//             <p className="font_9">47816 Warm Springs Blvd, Fremont, CA</p>
//             <p className="font_9">help@CalColorAcademy.com</p>
//             <p className="font_9">Front-Desk: 510-580-6883</p>
//             <p className="font_9">School Director: 530-204-8869</p>
//         </RC.Div>
//
//         <RC.Div style={{textAlign: "center", marginTop:20}}>
//             <p style={{fontSize: "16px"}} className="font_8">
//               <br/>
//                 <span style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_9">Powered by </span> <a href="http://www.classforth.com" style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_19"  target="_blank">Classforth</a>
//             </p>
//         </RC.Div>
//     </RC.Div>
// )
//


EdminForce.Components.Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let x = Meteor.subscribe('school');
        return {
            ready : x.ready(),
            school : Collections.school.findOne({})
        };
    },

    render() {
        if (!this.data.ready)
            return (
                <RC.Loading isReady={false}></RC.Loading>
            )

        let actions = this.props.actions;
            return (
                <RC.Div>
                    <RC.List style={{padding: "30px"}}>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <p className="font_8" style={{textAlign:"center"}}>Welcome! Please select following options to continue</p>
                        </RC.Item>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToPrograms}>Trial Class</RC.Button>
                        </RC.Item>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToRegistration}>Registration</RC.Button>
                        </RC.Item>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToMakeup}>Make up Class</RC.Button>
                        </RC.Item>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToAccount}>My Account</RC.Button>
                        </RC.Item>
                        <RC.Item style={{border: "none", padding: 0}}>
                            <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToStudents}>Class Records</RC.Button>
                        </RC.Item>
                    </RC.List>

                    <RC.Div style={{"textAlign": "center"}}>
                        <p/>
                        <p className="font_8">If you have any questions regarding how to use this site, please watch tutorial video <a href="http://classforth.com/tutorial-students/" className="color_19" target="_blank">here</a>.</p>
                        <p/>
                        <p className="font_9">{this.data.school.address}, {this.data.school.city}, {this.data.school.state}</p>
                        <p className="font_9">{this.data.school.email}</p>
                        <p className="font_9">Front-Desk: {this.data.school.phone}</p>
                    </RC.Div>

                    <RC.Div style={{textAlign: "center", marginTop:20}}>
                        <p style={{fontSize: "16px"}} className="font_8">
                            <br/>
                            <span style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_9">Powered by </span> <a href="http://www.classforth.com" style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_19"  target="_blank">Classforth</a>
                        </p>
                    </RC.Div>
                </RC.Div>
            )
    }
})
