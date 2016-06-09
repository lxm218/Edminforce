
App.Inset_List = React.createClass({
  render() {

    let colors = [{
      uiColor: "brand1",
      value: "brand1",
      note: "Theme color property",
    },{
      uiColor: "brand2",
      value: "brand2",
      note: "Theme color property",
    },{
      uiColor: "brand3",
      value: "brand3",
      note: "Theme color property",
    },{
      uiColor: "white",
      value: "white",
      note: "Theme color property",
    },{
      uiColor: "maroon",
      value: "maroon",
      note: "Valid color string"
    },{
      uiColor: "#00dac8",
      value: "#00dac8",
      note: "Custom HEX string"
    }]

    return <RC.Div bgColor="brand1Light" theme="full">
      <RC.List theme="inset">
        <RC.Item theme="body">
          <h3>Description</h3>
          <p>You can create your own color palettes from the Theme variable. You can choose colors by its name or hex.</p>
        </RC.Item>

        <RC.ItemDivider>Common Colors</RC.ItemDivider>
        {
        colors.map(function(c,n){
          c.uiClass = "thumbs-up"
          return <RC.ItemIcons {... _.omit(c,"value")} key={n}>{c.value}</RC.ItemIcons>
        })
        }
      </RC.List>
    </RC.Div>
  }
})
