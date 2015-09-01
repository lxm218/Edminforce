
RC.LeftNav = React.createClass({
  getInitialState() {
    return {
      closing: false,
      isOpen: this.props.openOnInit
    }
  },
  open() {
    if (!this.state.closing)
      this.setState({isOpen: true})
  },
  close() {
    let self = this
    this.setState({closing: true})
    Meteor.setTimeout(function(){
      self.setState({isOpen: false, closing: false})
    }, 400)
  },
  linkClickHandler(e) {
    if (e.target.href)
      this.close()
  },
  render() {

    if (!this.state.isOpen) return null

    return <nav className={"transition left-nav fixed-full "+(this.state.closing ? "out" : "in")}>
      <div className="back abs-full" onClick={this.close}/>

      <div className="inner bg-white scroll" onClick={this.linkClickHandler}>
        <div onClick={this.props.toggleNavFunc}/>
        <RC.NavList list={this.props.navList} showCurrent={false} />
      </div>

    </nav>
  }
})
