
App.Tabs_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Tabs Examples</h2>
        <p>Tabs are a convenient way to create a set of navigation items They only accept &lt;RC.URL/&gt; component.</p>
      </RC.Item>

      <RC.Item theme="icon-left" uiClass="tags" uiColor="brand1" href="/tabs/Normal_Tabs">Normal Tabs</RC.Item>

    </RC.List>
  }
})
