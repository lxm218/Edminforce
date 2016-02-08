App.CheckEx4 = App.Example(
  class extends RC.Code {
    renderExample() {
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
        <RC.Item theme="divider">Grocery List</RC.Item>
        {
        groceries.map(function(g,n){
          return <RC.Checkbox {... g} key={n} theme="overlay" />
        })
        }
      </RC.List>
    }
    code() {
      return `
    renderExample() {
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
        <RC.Item theme="divider">Grocery List</RC.Item>
        {
        groceries.map(function(g,n){
          return <RC.Checkbox {... g} key={n} theme="overlay" />
        })
        }
      </RC.List>
    }
  `
    }
  }
)


