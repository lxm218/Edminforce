
App.Toggle_Checkboxes = React.createClass({
  render() {

    let groceries = [{
      checked: false,
      label: "Air Canada",
      uiBgColor: "light",
    },{
      checked: false,
      label: "United Airlines",
      uiBgColor: "gray",
      uiBgColorActive: "brand2"
    },{
      checked: false,
      label: "Delta Airlines",
      uiBgColor: "white",
      uiBgColorActive: "brand3"
    },{
      checked: true,
      label: "Porter Airlines",
      uiBgColorActive: "dark"
    },{
      checked: true,
      label: "Korean Air",
      uiBgColorActive: "red"
    },{
      checked: true,
      label: "Air China",
      uiBgColorActive: "green"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
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
