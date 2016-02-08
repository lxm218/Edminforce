
App.Thumbnail_List = React.createClass({
  render() {

    let albums = [{
      src: "/assets/examples/album1.jpg",
      title: "Downward Spiral",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album2.jpg",
      title: "The Slip",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album3.jpg",
      title: "Gone Girl",
      subtitle: "Trent Reznor & Atticus Ross"
    },{
      src: "/assets/examples/album4.jpg",
      title: "Daft Punk",
      subtitle: "Random Access Memories"
    },{
      src: "/assets/examples/album5.jpg",
      title: "Sia",
      subtitle: "1000 Forms of Fear"
    },{
      src: "/assets/examples/album6.jpg",
      title: "Hesitation Marks",
      subtitle: "Nine Inch Nails"
    },{
      src: "/assets/examples/album7.jpg",
      title: "Old World Underground",
      subtitle: "Metric"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>Item rows with thumbnail placed on the left.</p>
      </RC.Item>

      <RC.ItemDivider>Some of my Favourite Albums</RC.ItemDivider>
      {
      albums.map(function(a,n){
        a.uiClass = "chevron-right"
        a.uiColor = "gray"
        return <RC.ItemThumbnail {... a} key={n} />
      })
      }
    </RC.List>
  }
})
