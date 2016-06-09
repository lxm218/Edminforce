
App.Routes_Index = React.createClass({

  getInitialState() {
    return {
      tmpl: {}
    }
  },
  keys: ["top","left","bottom","right"],
  changeRoute(loc, tmpl) {
    this.setState({
      tmpl: _.object( _.map(this.keys, function(k){
        return [k, k==loc ? tmpl : null]
      }))
    })
  },
  closeRoutes() {
    this.setState({ tmpl: {} })
  },
  render() {

    let self = this
    let templates = this.state.tmpl
    let routes = [{
      text: "Route From Top",
      onClick: this.changeRoute.bind(null,"top", <App.Route_From from="Top" closeHandler={self.closeRoutes} />)
    },{
      text: "Route From Right",
      onClick: this.changeRoute.bind(null,"right", <App.Route_From from="Right" closeHandler={self.closeRoutes} />)
    },{
      text: "Route From Bottom",
      onClick: this.changeRoute.bind(null,"bottom", <App.Route_From from="Bottom" closeHandler={self.closeRoutes} />)
    },{
      text: "Route From Left",
      onClick: this.changeRoute.bind(null,"left", <App.Route_From from="Left" closeHandler={self.closeRoutes} />)
    }]

    return <RC.Div>
      <RC.List>
        <RC.Item theme="body">
          <h3>Routes Examples</h3>
          <p>In this example, the routes are actually state changes. However the &lt;RC.RouteAnimation/&gt; component was actually designed to work with routers such as FlowRouter and IronRouter.</p>
        </RC.Item>
        {
        routes.map(function(r,n){
          r.key = n
          r.uiClass = "sitemap"
          r.uiColor = "brand"+(n%3+1)
          return <RC.ItemIcons {... r}>{r.text}</RC.ItemIcons>
        })
        }
      </RC.List>
      {
      this.keys.map(function(name, n){
        let props = {
          key: n,
          tmpl: templates[name],
          transitionName: "from-"+name,
          createHeaderSpace: true,
          bgColor: "brand"+(n%3+1)+"Light",
        }
        return <RC.AnimateRoute {... props} />
      })
      }
    </RC.Div>
  }
})

App.Route_From = React.createClass({
  render() {
    return <RC.VerticalAlign>
      <p style={{textAlign: "center"}} onClick={this.props.closeHandler}>
        <strong>Route From {this.props.from}</strong><br />
        <span>
          &larr; Go Back
        </span>
      </p>
    </RC.VerticalAlign>
  }
})
