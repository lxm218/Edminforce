
App.HeroEx5 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const hero1 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Default Dim",
        subtitle: "Best Dog in the World",
        itemStyle: { backgroundColor: "rgba(0,130,236,.5)" }
      }
      const hero2 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 1",
        subtitle: "Best Dog in the World",
        avatarContainerStyle: { backgroundColor: "green" }
      }
      const hero3 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 2",
        subtitle: "Best Dog in the World",
        avatarStyle: { borderRadius: 0 }
      }
      const hero4 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        avatarIconStyle: { marginLeft: 0 }
      }
      const hero5 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        titleStyle: { color: "orange" }
      }
      const hero6 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        subtitleStyle: { color: "orange" }
      }

      return <div>
        <RC.Hero {... hero1} />
        <RC.Hero {... hero2} />
        <RC.Hero {... hero3} />
        <RC.Hero {... hero4} />
        <RC.Hero {... hero5} />
        <RC.Hero {... hero6} />
      </div>
    }
  `
    }

    renderExample() {
      const hero1 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Default Dim",
        subtitle: "Best Dog in the World",
        itemStyle: { backgroundColor: "rgba(0,130,236,.5)" }
      }
      const hero2 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 1",
        subtitle: "Best Dog in the World",
        avatarContainerStyle: { backgroundColor: "green" }
      }
      const hero3 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 2",
        subtitle: "Best Dog in the World",
        avatarStyle: { borderRadius: 0 }
      }
      const hero4 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        avatarIconStyle: { marginLeft: 0 }
      }
      const hero5 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        titleStyle: { color: "orange" }
      }
      const hero6 = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Custom Dim 3",
        subtitle: "Best Dog in the World",
        subtitleStyle: { color: "orange" }
      }

      return <div>
        <RC.Hero {... hero1} />
        <RC.Hero {... hero2} />
        <RC.Hero {... hero3} />
        <RC.Hero {... hero4} />
        <RC.Hero {... hero5} />
        <RC.Hero {... hero6} />
      </div>
    }
  }
)
