
App.Inset_List = React.createClass({
  render() {

    let colours = [{
      uiColor: "brand",
      value: ".brand",
      note: "scss.scss"
    },{
      uiColor: "brand1",
      value: ".brand1",
      note: "scss.scss"
    },{
      uiColor: "brand2",
      value: ".brand2",
      note: "scss.scss"
    },{
      uiColor: "brand3",
      value: ".brand3",
      note: "scss.scss"
    },{
      uiColor: "gray",
      value: ".gray",
      note: "Must override"
    },{
      uiColor: "white",
      value: ".white",
      note: "Must override"
    },{
      uiColor: "dark",
      value: ".dark",
      note: "Must override"
    },{
      uiColor: "green",
      value: ".green",
      note: "Must override"
    },{
      uiColor: "blue",
      value: ".blue",
      note: "Must override"
    },{
      uiColor: "red",
      value: ".red",
      note: "Must override"
    }]

    return <RC.Div bgColor="brand1Light" theme="full">
      <RC.List theme="inset">
        <RC.Item theme="body">
          <h3>Description</h3>
          <p>There are several collections of CSS colour classes in the framework. Some can be controlled from the scss.scss file, others must be overriden.</p>
        </RC.Item>

        <RC.Item theme="divider">Common Colours</RC.Item>
        {
        colours.map(function(c,n){
          c.theme = "icons"
          c.uiClass = "thumbs-up"
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
        })
        }
      </RC.List>
    </RC.Div>
  }
})
