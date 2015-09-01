
App.Timeline_Left = React.createClass({
  render() {


      return <RC.Timeline lineColor="brand">



        <RC.Journal
          theme="title" title="Bruno's Birthday"
          uiClass="map"
        />
        <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")}>
            This is the day Bruno first came home.
        </RC.Journal>
        <RC.Journal title="Baby Bruno">
          <p>If you wrap your text in a &lt;p/&gt; tag, the text will become smaller. If you do not wrap your text, they become bigger.</p>
          <img src="/assets/examples/img1.jpg" />
        </RC.Journal>
        <RC.Journal title={new Date("Wed Jul 01 2012 17:54:07 GMT-0700 (PDT)")} dateFormat="h:mm a">
          <p>When you pass a Date into the title prop, it will format itself. If you pass a dateFormat prop, it will format to the desired date format.</p>
        </RC.Journal>



        <RC.Journal
          theme="title" title={new Date("Wed May 20 2015 11:14:35 GMT-0700 (PDT)")}
          uiClass="coffee" uiBrand="brand2"
        />
        <RC.Journal title="About August" uiBrand="brand">
          August is the 8th month of the year. August is one month away from Autumn.
        </RC.Journal>
        <RC.Journal title="About December" uiBrand="brand2">
          <p>December is the first month of meteorological winter in the Northern Hemisphere and in the Southern Hemisphere is the first month of summer. December is the month with the shortest daylight hours of the year in the Northern Hemisphere and the longest daylight hours of the year in the Southern Hemisphere.</p>
          <p>December is also when Christmas happens.</p>
        </RC.Journal>
        <RC.Journal title="About January" uiBrand="brand3">
          January is when the new year begins and resolutions are made.
        </RC.Journal>



      </RC.Timeline>
  }
})
