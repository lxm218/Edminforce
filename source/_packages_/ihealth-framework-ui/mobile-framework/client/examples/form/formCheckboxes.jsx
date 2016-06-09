
App.Checkboxes = React.createClass({
  render() {

    let groceries = [{
      checked: true,
      label: "7 Cabbages"
    },{
      checked: true,
      label: "Bag of Carrots"
    },{
      checked: false,
      label: "Box of Diet Coke",
      uiBgColor: "red"
    },{
      checked: true,
      label: "Box of Oranges",
      uiBgColor: "red"
    },{
      checked: true,
      label: "2 Bottles of Soy Sauce",
      uiBgColor: "brand2"
    },{
      checked: false,
      label: "4 Cartons of Milk",
      uiBgColor: "brand2"
    },{
      checked: false,
      label: "2 Boxes of Apples",
      uiBgColor: "brand3"
    },{
      checked: true,
      label: "1 Rainbow Trout",
      uiBgColor: "brand3"
    },{
      checked: true,
      label: "2 Loaf of Bread",
      uiBgColor: "gray"
    },{
      checked: true,
      label: "Bottle of General Tsao Sauce",
      uiBgColor: "gray"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>Checkboxes are great for lists as well as forms.</p>
      </RC.Item>
      <RC.ItemDivider>Grocery List</RC.ItemDivider>
      {
      groceries.map(function(g,n){
        return <RC.Checkbox {... g} key={n}/>
      })
      }
    </RC.List>
  }
})
