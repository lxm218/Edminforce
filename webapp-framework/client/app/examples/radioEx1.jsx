
App.RadioEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let myParks = [{@br\
      value: "jack-darling",@br\
      label: "Jack Darling Memorial Park"@br\
    },{@br\
      value: "rengstorff",@br\
      label: "Rengstorff Park"@br\
    },{@br\
      value: "valens",@br\
      label: "Valens Camping Ground"@br\
    },{@br\
      value: "elora-gorge",@br\
      label: "Elora Gorge"@br\
    },{@br\
      value: "mississauga-park",@br\
      label: "Mississauga Park"@br\
    }]@br\
@br\
    let brunoParks = [{@br\
      value: "high-park",@br\
      label: "High Park"@br\
    },{@br\
      value: "erindale",@br\
      label: "Erindale Park"@br\
    },{@br\
      value: "valens",@br\
      label: "Valens Camping Ground"@br\
    },{@br\
      value: "totoredaca",@br\
      label: "Totoredaca Park"@br\
    }]@br\
@br\
    return <div>@br\
      <RC.Item theme="divider">My Favourite Parks</RC.Item>@br\
      <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" />@br\
      <RC.Item theme="divider">Bruno\'s Favourite Parks</RC.Item>@br\
      <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
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

      return <div>
        <RC.Item theme="divider">My Favourite Parks</RC.Item>
        <RC.RadioGroup uiBgColor="green" list={myParks} name="my-park" value="elora-gorge" />
        <RC.Item theme="divider">Bruno's Favourite Parks</RC.Item>
        <RC.RadioGroup list={brunoParks} name="brunos-park" value="erindale" uiClass="paw" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
