/*************************************************************************
 * Copyright iHealth Lab, 2015
 *
 *************************************************************************
 *
 * @description
 * This component will generate a list item for each individual user
 *
 * @author
 * Kris Hamoud
 *
 *************************************************************************/
IH.RC.UserListItem = React.createClass({
  /**
   * [propTypes description]
   * @description: require a user object in order for this component to
   * render
   */
  propTypes:{
    user: React.PropTypes.object.isRequired
  },

  /**
   * [render description]
   * @return ReactComponent
   * @description: render an instance of RC.Item for the user
   */
  render(){
    const user = this.props.user;
    return (
        <tr onClick={this.props.onClick}>
          <td>{user.profile.firstName} {user.profile.lastName}</td>
          <td>{user.emails[0].address}</td>
          <td>{user.profile.height.toFixed(2)}</td>
          <td>{user.profile.weight.toFixed(2)}</td>
          <td>{user.profile.bmi}</td>
          <td>{user.profile.dailyActivity}</td>
          <td>{user.profile.healthStatus}</td>
        </tr>
    )
  }
})
