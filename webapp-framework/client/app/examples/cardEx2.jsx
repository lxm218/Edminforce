
App.CardEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    return <RC.Card>@br\
      <RC.Item theme="divider">Header</RC.Item>@br\
      <RC.Item theme="body">@br\
        <p>@br\
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.@br\
        </p>@br\
        <p>@br\
          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.@br\
        </p>@br\
      </RC.Item>@br\
      <RC.Item theme="divider">Footer</RC.Item>@br\
    </RC.Card>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      return <RC.Card>
        <RC.Item theme="divider">Header</RC.Item>
        <RC.Item theme="body">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </p>
        </RC.Item>
        <RC.Item theme="body">
          <p>
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.
          </p>
        </RC.Item>
        <RC.Item theme="divider">Footer</RC.Item>
      </RC.Card>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
