
App.ItemEx3 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let avatar = {@br\
      theme: "avatar",@br\
      avatar: "/assets/examples/avatar2.jpg",@br\
      title: "Bruno Lee",@br\
      subtitle: "Very handsome dog"@br\
    }@br\
    return <RC.Card {... avatar}>@br\
      <RC.Item theme="image" src="/assets/examples/img2.jpg" />@br\
    </RC.Card>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let avatar = {
        theme: "avatar",
        avatar: "/assets/examples/avatar2.jpg",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.Card {... avatar} style={{margin:0,boxShadow:"none"}}>
        <RC.Item theme="image" src="/assets/examples/img2.jpg" />
      </RC.Card>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
