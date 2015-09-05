
App.User_Index = React.createClass({
  render() {

    let menu = [{
      text: "Basic Log In",
      href: "/user/User_Login_Basic",
    },{
      text: "Log In with Callback",
      href: "/user/Login_With_Callback",
    },{
      text: "User Registration Only",
      href: "/user/User_Registration_Only",
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">User Packages</h2>
        <p>User packages give you all the server code (schemas, methods, etc) and the UI components to build your app.</p>
      </RC.Item>

      {
      menu.map(function(m,n){
        return <RC.Item
          theme="icon-left"
          uiClass="user" uiColor={"brand"+(n%3+1)}
          href={m.href}>
          {m.text}
        </RC.Item>
      })
      }
    </RC.List>
  }
})