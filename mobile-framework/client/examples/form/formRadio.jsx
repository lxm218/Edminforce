
App.Radio_Buttons = React.createClass({
  render() {

    let myParks = [{
      value: "jack-darling",
      label: "Jack Darling Memorial Park"
    },{
      value: "rengstorff",
      label: "Rengstorff Park"
    },{
      value: "valens",
      label: "Valens Camping Ground"
    },{
      value: "elora-gorge",
      label: "Elora Gorge"
    },{
      value: "mississauga-park",
      label: "Mississauga Park"
    }]

    let brunoParks = [{
      value: "high-park",
      label: "High Park"
    },{
      value: "erindale",
      label: "Erindale Park"
    },{
      value: "valens",
      label: "Valens Camping Ground"
    },{
      value: "totoredaca",
      label: "Totoredaca Park"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>If you do not assign a &quot;name&quot; prop, a random string will be generated for you.</p>
      </RC.Item>

      <RC.Item theme="divider">My Favourite Parks</RC.Item>
      <RC.RadioGroup list={myParks} name="my-park" value="elora-gorge" />

      <RC.Item theme="divider">Bruno's Favourite Parks</RC.Item>
    <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" />

    </RC.List>
  }
})
