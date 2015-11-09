
App.ListEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let albums = [{@br\
      img: "/assets/examples/album1.jpg",@br\
      title: "Downward Spiral",@br\
      subtitle: "Nine Inch Nails"@br\
    },{@br\
      img: "/assets/examples/album2.jpg",@br\
      title: "The Slip",@br\
      subtitle: "Nine Inch Nails"@br\
    },{@br\
      img: "/assets/examples/album3.jpg",@br\
      title: "Gone Girl",@br\
      subtitle: "Trent Reznor & Atticus Ross"@br\
    },{@br\
      img: "/assets/examples/album4.jpg",@br\
      title: "Daft Punk",@br\
      subtitle: "Random Access Memories"@br\
    },{@br\
      img: "/assets/examples/album5.jpg",@br\
      title: "Sia",@br\
      subtitle: "1000 Forms of Fear"@br\
    },{@br\
      img: "/assets/examples/album6.jpg",@br\
      title: "Hesitation Marks",@br\
      subtitle: "Nine Inch Nails"@br\
    },{@br\
      img: "/assets/examples/album7.jpg",@br\
      title: "Old World Underground",@br\
      subtitle: "Metric"@br\
    }]@br\
    return <RC.List>@br\
      <RC.Item theme="body">@br\
        <h3>Fonts</h3>@br\
        <p>On iOS and Android devices, text will default to the native font family unless otherwise specified.</p>@br\
      </RC.Item>@br\
      <RC.Item theme="divider">My Favorite Albums</RC.Item>@br\
      {@br\
      albums.map(function(a,n){@br\
        a.theme = "thumbnail"@br\
        a.uiClass = "chevron-right"@br\
        a.uiColor = "gray"@br\
        return <RC.Item {... a} key={n} />@br\
      })@br\
      }@br\
    </RC.List>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let albums = [{
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
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
