
App.Tabs = React.createClass({
  render() {

    let notificationList = [{
        label: new Date("Wed Jul 01 2015 12:54:07 GMT-0700 (PDT)"),
        type: "title",
        uiClass: "cubes",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 12:54:30 GMT-0700 (PDT)"),
        text: <p>
          Watermelons are made of mostly water. They are also very sugary. It's delcious though.
        </p>,
        brand: 1
      },{
        title: new Date("Wed Jul 01 2015 15:14:17 GMT-0700 (PDT)"),
        text: <p>
          Two fruits, different colours, different taste. Battle to the death at the crossroads.
        </p>,
        brand: 1
      },{
        label: new Date("Tue Sep 15 2015 11:54:07 GMT-0700 (PDT)"),
        type: "title",
        uiClass: "diamond",
        brand: 1,
      },{
        title: new Date("Tue Sep 15 2015 12:54:07 GMT-0700 (PDT)"),
        dateFormat: "h:mm a",
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
      },{
        title: new Date("Tue Sep 15 2015 22:34:07 GMT-0700 (PDT)"),
        dateFormat: "h:mm a",
        text: <p>When the sun goes up, it's red. When the sun goes down, moon comes up.</p>,
        brand: 1
      }]

    return <RC.Tabs>

      <div label="Strawberries">
        <RC.Timeline theme="double" list={notificationList} />
      </div>

      <div label="Watermelons">
        <RC.VerticalAlign center={true} className="padding" height="300px">
          <h1>
            Vertical Align
          </h1>
          <p>
            Hello, I am a DIV that is centered vertically and also horizontally.
          </p>
        </RC.VerticalAlign>
      </div>

      <div label="And Bacon">
        <div className="padding">
          <h1>Bacon Ipsum</h1>
          <p>
          Bacon ipsum dolor amet sausage ground round jerky tenderloin pork belly, bacon drumstick boudin ribeye pork.
          </p>
          <p>
          Shankle bacon meatball tail landjaeger. Pork bacon ham hock landjaeger ribeye. Venison pork cupim, salami short ribs kielbasa tenderloin bresaola beef ribs beef biltong ham porchetta short loin sirloin. Fatback ribeye picanha capicola bresaola. bacon pork loin flank, beef ribs t-bone alcatra filet mignon pork spare ribs tongue prosciutto.
          </p>
          <p>
          Cow chicken bresaola bacon, ground round short loin alcatra t-bone bacon strip steak sausage landjaeger tail. Bresaola tongue pork belly jowl, ground round boudin short loin shank capicola andouille spare ribs pancetta short ribs prosciutto shankle. bacon shank short ribs prosciutto t-bone.
          </p>
        </div>
      </div>

    </RC.Tabs>
  }
})
