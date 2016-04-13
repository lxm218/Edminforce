EdminForce.Components.MakeupClassSummary = class extends RC.CSS {
    constructor(p) {
        super(p);

        this.lessonDate = moment(Number(this.props.lessonDate));
        this.makeupFee = Number(this.props.makeupFee)

        this.checkout = this.checkout.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    checkout() {
        this.props.actions.bookMakeup(this.studentID, this.classID, this.lessonDate.toDate());
    }

    cancel() {
        // let query = {
        //     classID: this.classID,
        //     studentID: this.studentID
        // }
        // let path = FlowRouter.path("/makeupClasses", null, query);
        // FlowRouter.go(path);
        window.history.back();
    }

    render() {
        return (
            <div style={{display: "block"}}>
                {EdminForce.utils.renderError(this.props.error)}
                <div style={{margin: "20px 20px"}}>

                    <p>Make up class for {this.props.studentName}:</p>
                    
                    <p style={{padding:"0"}}>{this.lessonDate.format("dddd, MMMM Do YYYY, h:mm a")}</p>
                    {
                        this.makeupFee > 0 ? (
                            <div>
                                <p>{'Please pay $' + this.makeupFee + ' to confirm your make up class'}</p>
                                <p style={{padding: 0, margin:"10px 0 0 0"}}>
                                    <span style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"80%", border:"1px solid gray"}}>Make up class fee</span>
                                    <span style={{display:"inline-block", paddingLeft:"20px", height: "40px", lineHeight:"40px", width:"20%", borderBottom:"1px solid gray", borderTop:"1px solid gray", borderRight:"1px solid gray"}}>
                                        ${this.makeupFee}
                                    </span>
                                </p>
                            </div>
                        ) : null
                    }
                </div>
                <RC.Button bgColor="brand2" bgColorHover="dark"
                           onClick={this.checkout}>Pay Now</RC.Button>
                <RC.Button bgColor="brand2" bgColorHover="dark"
                           onClick={this.cancel}>Cancel</RC.Button>
            </div>
        )
    }
}
