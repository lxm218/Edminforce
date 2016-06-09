
App.Global_Layout = React.createClass({
  render() {
    return <RC.GlobalLayout>
      <RC.List globalNavLabel="Moon" globalNavIcon="moon-o">
        <RC.ItemBody>
          <h3>Global Layout Example</h3>
          <p>Global Layout is a combination of &lt;RC.Swipe/&gt; and &lt;RC.GlobalNav/&gt; components. It allows you to create a layout of pages without requiring new routes.</p>
        </RC.ItemBody>
      </RC.List>

      <RC.List globalNavLabel="Sun"  globalNavIcon="sun-o">
        <RC.ItemBody>
          <h3>Navigate by Click or Swipe</h3>
          <p>You can navigate this page by swiping (in mobile only) or by clicking the Global Nav.</p>
        </RC.ItemBody>
      </RC.List>
    </RC.GlobalLayout>
  }
})
