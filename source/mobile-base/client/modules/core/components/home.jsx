EdminForce.Components.Home = ({actions}) => (
    <RC.Div>
        <RC.List style={{padding: "30px"}}>
            <RC.Item style={{border: "none", padding: 0}}>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToPrograms}>Trial Class</RC.Button>
            </RC.Item>
            <RC.Item style={{border: "none", padding: 0}}>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToRegistration}>Registration</RC.Button>
            </RC.Item>
            <RC.Item style={{border: "none", padding: 0}}>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToStudents}>Make up Class</RC.Button>
            </RC.Item>
            <RC.Item style={{border: "none", padding: 0}}>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToAccount}>My Account</RC.Button>
            </RC.Item>
            <RC.Item style={{border: "none", padding: 0}}>
                <RC.Button bgColor="brand2" bgColorHover="dark" onClick={actions.goToStudents}>My Students</RC.Button>
            </RC.Item>
        </RC.List>

        <RC.Div style={{"textAlign": "center"}}>
            <p/>
            <p className="font_9">47816 Warm Springs Blvd, Fremont, CA</p>
            <p className="font_9">help@CalColorAcademy.com</p>
            <p className="font_9">Front-Desk: 510-580-6883</p>
            <p className="font_9">School Director: 530-204-8869</p>
        </RC.Div>

        <RC.Div style={{"textAlign": "center", marginTop: 20}}>

            <RC.Div style={{marginTop: 10}}>
                <div style={{marginRight:19, display:"inline-block"}}>
                    <a href="http://www.facebook.com/CalColorArt" target="_blank">
                        <img alt="" src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_60,h_60,al_c,usm_0.66_1.00_0.01/e316f544f9094143b9eac01f1f19e697.png"></img>
                    </a>
                </div>
                <div style={{marginRight:19, display:"inline-block"}}>
                    <a href="https://plus.google.com/103686107464333510836/about" target="_blank">
                        <img alt="" src="https://static.wixstatic.com/media/74d327d3628e4f14800301f1c61013b0.png/v1/fill/w_60,h_60,al_c,usm_0.66_1.00_0.01/74d327d3628e4f14800301f1c61013b0.png"></img>
                    </a>
                </div>
                <div style={{marginRight:0, display:"inline-block"}}>
                    <a href="http://www.yelp.com/biz/calcolor-academy-fremont" target="_blank">
                        <img alt="" src="https://static.wixstatic.com/media/263c6eefe13c431681f9363e2e92ddb7.png/v1/fill/w_60,h_60,al_c,usm_0.66_1.00_0.01/263c6eefe13c431681f9363e2e92ddb7.png"></img>
                    </a>
                </div>
            </RC.Div>
        </RC.Div>

        <RC.Div style={{textAlign: "center", marginTop:20}}>
            <p style={{fontSize: "16px"}} className="font_8">
              <br/>
                <span style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_9">Powered by </span> <a href="http://www.classforth.com" style={{fontFamily: "nimbus-sans-tw01con, sans-serif",fontSize: "12px", lineHeight: "normal"}} className="color_19"  target="_blank">Classforth</a>
            </p>
        </RC.Div>
    </RC.Div>
)
