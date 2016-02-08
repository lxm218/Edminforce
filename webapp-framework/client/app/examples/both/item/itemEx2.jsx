
App.ItemEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const avatar = {
        src: "/assets/examples/avatar5.jpg",
        uiClass: "smile-o",
        uiColor: "brand3",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.List>
        <RC.ItemAvatar {... avatar} />
        <RC.ItemDivider>Title 123</RC.ItemDivider>
        <RC.Item>
          <h3>Body Text</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </RC.Item>
        <RC.ItemIcons uiClass="paw" uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>One Icon</RC.ItemIcons>
        <RC.ItemIcons uiClass={["bicycle","bullhorn"]} uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Two Icons</RC.ItemIcons>
        <RC.ItemAvatar uiClass="thumbs-up" uiBgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}
                       title="Icon Inside a Circle" subtitle="Use RC.ItemAvatar for this result" />
        <RC.ItemThumbnail src="/assets/examples/avatar3.jpg" title="Thumbnail" subtitle="Use RC.ItemThumbnail" />
      </RC.List>
    }
  `
    }
    renderExample() {
      const avatar = {
        src: "/assets/examples/avatar5.jpg",
        uiClass: "smile-o",
        uiColor: "brand3",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.List>
        <RC.ItemAvatar {... avatar} />
        <RC.ItemDivider>Title 123</RC.ItemDivider>
        <RC.Item>
          <h3>Body Text</h3>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </RC.Item>
        <RC.ItemIcons uiClass="paw" uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>One Icon</RC.ItemIcons>
        <RC.ItemIcons uiClass={["bicycle","bullhorn"]} uiColor={this.props.platform=="mobile" ? "brand2" : "brand1"}>Two Icons</RC.ItemIcons>
        <RC.ItemAvatar uiClass="thumbs-up" uiBgColor={this.props.platform=="mobile" ? "brand2" : "brand1"}
                       title="Icon Inside a Circle" subtitle="Use RC.ItemAvatar for this result" />
        <RC.ItemThumbnail src="/assets/examples/avatar3.jpg" title="Thumbnail" subtitle="Use RC.ItemThumbnail" />
      </RC.List>
    }
  }
)
