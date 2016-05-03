let {
    Tabs,
    Tab,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
} = MUI;

let _ = lodash;

EdminForce.Components.Billing = class extends RC.CSS {
    constructor(p) {
        super(p);
    }

    render() {
        let currentTab = (
            <Tab key="current" label="Current" value="current">
            </Tab>
        )

        let historyTab = (
            <Tab key="history" label="History" value="history">
            </Tab>
        )

        let tabs = [currentTab,historyTab];

        return (
            <RC.Div style={{"padding": "20px"}}>
                <RC.VerticalAlign center={true} className="padding" height="300px" key="title">
                    <h2>Billing & Payment</h2>
                </RC.VerticalAlign>
                <Tabs>{tabs}</Tabs>
            </RC.Div>
        )
    }
}
