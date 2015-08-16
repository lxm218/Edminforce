
App.Global_Nav = React.createClass({
  render() {

    /**
     * See Router.jsx for demonstration on how <RC.GlobalNav/> is hidden/shown.
     */

    return <div className="padding">
      <p>
        By default on iOS devices, the Global Nav will be placed at the top. On Android devices, it will be placed at bottom.
      </p>
      <p>
        If you want to override the automatic location of the Global Nav, you must set the location prop to "top" or "bottom".
      </p>
    </div>
  }
})
