
App.Global_Layout = React.createClass({
  render() {
    return <RC.GlobalLayout>
      <RC.List globalNavLabel="Moon" globalNavIcon="moon-o">
        <RC.Item theme="body">
          <h2 className="brand">Global Layout Example</h2>
          <p>Global Layout is a combination of &lt;RC.Swipe/&gt; and &lt;RC.GlobalNav/&gt; components. It allows you to create a layout of pages without requiring new routes.</p>
        </RC.Item>
      </RC.List>

      <RC.List globalNavLabel="Sun"  globalNavIcon="sun-o">
        <RC.Item theme="body">
          <h2 className="brand">Navigate by Click or Swipe</h2>
          <p>You can navigate this page by swiping (in mobile only) or by clicking the Global Nav.</p>
        </RC.Item>
      </RC.List>
    </RC.GlobalLayout>
  }
})
