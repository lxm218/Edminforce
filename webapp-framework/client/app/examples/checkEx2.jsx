
App.CheckEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  reset() {@br\
    this.refs.check.reset()@br\
  },@br\
  value() {@br\
    alert(this.refs.check.getValue())@br\
  },@br\
  turnOff() {@br\
    this.refs.check.turnOff()@br\
  },@br\
  turnOn() {@br\
    this.refs.check.turnOn()@br\
  },@br\
  render() {@br\
    let checkbox = {@br\
      checked: true,@br\
      label: "Hello World!"@br\
    }@br\
    return <div>@br\
      <RC.Div theme="padding">@br\
        <a onClick={this.reset}>Reset</a><br />@br\
        <a onClick={this.value}>Get Value</a><br />@br\
        <a onClick={this.turnOff}>Turn Off</a><br />@br\
        <a onClick={this.turnOn}>Turn On</a>@br\
      </RC.Div>@br\
      <RC.Checkbox {... checkbox} ref="check" />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    reset() {
      this.refs.check.reset()
    },
    value() {
      alert(this.refs.check.getValue())
    },
    turnOff() {
      this.refs.check.turnOff()
    },
    turnOn() {
      this.refs.check.turnOn()
    },
    renderExample() {
      let checkbox = {
        checked: true,
        label: "Hello World!"
      }
      return <div>
        <RC.Div theme="padding">
          <RC.URL onClick={this.reset}>Reset</RC.URL><br />
          <RC.URL onClick={this.value}>Get Value</RC.URL><br />
          <RC.URL onClick={this.turnOff}>Turn Off</RC.URL><br />
          <RC.URL onClick={this.turnOn}>Turn On</RC.URL>
        </RC.Div>
        <RC.Checkbox {... checkbox} ref="check" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
