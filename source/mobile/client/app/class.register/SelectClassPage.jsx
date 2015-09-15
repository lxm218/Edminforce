/**
 * Created on 9/14/15.
 */

Cal.CRSelectClassPage = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    render() {
        return <div>

            <RC.List theme="inset">
                <RC.Item theme="body">
                    <h2 className="brand">Description</h2>
                    <p>There are several collections of CSS colour classes in the framework. Some can be controlled from the scss.scss file, others must be overriden.</p>
                </RC.Item>


                <RC.Select
                    ref="date"
                    options={['',"Apples","Bananas"]}
                    name="favFruit" value="Oranges"
                    label="swimmer"
                    />
                <RC.Item   uiColor="brand1" >
                    level 3

                </RC.Item>
                <RC.Select
                    ref="date"
                    options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
                    name="favFruit" value="Oranges"
                    label="days"
                    />
                <RC.Select
                    ref="time"
                    options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
                    name="favFruit" value="Oranges"
                    label="time"
                    />

                <RC.URL href="/SelectClass">
                    <RC.Button name="button" theme="full"  buttonColor="brand">
                        Select
                    </RC.Button>
                </RC.URL>


            </RC.List>
        </div>
    }
})