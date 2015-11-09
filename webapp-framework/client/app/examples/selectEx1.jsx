
App.SelectEx1 = App.Example(
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
    return <div>@br\
      <RC.Select options={options} value="Donkey" label="Animals" />@br\
      <RC.Select options={options} value="Fire-Bellied Toad"" label="Animals" labelColor="brand1" />@br\
      <RC.Select options={options} value="Giant Clam" label="Animals" labelColor="brand2" />@br\
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
      return <div>
        <RC.Select options={options} value="Donkey" label="Animals" />
        <RC.Select options={options} value="Fire-Bellied Toad" label="Animals" labelColor="brand1" />
        <RC.Select options={options} value="Giant Clam" label="Animals" labelColor="brand2" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
