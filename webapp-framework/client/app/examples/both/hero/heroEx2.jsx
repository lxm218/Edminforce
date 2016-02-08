
App.HeroEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let hero = {
        theme: "bottom-left",
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero} />
    }
  `
    }

    renderExample() {
      let hero = {
        theme: "bottom-left",
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero} />
    }
  }
)
