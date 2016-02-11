
App.Tabs = React.createClass({
    getInitialState() {
        return {
            activeTabIdx: 0
        }
    },

    changeTab(idx) {
        this.setState({activeTabIdx:idx});
    },

    render() {
        let activeTab;
        switch(this.state.activeTabIdx) {
            case 0:
                activeTab = <AppTabList />
                break;
            case 1:
                activeTab = <AppTabForm />
                break;
            case 2:
                activeTab = <AppTabMap />
                break;
        }

        return (
            <RC.Div>
                <RC.Tabs bgColor="white" initialTab={this.state.activeTabIdx} onChange={this.changeTab}>
                    <RC.URL>Grid</RC.URL>
                    <RC.URL>Form</RC.URL>
                    <RC.URL>Map</RC.URL>
                </RC.Tabs>
                {activeTab}
            </RC.Div>
        )
    }
})