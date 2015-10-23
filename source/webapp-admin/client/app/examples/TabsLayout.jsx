
App.TabsLayout = React.createClass({
  render() {

    let notificationList = [{
        label: new Date("Wed Jul 01 2015 12:54:07 GMT-0700 (PDT)"),
        type: "title",
        uiClass: "warning",
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
        uiClass: "area-chart",
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

    return <RC.Tabs className="bg-white">

      <div label="Strawberries">
        <RC.Timeline theme="double" list={notificationList} />
      </div>

      <div label="Watermelons">
        <RC.VerticalAlign center={true} className="padding" height="500px">
          <h1>
            Vertical Align
          </h1>
          <p>
            Hello, I am a DIV that is centered vertically and also horizontally.
          </p>
        </RC.VerticalAlign>
      </div>

      <div label="And Bacon">
        <RC.Grids>
          <div size="quarter">
            <RC.Card avatar="/assets/examples/avatar8.jpg" title="I am Batman" subtitle="His name is Bruce Wayne.">
              <p>
                Brisket pastrami ham hock ribeye flank meatball. Pastrami jowl flank landjaeger, leberkas.
              </p>
              <p>
                 Turkey andouille boudin hamburger prosciutto capicola.
              </p>
            </RC.Card>
          </div>
          <div size="quarter">
            <RC.Card avatar="/assets/examples/avatar9.jpg" title="I am Superman" subtitle="His name is Clark Kent.">
              <p>
                Filet mignon pork loin boudin beef ribs drumstick, tongue tail venison short loin turducken ground round strip steak chuck spare ribs.
              </p>
            </RC.Card>
          </div>
          <div size="quarter">
              <RC.Card uiClass="male" title="UI Icon for Avatar" subtitle="This guy has no avatar.">
              <p>
                Biltong boudin fatback venison. Beef bresaola sirloin, hamburger rump pig pork loin frankfurter ham kielbasa.
              </p>
            </RC.Card>
          </div>
          <div size="quarter">
            <RC.Card avatar="/assets/examples/avatar12.jpg" title="I am Bacon" subtitle="I ate you for breakfast.">
              <p>
                Corned beef kielbasa t-bone shank pastrami andouille, turducken landjaeger prosciutto picanha pig sausage shoulder.
              </p>
            </RC.Card>
          </div>
        </RC.Grids>
      </div>

    </RC.Tabs>
  }
})
