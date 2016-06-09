
App.Web.Components = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "App.Web.ComponentsHome",
  render() {
    let buttonStyle = {
        float : 'right'
    };

    let avatar = {
      theme: "avatar",
      avatar: "/assets/examples/avatar5.jpg",
      uiClass: "smile-o",
      uiColor: "brand3",
      title: "Bruno Lee",
      subtitle: "Very handsome dog"
    }

    return <div>
      <RC.Header style={App.CSS.brand1Gradient("50% -50%", true)} bgColor="brand2">
        <h1>Components</h1>
        React components for the Web App Framework.
      </RC.Header>

      <RC.Div theme={["content","padding"]}>
        khal Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
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
