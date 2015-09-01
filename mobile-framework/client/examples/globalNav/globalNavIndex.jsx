
App.Global_Nav_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Global Nav Examples</h2>
        <p>Global Navs behave differently depending on where it is located. For iOS devices, it is located at bottom. For Android devices, it is located at top.</p>
      </RC.Item>

      <RC.Item theme="icon-left" uiClass="globe" uiColor="brand1" href="/globalNav/Automatic_Global_Nav">Automatic Global Nav</RC.Item>
      <RC.Item theme="icon-left" uiClass="globe" uiColor="brand2" href="/globalNav/Top_Global_Nav">Top Header Nav</RC.Item>
      <RC.Item theme="icon-left" uiClass="globe" uiColor="brand3" href="/globalNav/Bottom_Global_Nav">Bottom Footer Nav</RC.Item>
    </RC.List>
  }
})
