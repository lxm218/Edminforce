
App.Grids50 = React.createClass({
  render() {

    let notificationList = [{
        label: "Important",
        type: "title",
        uiClass: "danger",
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
        uiClass: "dashboard",
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

    return <RC.Grids>

      <div size="half">
        <RC.Card avatar="/assets/examples/avatar1.jpg" title="50% Grid Layout" subtitle="You can specify your own size.">
          <p>
            Notice how the Timeline component to the right is identical to the Timeline component inside the left nav.
          </p>
          <p>
            They use two different "themes". Themes allow minor or major design changes for the same react component.
          </p>
        </RC.Card>
        <RC.Card avatar="/assets/examples/avatar2.jpg" theme="colored" title="Colored Theme" subtitle="Alternate colored theme for the Card component.">
          <p>
            Biltong boudin fatback venison. Beef bresaola sirloin, hamburger rump pig pork loin frankfurter ham kielbasa.
          </p>
        </RC.Card>
        <RC.Card avatar="/assets/examples/avatar3.jpg" title="Add Label Prop for Title" subtitle="Add clever subtitle here.">
          <p>
            Leberkas ham kielbasa hamburger ribeye. Shank sausage shankle. Tenderloin fatback beef ribs strip steak frankfurter beef corned beef bacon pancetta pastrami hamburger porchetta bacon. Pork chop jerky ribeye venison cupim ham hock landjaeger.
          </p>
          <p>
            Shankle frankfurter tri-tip, cow ham fatback chicken leberkas flank ball tip tongue pork chop.
          </p>
        </RC.Card>
      </div>

      <div size="half">
        <RC.Timeline list={notificationList} />
      </div>

    </RC.Grids>
  }
})
