
App.Tabs_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h3>Tabs Examples</h3>
        <p>Tabs are a convenient way to create a set of navigation items They only accept &lt;RC.URL/&gt; component.</p>
      </RC.Item>

      <RC.ItemIcons uiClass="tags" uiColor="brand1" href="/tabs/Normal_Tabs">Normal Tabs</RC.ItemIcons>
      <RC.ItemIcons uiClass="tags" uiColor="brand2" href="/tabs/Tabs_with_Icons">Tabs with Icons</RC.ItemIcons>
      <RC.ItemIcons uiClass="tags" uiColor="brand3" href="/tabs/Tab_Sliders">Tab Sliders</RC.ItemIcons>

    </RC.List>
  }
})
