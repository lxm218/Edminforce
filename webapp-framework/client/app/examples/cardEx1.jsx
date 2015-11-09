
App.CardEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let props = {@br\
      avatar: "/assets/examples/avatar1.jpg",@br\
      title: "Bruno Lee",@br\
      subtitle: "Handsome Dog"@br\
    }@br\
    return <RC.Card {... props}>@br\
      <RC.Item theme="body">@br\
        <img src="/assets/examples/avatar4.jpg" />@br\
        <p>I am the most handsome dog in the world.</p>@br\
      </RC.Item>@br\
    </RC.Card>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let props = {
        avatar: "/assets/examples/avatar1.jpg",
        title: "Bruno Lee",
        subtitle: "Handsome Dog"
      }
      return <RC.Card {... props}>
        <RC.Item theme="body">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
        </RC.Item>
      </RC.Card>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
