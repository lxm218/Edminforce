
App.NotFound = React.createClass({
  displayName: "Not Found",
  render() {
    return <div style={RC.cssMixins.verticalAlignOuter}>
      <div style={h.assignClone( RC.cssMixins.verticalAlignInner, {textAlign: "center"})}>
        <h4>Component Not Found</h4>


        <RC.Div theme="padding">


          <RC.Button bgColor="brand1">Button (Brand2)</RC.Button>
          <RC.Button bgColor="brand1">Button (Brand2)</RC.Button>

          <RC.Button bgColor="brand1">Button (Brand2)</RC.Button>

          <RC.Button bgColor="brand1">Button (Brand2)</RC.Button>

        </RC.Div>


      </div>
    </div>
  }
})
