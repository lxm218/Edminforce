
App.Layout.Main = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    let code = Session.get("code")
    let codeTmpl = code ? <App.Code tmpl={code}/> : null
    let platform = this.props.platform
    let leftNav = null

    if (platform && typeof this.props.leftNav==="string") {
      leftNav = []
      switch(this.props.leftNav) {
        case "components":
          if (App.Subs1.ready()) {
            let comps = App.Coll.Components.find({
              platform: platform
            },{
              fields: {
                name: 1,
                category: 1,
                platform: 1,
                slug: 1
              }
            }).fetch()
            let cats = App.Coll.Categories.find({}, {
              sort: { weight: -1 },
              fields: {
                name: 1,
                weight: 1,
              }
            }).fetch()

            cats.map(function(cat,n){
              let nav = [{isTitle: true, children: cat.name}]
              let navComps = _.filter(comps,function(c){
                return c.category==cat._id && c.slug
              })
              nav = nav.concat(navComps.map(function(c,n){
                return {
                  href: `/${platform}/components/${c.slug}`,
                  children: c.name
                }
              }))
              leftNav = leftNav.concat(nav)
            })
          }
        break
      }
    }

    return {
      codeTmpl: codeTmpl,
      leftNav: leftNav,
    }
  },
  componentWillMount() {
    document.addEventListener("keypress", this.closeCode)
  },
  componentWillUnmount() {
    document.removeEventListener("click", this.closeCode)
  },
  closeCode(e) {
    if (e && e.which===27)
      this.cancelWindows()
  },
  cancelWindows() {
    Session.set("code",null)
  },
  // renderTopNav() {
  //   if (typeof this.props.topNav!=="array") {
  //     switch(this.props.platform){
  //       case "mobile":
  //         var menu = [
  //           {href: "/mobile", text: "Get Started"},
  //           {href: "/mobile/components", text: "Components"},
  //           {href: "#", text: "Guides"},
  //         ]
  //         var tnBgColor = "brand2"
  //         var tnStyle = App.CSS.brand2Gradient("50% 85%", true)
  //       break
  //       case "webapp":
  //         var menu = [
  //           {href: "#", text: "Get Started"},
  //           {href: "#", text: "Components"},
  //           {href: "#", text: "Guides"},
  //         ]
  //         var tnBgColor = "brand1"
  //         var tnStyle = App.CSS.brand1Gradient("50% 85%", true)
  //       break
  //     }
  //   } else
  //     var menu = this.props.topNav
  //
  //   return <RC.TopNav bgColor={tnBgColor} style={tnStyle} createSpaceForLeftNav={true} cur={FlowRouter.current().path}>
  //     {
  //     (menu || []).map(function(m,n){
  //       return <RC.URL {... _.omit(m,"text")} key={n}>{m.text}</RC.URL>
  //     })
  //     }
  //   </RC.TopNav>
  // },
  renderLeftNav() {
    let nav = this.data.leftNav || this.props.leftNav
    return <RC.LeftNav logo="/assets/logo.png" logoHref="/" bgColor="dark" nav={nav} />
  },
  render() {
    return <RC.Body>
      {
      !!this.props.bodyTmpl
      ?
      <RC.Layout bgColor="light" theme="leftNav">
        {this.renderLeftNav()}
        {this.props.bodyTmpl}
      </RC.Layout>
      :
      null
      }
      <RC.AnimateWindow transitionName="from-top-slower">{this.props.topTmpl}</RC.AnimateWindow>
      <RC.AnimateWindow transitionName="from-left-slower">{this.props.leftTmpl}</RC.AnimateWindow>
      <RC.AnimateWindow transitionName="from-right-slower">{this.data.codeTmpl || this.props.rightTmpl}</RC.AnimateWindow>
      <RC.AnimateWindow transitionName="fade">
        {
        !!this.data.codeTmpl
        ?
        <App.CodeBackdrop onClick={this.cancelWindows}/>
        :
        null
        }
      </RC.AnimateWindow>
    </RC.Body>
  }
})
