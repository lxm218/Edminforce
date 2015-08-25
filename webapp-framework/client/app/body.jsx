
App.Body = React.createClass({
  render() {
    return <div className="transition" id="app-body">
      <div className="wrapper-wide">
        {h.returnComponent(this.props.tmpl)}
      </div>
    </div>
  }
})
