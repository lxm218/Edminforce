
App.Thumbnail_List = React.createClass({
  render() {

    let albums = [{
      avatar: "/assets/examples/album1.jpg",
      title: "Downward Spiral",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album2.jpg",
      title: "The Slip",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album3.jpg",
      title: "Gone Girl",
      subtitle: "Trent Reznor & Atticus Ross"
    },{
      avatar: "/assets/examples/album4.jpg",
      title: "Daft Punk",
      subtitle: "Random Access Memories"
    },{
      avatar: "/assets/examples/album5.jpg",
      title: "Sia",
      subtitle: "1000 Forms of Fear"
    },{
      avatar: "/assets/examples/album6.jpg",
      title: "Hesitation Marks",
      subtitle: "Nine Inch Nails"
    },{
      avatar: "/assets/examples/album7.jpg",
      title: "Old World Underground",
      subtitle: "Metric"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>Thumbnails are essentially the same thing as avatar (but with a differnet image size).</p>
        <p>This example also maps an entire array to display the list items. However it is done slightly different.</p>
      </RC.Item>

      <RC.Item theme="divider">Some of my Favourite Albums</RC.Item>
      {
      albums.map(function(a,n){
        a.theme = "thumbnail-left"
        a.uiClass = "chevron-right"
        a.uiColor = "gray"
        return <RC.Item {... a} key={n} />
      })
      }
    </RC.List>
  }
})
