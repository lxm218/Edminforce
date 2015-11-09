
App.Mobile.ComponentsHome = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "MobileGetStarted",
  render() {
    return <div>
      <RC.Header style={App.CSS.brand2Gradient("50% -50%", true)} bgColor="brand1">
        <h1>Components</h1>
        React components for the Mobile Framework.
      </RC.Header>

      <RC.Div theme={["content","padding"]}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      </RC.Div>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    return {
      area: {}
    }
  },
})
