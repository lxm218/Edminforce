
App.RangeEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let range1 = {@br\
      value: 50,@br\
      color: "silver",@br\
      uiClass: ["heart-o","heart"],@br\
      uiColor: ["dark","dark"]@br\
    }@br\
    let range2 = {@br\
      value: 50,@br\
      color: "brand1",@br\
      uiClass: ["thumbs-down","thumbs-up"],@br\
      uiColor: ["brand1","brand1"]@br\
    }@br\
    return <div>@br\
      <RC.Range {... range1} />@br\
      <RC.Range {... range2} />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let range1 = {
        value: 50,
        color: "silver",
        uiClass: ["heart-o","heart"],
        uiColor: ["dark","dark"]
      }
      let range2 = {
        value: 50,
        color: "brand1",
        uiClass: ["thumbs-down","thumbs-up"],
        uiColor: ["brand1","brand1"]
      }
      return <div>
        <RC.Range {... range1} />
        <RC.Range {... range2} />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
