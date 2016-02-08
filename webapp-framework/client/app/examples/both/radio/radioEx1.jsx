
App.RadioEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const myParks = [{
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

      const brunoParks = [{
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

      const linkinParks = [{
        value: "linkin-park",
        label: "Linkin Park"
      },{
        value: "mike",
        label: "Mike Shinoda"
      },{
        value: "chester",
        label: "Chester"
      }]

      const radioStyle = {
        'backgroundColor': 'orange',
        'borderRadius': '0'
      }

      return <div>
        <RC.ItemDivider>My Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" />
        <RC.ItemDivider>Bruno's Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" />
        <RC.ItemDivider>Linkin Parks</RC.ItemDivider>
        <RC.RadioGroup list={linkinParks} name="linkin-park" value="mike" radioStyle={radioStyle} />
      </div>
    }
  `
    }

    renderExample() {
      const myParks = [{
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

      const brunoParks = [{
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

      const linkinParks = [{
        value: "linkin-park",
        label: "Linkin Park"
      },{
        value: "mike",
        label: "Mike Shinoda"
      },{
        value: "chester",
        label: "Chester"
      }]

      const radioStyle = {
        'backgroundColor': 'orange',
        'borderRadius': '0'
      }

      return <div>
        <RC.ItemDivider>My Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" />
        <RC.ItemDivider>Bruno's Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" />
        <RC.ItemDivider>Linkin Parks</RC.ItemDivider>
        <RC.RadioGroup list={linkinParks} name="linkin-park" value="mike" radioStyle={radioStyle} />
      </div>
    }
  }
)
