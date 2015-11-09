
App.InputEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
      let code = '\
React.createClass({@br\
  errorCheck(val) {@br\
    return val!=="Oranges"@br\
  },@br\
  render() {@br\
    return <RC.Input@br\
        theme="stacked-label"@br\
        errorHandler={this.errorCheck}@br\
        value="Apple" label="Must be equal to \'Oranges\'"@br\
      />@br\
  },@br\
})'
      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    errorCheck(val) {
      return val!=="Oranges"
    },
    renderExample() {
      return <RC.Input
          theme="stacked-label"
          errorHandler={this.errorCheck}
          value="Apple" label="Must be equal to 'Oranges'"
        />
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
