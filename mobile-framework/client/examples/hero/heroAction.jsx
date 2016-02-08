
App.Hero_Actions = React.createClass({

  getInitialState() {
    return {
      tab: "story"
    }
  },

  renderTabContent() {
    switch(this.state.tab) {
      case  "story":
        return <RC.Div theme={["padding","smaller"]}>
          <h3>Six Bears Get in a Pickle</h3>
          <p>Once upon a time there was a family of six bears. There was Daddy Bear, Mummy Bear, Blue Bear, Big Bear, Clever Bear and Completely Bear. They lived in a forest that didn't have any trees.</p>
          <p>Now, as you might expect, Daddy Bear was the Daddy, Mummy Bear was the Mummy, Blue Bear was blue, Big Bear was big, Clever Bear was clever and Completely Bear didn't have any clothes.</p>
          <p>One day, Daddy Bear decided that he wanted to do something really exciting, just for a change. So he stayed at home to watch football on the television. Mummy Bear said that she too would have to stay at home because there was a lot of housework to be done, so she stayed at home and watched an old movie on the upstairs television.</p>
          <p>The four young bears all decided to go out looking for adventure, so off they went.</p>
        </RC.Div>
      break
      case "list":
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
        return albums.map(function(a,n){
          a.uiClass = "chevron-right"
          a.uiColor = "gray"
          return <RC.ItemThumbnail {... a} key={n} />
        })
      break
    }
  },

  render() {
    let self = this
    let hero = {
      backgroundImage: "/assets/examples/hero.jpg",
      avatar: "/assets/examples/avatar4.jpg",
      title: "Hero with Actions",
      subtitle: "Best Dog in the World",
      uiClass: "star",
      uiBgColor: "brand1",
      action: function(){
        alert("Actions can be a string (href) or a function. The action is triggered when the avatar is pressed.")
      }
    }
     return <RC.List>

      <RC.Hero {... hero}>
        <RC.Tabs theme="slider" bgColor="rgba(0,0,0,.25)" initialTab={0}>
          <RC.URL onClick={function(){ self.setState({ tab: "story"}) }}>Story</RC.URL>
          <RC.URL onClick={function(){ self.setState({ tab: "list"}) }}>List</RC.URL>
        </RC.Tabs>
      </RC.Hero>

      {this.renderTabContent()}

    </RC.List>
  }
})
