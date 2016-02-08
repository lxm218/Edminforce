
App.Normal_Tabs = React.createClass({
  renderTabsFolder() {
    let headerImg = {
     height: 170,
     backgroundImage: "url(/assets/examples/img2.jpg)"
    }
    let innerStyle = {
     position: "relative"
    }
    return (
      <RC.Div>
        <RC.Div bgColor="dark">
          <RC.Div theme="background" style={headerImg} />
          <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
            <RC.TabsFolder bgColor="brand2" initialTab={0}>
             <RC.URL>Superman</RC.URL>
             <RC.URL>Batman</RC.URL>
             <RC.URL>Wonderwoman</RC.URL>
            </RC.TabsFolder>
            <p>Enter page content here.</p>
          </RC.Div>
        </RC.Div>

        <RC.Div bgColor="dark">
          <RC.Div theme="background" style={headerImg} />
          <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
            <RC.TabsFolder theme="small" bgColor="brand2" initialTab={0}>
             <RC.URL>Superman</RC.URL>
             <RC.URL>Batman</RC.URL>
             <RC.URL>Wonderwoman</RC.URL>
            </RC.TabsFolder>
            <p>Enter page content here.</p>
          </RC.Div>
        </RC.Div>

        <RC.Div bgColor="dark">
          <RC.Div theme="background" style={headerImg} />
          <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
            <RC.TabsFolder theme="big" bgColor="brand2" initialTab={0}>
             <RC.URL>Superman</RC.URL>
             <RC.URL>Batman</RC.URL>
             <RC.URL>Wonderwoman</RC.URL>
            </RC.TabsFolder>
            <p>Enter page content here.</p>
          </RC.Div>
        </RC.Div>

         <RC.Div bgColor="dark">
          <RC.Div theme="background" style={headerImg} />
          <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
            <RC.TabsFolder theme="no-borders" bgColor="brand2" initialTab={0}>
             <RC.URL>Superman</RC.URL>
             <RC.URL>Batman</RC.URL>
             <RC.URL>Wonderwoman</RC.URL>
            </RC.TabsFolder>
            <p>Enter page content here.</p>
          </RC.Div>
        </RC.Div>
      </RC.Div>


    )
  },

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

      <RC.Tabs initialTab={0}>
        <RC.URL>Default</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Default</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="white" initialTab={1}>
        <RC.URL>White</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>White</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="dark" initialTab={2}>
        <RC.URL>Dark</RC.URL>
        <RC.URL>No Theme</RC.URL>
        <RC.URL>Dark</RC.URL>
      </RC.Tabs>

      <RC.Item theme="body">
        <h3 className="brand">Other themes</h3>
        <p>the other themes</p>
      </RC.Item>

      <RC.TabsInline>
        <RC.URL>inline 1</RC.URL>
        <RC.URL>inline 2</RC.URL>
        <RC.URL>inline 3</RC.URL>
      </RC.TabsInline>

      <RC.TabsInline theme="small">
        <RC.URL>inline 1</RC.URL>
        <RC.URL>inline 2</RC.URL>
        <RC.URL>inline 3</RC.URL>
      </RC.TabsInline>

      <RC.TabsInline theme="big">
        <RC.URL>inline 1</RC.URL>
        <RC.URL>inline 2</RC.URL>
        <RC.URL>inline 3</RC.URL>
      </RC.TabsInline>

      <RC.TabsInline theme="no-borders">
        <RC.URL>inline 1</RC.URL>
        <RC.URL>inline 2</RC.URL>
        <RC.URL>inline 3</RC.URL>
      </RC.TabsInline>


      <RC.Tabs theme="no-borders">
        <RC.URL>no-borders 1</RC.URL>
        <RC.URL>no-borders 2</RC.URL>
        <RC.URL>no-borders 3</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="reverse">
        <RC.URL>reverse 1</RC.URL>
        <RC.URL>reverse 2</RC.URL>
        <RC.URL>reverse 3</RC.URL>
      </RC.Tabs>

      {this.renderTabsFolder()}

    </RC.List>
  }
})
