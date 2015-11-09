
App.List_From_Array = React.createClass({
  render() {

    let list = [{
      theme: "body",
      value: <div>
        <h3>Description</h3>
        <p>You can build a list using components or by passing an array. They can both achieve the same thing.</p>
        <p><em>See &quot;Mixed List&quot; for an example.</em></p>
      </div>
    },{
      theme: "divider",
      value: "Cool Animals"
    },{
      theme: "icons",
      uiClass: ["book","phone"],
      uiColor: ["brand2","brand"],
      value: "Bald Eagle"
    },{
      theme: "icons",
      uiClass: ["language", "chevron-right"],
      uiColor: ["brand", "gray"],
      value: "Gorilla"
    },{
      theme: "icons",
      uiClass: "cubes",
      uiColor: "brand3",
      value: "Gazelle"
    },{
      theme: "icons",
      uiClass: "diamond",
      uiColor: "brand",
      value: "Australian Flying Fox"
    },{
      theme: "divider",
      value: "Even Cooler Animals"
    },{
      theme: "avatar",
      avatar: "/assets/examples/avatar5.jpg",
      uiClass: "smile-o",
      uiColor: "brand3",
      title: "Bruno Lee",
      subtitle: "Very handsome dog"
    },{
      theme: "avatar",
      uiClass: "paper-plane-o",
      title: "Flying Squirrel",
      subtitle: "He glides..."
    },{
      theme: "icons",
      uiClass: "university",
      uiColor: "brand3",
      note: "He Sleeps",
      value: "Hippopotamus"
    },{
      theme: "icons",
      uiClass: "paw",
      uiColor: "brand2",
      note: "She runs",
      value: "Horse"
    }]

    return <RC.List list={list}/>
  }
})
