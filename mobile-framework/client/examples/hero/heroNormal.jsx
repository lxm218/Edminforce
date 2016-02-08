
App.Normal_Hero = React.createClass({
  render() {

    let hero1 = {
      backgroundImage: "/assets/examples/hero.jpg",
      avatar: "/assets/examples/avatar4.jpg",
      title: "Default Dim",
      subtitle: "Best Dog in the World",
    }
    let hero2 = {
      backgroundImage: "/assets/examples/hero.jpg",
      avatar: "/assets/examples/avatar4.jpg",
      title: "Custom Dim 1",
      subtitle: "Best Dog in the World",
      areaInnerStyle: { backgroundColor: "rgba(0,130,236,.5)" }
    }
    let hero3 = {
      backgroundImage: "/assets/examples/hero.jpg",
      avatar: "/assets/examples/avatar4.jpg",
      title: "Custom Dim 2",
      subtitle: "Best Dog in the World",
      areaInnerStyle: { backgroundColor: "rgba(165,20,233,.5)" }
    }
    let hero4 = {
      backgroundImage: "/assets/examples/hero.jpg",
      avatar: "/assets/examples/avatar4.jpg",
      title: "Custom Dim 3",
      subtitle: "Best Dog in the World",
      areaInnerStyle: { backgroundColor: "rgba(54,211,23,.5)" }
    }

    return <RC.List>
      <RC.Hero {... hero1} />
      <RC.Hero {... hero2} />
      <RC.Hero {... hero3} />
      <RC.Hero {... hero4} />
    </RC.List>
  }
})
