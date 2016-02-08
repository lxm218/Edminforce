
App.Hero_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item>
        <h3>Hero Examples</h3>
        <p>Hero components are great for profile pages.</p>
      </RC.Item>

      <RC.ItemIcons uiClass="rocket" uiColor="brand1" href="/hero/Normal_Hero">Normal Hero Component</RC.ItemIcons>
      <RC.ItemIcons uiClass="rocket" uiColor="brand2" href="/hero/Hero_Actions">Hero with Actions</RC.ItemIcons>
    </RC.List>
  }
})
