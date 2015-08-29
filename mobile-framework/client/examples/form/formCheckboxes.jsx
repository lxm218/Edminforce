
App.Checkboxes = React.createClass({
  render() {

    let groceries = [{
      value: true,
      label: "7 Cabbages"
    },{
      value: true,
      label: "Bag of Carrots"
    },{
      value: false,
      label: "Box of Diet Coke"
    },{
      value: true,
      label: "Box of Oranges"
    },{
      value: true,
      label: "2 Bottles of Soy Sauce"
    },{
      value: false,
      label: "4 Cartons of Milk"
    },{
      value: false,
      label: "2 Boxes of Apples"
    },{
      value: true,
      label: "1 Rainbow Trout"
    },{
      value: true,
      label: "2 Loaf of Bread"
    },{
      value: true,
      label: "Carton of Mango Juice"
    },{
      value: true,
      label: "Bottle of General Tsao Sauce"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>Checkboxes are great for lists as well as forms.</p>
      </RC.Item>
      <RC.Item theme="divider">Grocery List</RC.Item>
      {
      groceries.map(function(g,n){
        return <RC.Checkbox {... g} key={n}/>
      })
      }
    </RC.List>
  }
})

//dfdfd
