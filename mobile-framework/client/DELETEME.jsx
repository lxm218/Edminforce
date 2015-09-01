
App.TimelineDELETEME = React.createClass({
  render() {

    let notificationList = [{
        label: "Important",
        type: "title",
        uiClass: "map",
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
        uiClass: "bolt",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
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
        uiClass: "cloud-download",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
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
        uiClass: "bar-chart-o",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
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
        uiClass: "bar-chart-o",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
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
        uiClass: "bar-chart-o",
        brand: 1,
      },{
        title: new Date("Wed Jul 01 2015 17:54:07 GMT-0700 (PDT)"),
        text: <p>Today was a sunny day. It's always sunny in Sunnyvale but muggy in Canada.</p>,
        brand: 1
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
        uiClass: "bar-chart-o",
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

      return <RC.Timeline list={notificationList} />
  }
})
