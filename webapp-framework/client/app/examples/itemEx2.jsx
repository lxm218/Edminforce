
App.ItemEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let avatar = {@br\
      theme: "avatar",@br\
      avatar: "/assets/examples/avatar5.jpg",@br\
      uiClass: "smile-o",@br\
      uiColor: "brand3",@br\
      title: "Bruno Lee",@br\
      subtitle: "Very handsome dog"@br\
    }@br\
    return <RC.List>@br\
      <RC.Item {... avatar} />@br\
      <RC.Item theme="divider">Title 123</RC.Item>@br\
      <RC.Item>@br\
        <h3>Body Text</h3>@br\
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>@br\
      </RC.Item>@br\
      <RC.Item theme="icons" uiClass="paw" uiColor="'+(this.props.platform=="mobile" ? "brand2" : "brand1")+'">One Icon</RC.Item>@br\
      <RC.Item@br\
        theme="icons"@br\
        uiClass={["bicycle","bullhorn"]}@br\
        uiColor="'+(this.props.platform=="mobile" ? "brand2" : "brand1")+'"@br\
      >@br\
        Two Icons@br\
      </RC.Item>@br\
      <RC.Item@br\
        theme="avatar"@br\
        avatar="/assets/examples/avatar3.jpg"@br\
        uiClass="thumbs-up"@br\
        uiBgColor="'+(this.props.platform=="mobile" ? "brand2" : "brand1")+'"@br\
        title="Icon Inside a Circle"@br\
        subtitle="Use avatar theme for this result"@br\
      />@br\
    </RC.List>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let avatar = {
        theme: "avatar",
        avatar: "/assets/examples/avatar5.jpg",
        uiClass: "smile-o",
        uiColor: "brand3",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.List>
        <RC.Item {... avatar} />
        <RC.Item theme="divider">Title 123</RC.Item>
        <RC.Item>
          <h3>Body Text</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </RC.Item>
        <RC.Item theme="icons" uiClass="paw" uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>One Icon</RC.Item>
        <RC.Item theme="icons" uiClass={["bicycle","bullhorn"]} uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Two Icons</RC.Item>
        <RC.Item theme="avatar" avatar="/assets/examples/avatar3.jpg" uiClass="thumbs-up" uiBgColor={this.props.platform=="mobile" ? "brand2" : "brand1"} title="Icon Inside a Circle" subtitle="Use avatar theme for this result" />
      </RC.List>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
