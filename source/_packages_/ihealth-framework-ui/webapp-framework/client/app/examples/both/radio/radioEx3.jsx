
App.RadioEx3 = App.Example(
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

      return <div>
        <RC.ItemDivider>My Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" theme="right"/>
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

      return <div>
        <RC.ItemDivider>My Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" theme="right"/>
      </div>
    }
  }
)

App.RadioEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
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

      return <div>
        <RC.ItemDivider>Bruno's Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" theme="overlay"/>
      </div>
    }
  `
    }

    renderExample() {
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

      return <div>
        <RC.ItemDivider>Bruno's Favourite Parks</RC.ItemDivider>
        <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" theme="overlay"/>
      </div>
    }
  }
)
