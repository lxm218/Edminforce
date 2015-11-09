
App.TextareaEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  reset() {@br\
    this.refs.sel.reset()@br\
  },@br\
  value() {@br\
    alert(this.refs.sel.getValue())@br\
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
      <p>@br\
        <RC.URL onClick={this.reset}>Reset</RC.URL><br />@br\
        <RC.URL onClick={this.value}>Get Value</RC.URL>@br\
      </p>@br\
      <RC.Select options={options} ref="sel" />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    reset() {
      this.refs.sel.reset()
    },
    value() {
      alert(this.refs.sel.getValue())
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
        <RC.Textarea theme="stacked-label" name="biography" label="Biography">
          Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
        </RC.Textarea>
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
