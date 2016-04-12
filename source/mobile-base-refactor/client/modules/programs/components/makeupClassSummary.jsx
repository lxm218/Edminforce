EdminForce.Components.MakeupClassSummary = () => (
    <div style={{display: "block"}}>
        <div style={{margin: "20px 20px"}}>
            <p>Make up class
                for {this.studentName}:</p>

            <p style={{padding:"0"}}>{moment(this.selectedLesson && this.selectedLesson.lessonDate).format("dddd, MMMM Do YYYY, h:mm a")}</p>

            <p>Please pay $5 to confirm your make up class</p>

            <p style={{padding: 0, margin:"10px 0 0 0"}}>
                <span style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"80%", border:"1px solid gray"}}>Make up class fee</span>
                <span style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"20%", borderBottom:"1px solid gray", borderTop:"1px solid gray", borderRight:"1px solid gray"}}>$5</span>
            </p>
        </div>

        <RC.Button bgColor="brand2" bgColorHover="dark"
                   onClick={this.checkout.bind(this)}>Pay Now</RC.Button>
        <RC.Button bgColor="brand2" bgColorHover="dark"
                   onClick={this.cancelMakeUp.bind(this)}>Cancel</RC.Button>
    </div>   
)
