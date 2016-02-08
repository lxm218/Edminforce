
App.Layout.ComponentsPage = React.createClass({
  displayName: "App.Layout.ComponentsPage",
  mixins: [ReactMeteorData,RC.Mixins.CSS],
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@
  getMeteorData() {
    let component = {}
    App.Subs2.subscribe("SingleComponent", this.props.slug)
    let isReady = App.Subs2.ready()
    if (isReady) {
      component = App.Coll.Components.findOne({
        slug: this.props.slug
      })
    }
    return {
      component: component,
      isReady: isReady
    }
  },
  getInitialState() {
    return {
      init: false,
      page: 0
    }
  },
  changePage(num) {
    this.setState({page:num})
  },
  componentWillReceiveProps(np,ns) {
    if (this.refs.paneTabs && np.slug!=this.props.slug) {
      this.refs.paneTabs.setActive(0)
      this.setState({page:0})
    }
  },
  componentDidMount() {
    this.setState({init:true})
  },
  shouldComponentUpdate(np,ns) {
    return this.data.isReady
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderContent() {
    let self = this
    let platform = this.props.platform
    let color = this.props.platform=="mobile" ? "brand2" : "brand1"
    let gradient = this.props.platform=="mobile" ? App.CSS.brand2Gradient("50% -50%", true) : App.CSS.brand1Gradient("50% -25%")
    let component = this.data.component

    let content = component.content && component.content[this.state.page]

    if (component && component._id)
      console.log(component._id)

    return <div>
      <RC.Header style={Object.assign({}, gradient, {paddingBottom: 78, paddingTop: "8%"})} bgColor={color}>
        <h1>{component.name}</h1>
        {component.shortDesc}
      </RC.Header>
      {
      !!content && content.main
      ?
      <RC.Grid theme={["content","padding-l","padding-r","padding-b"]}>
        <RC.GridItem style={{position: "relative"}} theme={["padding-r","padding-t"]}>
          <RC.TabsFolder initialTab={0} bgColor="light" ref="paneTabs" style={{marginBottom: 12}}>
            {
            component.content.map(function(page,n){
              return <RC.URL onClick={self.changePage.bind(null,n)} colorHover="text" key={n}>{page.title}</RC.URL>
            })
            }
          </RC.TabsFolder>
          <div>
          {
          // Render Main Content
          (content.main || []).map(function(page,n){
            if (typeof page==="string") {
              let content = page.replace(/<strong>/g, '<strong style="background: '+(platform=="mobile" ? RC.Theme.color.brand2 : RC.Theme.color.brand1)+'; color: #fff; padding: 0 3px;">')
              content = content.replace("@theme@", "Change the look or utility function(s) provided by this component. You can choose one theme by passing a string; or multiples by passing an array of strings.")

              return <p dangerouslySetInnerHTML={{__html: content}} key={n} />
            } else if (typeof page==="object" && page.class) {
              if (!page.props) page.props = {}
              page.props.key = n
              page.props.platform = platform
              page.props.example = page.class

              if (_.contains(["h1","h2","h3","h4","h5","h6"], page.class)) {
                if (page.props.style)
                  page.props.style.color = RC.Theme.color[color]
                else
                  page.props.style = {color: RC.Theme.color[color]}
              }
              return React.createElement(App[page.class] || page.class, page.props, (page.children || null))
            }
          })
          }
          </div>
        </RC.GridItem>
        <RC.GridItem
          fixedWidth={300} xAlign="right"
          theme={["smaller","padding-t","padding-b","padding-l","border-l","smaller"]}>
          <div>
          {
          // Render Notes
          (content.notes || []).map(function(note,n){
            if (typeof note==="string") {
              let children = note.length < 15
                ? "<strong>"+note+"</strong>"
                : note
              return <App.SidebarDefaults platform={platform} addLine={note.length < 15} keyRef={n} key={n}>{children}</App.SidebarDefaults>
            } else if (typeof note==="object" && note.class) {
              if (!note.props) note.props = {}
              note.props.key = note.props.keyRef = n
              note.props.platform = platform

              return React.createElement(App[note.class] || note.class, note.props, (note.children || null))
            }
          })
          }
          </div>
        </RC.GridItem>
      </RC.Grid>
      :
      null
      }
      </div>
  },
  render() {
    let styles = this.css.styles
    return <RC.Loading isReady={this.data.isReady || this.state.init}>
      {
      !!this.data.component
      ?
      this.renderContent()
      :
      null
      }
    </RC.Loading>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    return {
      tab: {
        margin: "7px 6px 7px 1px", padding: "0 10px"
      }
    }
  },
})
