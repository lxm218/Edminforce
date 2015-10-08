
App.Nav = React.createClass({
  linkClickHandler(e) {
    // if (e.target.href && (Meteor.Device.isPhone() || Meteor.Device.isTablet()))
      this.props.toggleNavFunc()
  },
  render() {

    let navList = [
      { text: "Pages", type: "title" },
      { text: "Dashboard", href: "/", uiClass: "bar-chart" },
      { text: "Mailbox", href: "/mailbox", uiClass: "envelope-o" },
      { text: "Gallery", href: "/gallery", uiClass: "photo" },

      { text: "Example", type: "title" },
      { text: "50% Grid Layout", href: "/examples/Grids50", uiClass: "table" },
      { text: "60%/40% Grid Layout", href: "/examples/Grids6040", uiClass: "table" },
      { text: "Tabs Layout", href: "/examples/TabsLayout", uiClass: "tags" },
      { text: "Form Elements", href: "/examples/FormElements", uiClass: "file-text-o" },
      { text: "Form Handling", href: "/examples/Form", uiClass: "scissors" },
      {
        text: "Pop Up",
        uiClass: "flag",
        onClick: function(){
          Session.set("popup",{
            html: "<h4>Hello World!</h4>\
            <p>This is a popup.</p>"
          })
        }
      },{
        text: "Persistent Pop Up",
        uiClass: "heart",
        onClick: function(){
          Session.set("popup",{
            persist: true,
            html: "<h4>I am Persistent.</h4>\
            <p>I will not go away unless you press ESC.</p>"
          })
        }
      },
    ]

    let chatList = [{
      label: "Online",
      type: "title",
    },{
      avatar: "/assets/examples/avatar7.jpg",
      title: "Bear Alagatharam",
      className: "green",
      date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      label: "Idle",
      type: "title",
    },{
      avatar: "/assets/examples/avatar8.jpg",
      title: "Bruce Wayne",
      className: "yellow",
      date: new Date("Fri Jul 03 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      avatar: "/assets/examples/avatar9.jpg",
      title: "Clark Kent",
      className: "yellow",
      date: new Date("Sat Jul 04 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      label: "Busy",
      type: "title",
    },{
      uiClass: "male",
      title: "Unknown Male",
      className: "red",
      date: new Date("Fri Jul 03 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      label: "Offline",
      type: "title",
    },{
      uiClass: "female",
      title: "Unknown Female",
      className: "red",
      date: new Date("Fri Jul 03 2015 17:54:07 GMT-0700 (PDT)"),
    }]

    let notificationList = [{
        label: "Important",
        type: "title",
        uiClass: "warning",
        brand: 1,
      },{
        title: "Watermelons in Summer",
        text: <p>
          Watermelons are made of mostly water. They are also very sugary. It's delcious though.
        </p>,
        brand: 1
      },{
        title: "Apples and Oranges",
        text: <p>
          Two fruits, different colours, different taste. Battle to the death at the crossroads.
        </p>,
        brand: 1
      },{
        label: "Diary",
        type: "title",
        uiClass: "line-chart",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
      },{
        title: new Date("Tue Sep 15 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>When the sun goes up, it's red. When the sun goes down, moon comes up.</p>,
        brand: 1
      }]

    let user = {
      name: "Bruno Lee",
    }

    return <nav className="transition" id="app-nav">

      <div id="app-nav-clickHandler" onClick={this.props.toggleNavFunc}/>

      <div className="nav-height user-login">
        <div className="inner line-short">
          <RC.Avatar src="/assets/examples/avatar2.jpg" uiClass="male" />
          <p className="ellipsis name sub">{user.name}</p>
          <p className="tiny">Manage account</p>
        </div>
      </div>

      <div className="bg-light scroll" id="app-nav-inner" onClick={this.linkClickHandler}>
        <RC.Tabs theme="nav-tabs">
          <div uiClass="navicon">
            <RC.NavList list={navList} />
          </div>
          <div uiClass="comments">
            <RC.List theme="nav-list" list={chatList} />
          </div>
          <div uiClass="soccer-ball-o">
            <RC.Timeline theme="small" list={notificationList} />
          </div>
        </RC.Tabs>
      </div>

    </nav>
  }
})
