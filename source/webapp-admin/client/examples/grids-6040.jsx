
App.Grids6040 = React.createClass({
  render() {

    let mailList = [{
      label: "List Example",
      type: "title",
    },{
      avatar: "/assets/examples/avatar1.jpg",
      title: "No Click",
      subtitle: "Bacon ipsum dolor amet venison tongue jerky short ribs tail rump bacon.",
      label: "Todo List",
      date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      avatar: "/assets/examples/avatar2.jpg",
      title: "Link to Dashboard",
      subtitle: "Prosciutto t-bone shank hamburger jowl. Bresaola shoulder ham hock jowl salami brisket.",
      label: "Appointment",
      date: new Date("Fri Jul 03 2015 17:54:07 GMT-0700 (PDT)"),
      href: "/"
    },{
      avatar: "/assets/examples/avatar3.jpg",
      title: "Custom Event Handler",
      subtitle: "Porchetta cupim cow alcatra shoulder jowl swine bacon andouille tri-tip bacon meatloaf t-bone hamburger brisket.",
      label: "Reminder",
      date: new Date("Fri Jul 10 2015 17:54:07 GMT-0700 (PDT)"),
      onClick: function(){
        alert("This is a custom event handler.")
      }
    },{
      uiClass: "send-o",
      title: "No Link but State Change",
      subtitle: "When there's no link, it will set state to the clicked list item.",
      label: "State Change",
      date: new Date("Wed Jul 15 2015 17:54:07 GMT-0700 (PDT)"),
    },{
      avatar: "/assets/examples/avatar4.jpg",
      title: "Custom Date Format",
      subtitle: "Hamburger leberkas shankle ball tip ground round. Filet mignon ball tip swine, leberkas short ribs porchetta andouille kielbasa meatball bresaola.",
      label: "Past",
      date: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
      dateFormat: "h:mm a"
    },{
      avatar: "/assets/examples/avatar5.jpg",
      title: "Custom Date - Time Ago",
      subtitle: "Meatball doner pig ribeye strip steak brisket landjaeger alcatra tail bacon bacon pork loin flank.",
      label: "Future",
      date: new Date("Fri Jul 03 2015 17:54:07 GMT-0700 (PDT)"),
      dateFormat: "ago"
    },{
      avatar: "/assets/examples/avatar6.jpg",
      title: "Label as Date",
      subtitle: "Turkey flank beef ham hock, tongue bresaola alcatra tenderloin brisket spare ribs chuck sausage pork loin.",
      label: "Present",
      date: "Important",
    }]

    return <RC.Grids>

      <div size="three-fifth">
        <RC.List list={mailList} />
      </div>

      <div size="two-fifth">
        <RC.Card theme="side" avatar="/assets/examples/avatar10.jpg" title="Card Component" subtitle="Hello world!">
          <p>
            Bacon ipsum dolor amet strip steak capicola shoulder, filet mignon beef ground round beef ribs.
          </p>
          <p>
            Andouille prosciutto spare ribs venison tri-tip. Landjaeger rump strip steak tenderloin porchetta frankfurter tongue. Turducken boudin salami tongue.
          </p>
        </RC.Card>
        <RC.Card theme="side" avatar="/assets/examples/avatar11.jpg" title="Bacon Ipsum" subtitle="Next time let's try veggie ipsum.">
          <p>
            Brisket pastrami ham hock ribeye flank meatball. Pastrami jowl flank landjaeger, leberkas turkey andouille boudin hamburger prosciutto capicola. Filet mignon pork loin boudin beef ribs drumstick, tongue tail venison short loin turducken.
          </p>
          <p>
            Pork sausage pig pork loin, andouille jowl capicola kielbasa bacon shankle.
          </p>
        </RC.Card>
      </div>

    </RC.Grids>
  }
})
