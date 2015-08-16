
App.Header = React.createClass({
  render() {
    return <nav className="nav-height transition" id="app-header">

      <div className="transition" id="app-header-outer">
        <a href="#" className="nav-height-button float-r transition">
          <RC.uiIcon uiClass="eye" />
        </a>

        <a href="#" className="nav-height-button float-r transition">
          <RC.uiIcon uiClass="book" />
        </a>

        <a href="#" className="nav-height-button float-r transition">
          <RC.uiIcon uiClass="gears" />
        </a>
      </div>

      <div className="boxed nav-height transition" id="app-header-inner">
        <figure className="menu transition" onClick={this.props.toggleNavFunc}>
          <span className="hamburger"/>
        </figure>

        <img src="/assets/logo.png" className="logo desktop" />
        <img src="/assets/logo-mobile.png" className="logo mobile" />
      </div>
    </nav>
  }
})
