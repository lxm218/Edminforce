
App.Body = React.createClass({
  render() {
    return <div className="transition" id="app-body">
      <div className="wrapper-mobile">
        {h.returnComponent(this.props.tmpl, this.props.props)}
      </div>
    </div>
  }
})
