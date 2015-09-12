/**
 * Created on 9/11/15.
 */

Cal.ClassOperationBoardPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {

        let colours = [{
            uiColor: "brand",
            value: "Change Class"

        },{
            uiColor: "brand1",
            value: "Cancel Class"
        },{
            uiColor: "brand2",
            value: "Shedule Meeting"
        },{
            uiColor: "brand3",
            value: "Write Comment"
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