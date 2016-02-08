
App.HeroEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let self = this
      let hero = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero}>
          <RC.TabsSlider bgColor="white" theme="slider" initialTab={0}>
            <RC.URL>Story</RC.URL>
            <RC.URL>List</RC.URL>
          </RC.TabsSlider>
        </RC.Hero>
    }
  `
    }

    renderExample() {
      let self = this
      let hero = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero}>
          <RC.TabsSlider bgColor="white" theme="slider" initialTab={0}>
            <RC.URL>Story</RC.URL>
            <RC.URL>List</RC.URL>
          </RC.TabsSlider>
        </RC.Hero>
    }
  }
)
