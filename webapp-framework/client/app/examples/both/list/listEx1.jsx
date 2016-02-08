
App.ListEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const albums = [{
        img: "/assets/examples/album1.jpg",
        title: "Downward Spiral",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album2.jpg",
        title: "The Slip",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album3.jpg",
        title: "Gone Girl",
        subtitle: "Trent Reznor & Atticus Ross"
      },{
        img: "/assets/examples/album4.jpg",
        title: "Daft Punk",
        subtitle: "Random Access Memories"
      },{
        img: "/assets/examples/album5.jpg",
        title: "Sia",
        subtitle: "1000 Forms of Fear"
      },{
        img: "/assets/examples/album6.jpg",
        title: "Hesitation Marks",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album7.jpg",
        title: "Old World Underground",
        subtitle: "Metric"
      }]
      return <RC.List>
        <RC.Item theme="body">
          <h3>Fonts</h3>
          <p>On iOS and Android devices, text will default to the native font family unless otherwise specified.</p>
        </RC.Item>
        <RC.Item theme="divider">My Favorite Albums</RC.Item>
        {
        albums.map(function(a,n){
          a.theme = "thumbnail"
          a.uiClass = "chevron-right"
          a.uiColor = "gray"
          return <RC.Item {... a} key={n} />
        })
        }
      </RC.List>
    }
  `
    }

    renderExample() {
      const albums = [{
        img: "/assets/examples/album1.jpg",
        title: "Downward Spiral",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album2.jpg",
        title: "The Slip",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album3.jpg",
        title: "Gone Girl",
        subtitle: "Trent Reznor & Atticus Ross"
      },{
        img: "/assets/examples/album4.jpg",
        title: "Daft Punk",
        subtitle: "Random Access Memories"
      },{
        img: "/assets/examples/album5.jpg",
        title: "Sia",
        subtitle: "1000 Forms of Fear"
      },{
        img: "/assets/examples/album6.jpg",
        title: "Hesitation Marks",
        subtitle: "Nine Inch Nails"
      },{
        img: "/assets/examples/album7.jpg",
        title: "Old World Underground",
        subtitle: "Metric"
      }]
      return <RC.List>
        <RC.Item theme="body">
          <h3>Fonts</h3>
          <p>On iOS and Android devices, text will default to the native font family unless otherwise specified.</p>
        </RC.Item>
        <RC.Item theme="divider">My Favorite Albums</RC.Item>
        {
        albums.map(function(a,n){
          a.theme = "thumbnail"
          a.uiClass = "chevron-right"
          a.uiColor = "gray"
          return <RC.Item {... a} key={n} />
        })
        }
      </RC.List>
    }
  }
)
