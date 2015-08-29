
/**
 * @@@@@
 * @@@@@
 * @@@@@
 *
 * See Router.jsx for demonstration on how <RC.GlobalNav/> is hidden/shown.
 *
 * @@@@@
 * @@@@@
 * @@@@@
 */

let placeholder = function(title){
  return <div className="padding full-height bg-brand-light">
    <h3 className="brand">{title} Global Nav</h3>
    <p>
      By default on iOS devices, the Global Nav will be placed at the top. On Android devices, it will be placed at bottom.
    </p>
    <p>
      If you want to override the automatic location of the Global Nav, you must set the location prop to "top" or "bottom".
    </p>
  </div>
}

App.Automatic_Global_Nav = React.createClass({
  render() {
    return placeholder("Automatic")
  }
})

App.Top_Global_Nav = React.createClass({
  render() {
    return placeholder("Top")
  }
})

App.Bottom_Global_Nav = React.createClass({
  render() {
    return placeholder("Bottom")
  }
})
