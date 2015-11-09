
App.SelectEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  error(val) {@br\
    return val!="Donkey"@br\
  },@br\
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
      <RC.Div theme="padding">Must be equal to "Donkey".</RC.Div>@br\
      <RC.Select options={options} errorHandler={this.error}/>@br\
    </div>@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    error(val) {
      return val!="Donkey"
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
        <p>Must be equal to "Donkey".</p>
        <RC.Select options={options} errorHandler={this.error}/>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
