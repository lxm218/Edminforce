
App.RangeEx4 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  getInitialState() {@br\
    return { val: 50 }@br\
  },@br\
  changeSlider(e) {@br\
    this.setState({@br\
      val: e.target.value@br\
    })@br\
  },@br\
  render() {@br\
    return <div>@br\
      <RC.Div theme="padding">@br\
        The value of this range slider is <strong>{this.state.val}</strong>.@br\
      </RC.Div>@br\
      <RC.Range onChange={this.changeSlider} value={50} color="brand1" />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    getInitialState() {
      return { val: 50 }
    },
    changeSlider(e) {
      this.setState({
        val: e.target.value
      })
    },
    renderExample() {
      return <div>
        <RC.Div theme="padding">
          The value of this range slider is <strong>{this.state.val}</strong>.
        </RC.Div>
        <RC.Range onChange={this.changeSlider} value={50} color="brand1" />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
