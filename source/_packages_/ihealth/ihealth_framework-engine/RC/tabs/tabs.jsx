
RC.Tabs = React.createClass({
  getInitialState(){
    return {
      tab: this.props.tab || 0
    }
  },
  switchTab(tab,onclick) {
    this.setState({tab:tab})

    if(onclick){
      onclick(tab)
    }

  },
  getTheme(name){
    let theme = _.contains(["regular","nav-tabs"], name)
      ? name : "regular"
    return theme
  },
  render() {
    let self = this

    var tabs = !_.isArray(this.props.children) ? [this.props.children] : this.props.children
    _.filter(tabs.map( function(t,n){
      if (t.type=="div" && (t.props.label || t.props.uiClass)) {
        return t
      } else if (t.type!="div") {
        console.warn("Tabs child was rejected because it was not a <div>")
        return undefined
      } else {
        console.warn("Tabs child was rejected because it does not have a label or uiClass")
        return undefined
      }
    }), function(t){
      return !_.isUndefined(t)
    })

    if (!tabs.length) return null

    let width = 1/tabs.length*100
    let tabStyle = {width: width+"%"}
    let barStyle = {width: width+"%", left: width*this.state.tab+"%"}
    let bodyStyle = {width: (100*tabs.length)+"%", marginLeft: (-100*this.state.tab)+"%"}

    return <div className={"tabs-root overflow "+this.getTheme(this.props.theme)} id={this.props.id}>
      <div className="tabs-nav clear unselect">
        {
        tabs.map( function(t,n){
          return <p className={"cursor boxed"} key={n} style={tabStyle} onClick={self.switchTab.bind(null,n,t.props.onClick)}>
            {<RC.uiIcon uiSize={0} uiClass={t.props.uiClass} uiColor={t.props.uiColor} />}
            {t.props.label || "\u00a0"}
          </p>
        })
        }
        <div className="tabs-bar boxed transition" style={barStyle} />
      </div>
      <div className={"tabs-body clear transition "+(this.props.className || "")} style={bodyStyle}>
        {
        tabs.map( function(t,n){
          return <div className="tab-pane" style={tabStyle} key={n}>
            {t.props.children}
          </div>
        })
        }
      </div>
    </div>
  },
})
