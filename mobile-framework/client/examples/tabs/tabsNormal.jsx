
App.Normal_Tabs = React.createClass({
  render() {
    return <RC.List>

      <RC.Item theme="body">
        <h3 className="brand">Hold/Clicked States</h3>
        <p>By default, the state becomes activated when the link is pressed or held down.</p>
      </RC.Item>

      <RC.Tabs check={true}>
        <RC.URL>Default</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Default</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="light">
        <RC.URL>Light</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Light</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="white">
        <RC.URL>White</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>White</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="dark">
        <RC.URL>Dark</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Dark</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand1">
        <RC.URL>Brand1</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Brand1</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand2">
        <RC.URL>Brand2</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Brand2</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand3">
        <RC.URL>Brand3</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Brand3</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="white">
        <RC.URL>White</RC.URL>
        <RC.URL>Big Theme</RC.URL>
        <RC.URL>White</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="dark">
        <RC.URL>Dark</RC.URL>
        <RC.URL>Big Theme</RC.URL>
        <RC.URL>Dark</RC.URL>
      </RC.Tabs>



      <RC.Item theme="body">
        <h3 className="brand">No State Triggers</h3>
        <p>You can override the hold and clicked state triggers by passing the "activateOnHold" and "activateOnClick" props.</p>
      </RC.Item>

      <RC.Tabs activateOnHold={false} activateOnClick={false}>
        <RC.URL>Default</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Default</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="dark" activateOnHold={false} activateOnClick={false}>
        <RC.URL>Dark</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Dark</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="brand" activateOnHold={false} activateOnClick={false}>
        <RC.URL>Default</RC.URL>
        <RC.URL>Big Theme</RC.URL>
        <RC.URL>Default</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="brand2" activateOnHold={false} activateOnClick={false}>
        <RC.URL>Brand2</RC.URL>
        <RC.URL>Big Theme</RC.URL>
        <RC.URL>Brand2</RC.URL>
      </RC.Tabs>



      <RC.Item theme="body">
        <h3 className="brand">Initial States</h3>
        <p>You can set the initial state by passing the "initialState" prop.</p>
      </RC.Item>

      <RC.Tabs initialState={0}>
        <RC.URL>Default</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Default</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="white" initialState={1}>
        <RC.URL>White</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>White</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="dark" initialState={2}>
        <RC.URL>Dark</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Dark</RC.URL>
      </RC.Tabs>

    </RC.List>
  }
})
