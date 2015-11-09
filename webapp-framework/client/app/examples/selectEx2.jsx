
App.SelectEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let options = [@br\
      "African Wild Dog",@br\
      "Badger",@br\
      "Catfish",@br\
      "Donkey",@br\
      "Fire-Bellied Toad",@br\
      "Giant Clam",@br\
      "Hercules Beetle",@br\
      "Italian Blue Shark"@br\
    ]@br\
    let select1 = {@br\
      value: "Donkey",@br\
      label: "Animals",@br\
      theme: "stacked-label"@br\
    }@br\
    let select2 = {@br\
      value: "Fire-Bellied Toad",@br\
      label: "Animals",@br\
      theme: "stacked-label",@br\
      labelColor: "brand1"@br\
    }@br\
    let select3 = {@br\
      value: "Giant Clam",@br\
      label: "Animals",@br\
      theme: "stacked-label",@br\
      labelColor: "brand2"@br\
    }@br\
    return <div>@br\
      <RC.Select {... select1} options={options} />@br\
      <RC.Select {... select2} options={options} />@br\
      <RC.Select {... select3} options={options} />@br\
    </div>@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let options = [
        "African Wild Dog",
        "Badger",
        "Catfish",
        "Donkey",
        "Fire-Bellied Toad",
        "Giant Clam",
        "Hercules Beetle",
        "Italian Blue Shark"
      ]
      let select1 = {
        value: "Donkey",
        label: "Animals",
        theme: "stacked-label"
      }
      let select2 = {
        value: "Fire-Bellied Toad",
        label: "Animals",
        theme: "stacked-label",
        labelColor: "brand1"
      }
      let select3 = {
        value: "Giant Clam",
        label: "Animals",
        theme: "stacked-label",
        labelColor: "brand2"
      }
      return <div>
        <RC.Select {... select1} options={options} />
        <RC.Select {... select2} options={options} />
        <RC.Select {... select3} options={options} />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
