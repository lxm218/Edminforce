
App.Toggle_Checkboxes = React.createClass({
  render() {

    let groceries = [{
      value: true,
      label: "Air Canada",
      uiColor: "brand1"
    },{
      value: true,
      label: "United Airlines",
      uiColor: "brand2"
    },{
      value: true,
      label: "Delta Airlines",
      uiColor: "brand3"
    },{
      value: true,
      label: "Porter Airlines",
      uiColor: "light"
    },{
      value: true,
      label: "Korean Air",
      uiColor: "stable"
    },{
      value: true,
      label: "Air China",
      uiColor: "dark"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>Checkboxes are great for lists as well as forms.</p>
      </RC.Item>
      <RC.Item theme="divider">Airline Choices</RC.Item>
      {
      groceries.map(function(g,n){
        return <RC.Checkbox {... g} theme="toggle" key={n}/>
      })
      }
    </RC.List>
  }
})

//dfdfd
