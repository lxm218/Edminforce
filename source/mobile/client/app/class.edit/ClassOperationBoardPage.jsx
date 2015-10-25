/**
 * Created on 9/11/15.
 */

Cal.ClassOperationBoardPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
        //let classId = this.props.classId;
        //let swimmerId= this.props.swimmerId
        //
        //Meteor.subscribe("class",classId);
        //Meteor.subscribe("swimmer",swimmerId);
        //
        //return {
        //    swimmer:DB.Swimmers.findOne({_id:swimmerId}),
        //    class:DB.Classes.findOne({_id:classId})
        //
        //}
    },

    render() {

        let classId = this.props.classId;
        let swimmerId= this.props.swimmerId


        let colours = [{
            uiColor: "brand",
            value: "Change Class",
            href:'/classEdit/change'
                    +'?classId='+classId
                    +'&swimmerId='+swimmerId

        },{
            uiColor: "brand1",
            value: "Cancel Class",
            href:'/classEdit/cancel'
                +'?classId='+classId
                +'&swimmerId='+swimmerId
        },
        //    {
        //    uiColor: "brand2",
        //    value: "Shedule Meeting",
        //    href:'/classEdit/'+classId+'/sheduleMeeting'
        //},
            {
            uiColor: "brand3",
            value: "Write Comment",
            href:'/classEdit/writeComment'
                    +'?classId='+classId
                    +'&swimmerId='+swimmerId
        }]

        return <RC.List >

            <Cal.ClassRegisterDetail
                classId={this.props.classId}
                swimmerId={this.props.swimmerId}
                />

            {
                colours.map(function(c,n){
                    c.theme = "icon-right"
                    c.uiClass = "angle-right"
                    return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
                })
            }
        </RC.List>
    }
})