/**
 * Created on 9/25/15.
 */

Cal.ClassRegisterDetail = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let classId = this.props.classId;
        let swimmerId= this.props.swimmerId

        Meteor.subscribe("class",classId);
        Meteor.subscribe("swimmer",swimmerId);

        return {
            swimmer:DB.Swimmers.findOne({_id:swimmerId}),
            class:DB.Classes.findOne({_id:classId})
        }
    },

    render() {
        var title= this.props.title || 'Class Register Info'

        return <RC.Card title={title}>
            <div className="row">
                <div className="col"> Swimmer</div>
                <div className="col">
                    {this.data.swimmer && this.data.swimmer.name}
                </div>
            </div>
            <div className="row">
                <div className="col"> Class Level</div>
                <div className="col">
                    {this.data.class && this.data.class.level}

                </div>
            </div>
            <div className="row">
                <div className="col"> Class Day</div>
                <div className="col">
                    {this.data.class && App.Config.week[this.data.class.day]}


                </div>
            </div>
            <div className="row">
                <div className="col"> Class Time</div>
                <div className="col">
                    {this.data.class && App.num2time(this.data.class.startTime)}-
                    {this.data.class && App.num2time(this.data.class.endTime)}

                </div>
            </div>

        </RC.Card>
    }
})