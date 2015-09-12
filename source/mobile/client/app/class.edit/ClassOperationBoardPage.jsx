/**
 * Created on 9/11/15.
 */

Cal.ClassOperationBoardPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {

        let classId = this.props.classId;

        let colours = [{
            uiColor: "brand",
            value: "Change Class",
            href:'/classEdit/'+classId+'/change'

        },{
            uiColor: "brand1",
            value: "Cancel Class",
            href:'/classEdit/'+classId+'/cancel'
        },{
            uiColor: "brand2",
            value: "Shedule Meeting",
            href:'/classEdit/'+classId+'/sheduleMeeting'
        },{
            uiColor: "brand3",
            value: "Write Comment",
            href:'/classEdit/'+classId+'/writeComment'
        }]

        return <RC.List >
            <RC.Item theme="body">
                <h2 className="brand">Class Info</h2>
                <p>There are several collections of CSS colour classes in the framework. Some can be controlled from the scss.scss file, others must be overriden.</p>
            </RC.Item>

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