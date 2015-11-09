
App.TabsEx6 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let headerImg = {@br\
      height: 170,@br\
      backgroundImage: "url(/assets/examples/img1.jpg)"@br\
    }@br\
    let innerStyle = {@br\
      position: "relative"@br\
    }@br\
    return <RC.Div bgColor="dark">@br\
      <RC.Div theme="background" style={headerImg} />@br\
      <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">@br\
        <RC.Tabs theme="folder" bgColor="brand2" initialTab={0}>@br\
          <RC.URL>Superman</RC.URL>@br\
          <RC.URL>Batman</RC.URL>@br\
          <RC.URL>Wonderwoman</RC.URL>@br\
        </RC.Tabs>@br\
        <p>Enter page content here.</p>@br\
      </RC.Div>@br\
    </RC.Div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let headerImg = {
        height: 170,
        backgroundImage: "url(/assets/examples/img1.jpg)"
      }
      let innerStyle = {
        position: "relative"
      }
      return <RC.Div bgColor="dark">
        <RC.Div theme="background" style={headerImg} />
        <RC.Div style={innerStyle} theme="padding" autoFix={false} bgColor="brand2">
          <RC.Tabs theme="folder" bgColor="brand2" initialTab={0}>
            <RC.URL>Superman</RC.URL>
            <RC.URL>Batman</RC.URL>
            <RC.URL>Wonderwoman</RC.URL>
          </RC.Tabs>
          <p>Enter page content here.</p>
        </RC.Div>
      </RC.Div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
