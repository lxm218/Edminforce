
App.HeroEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let hero = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
        uiClass: "phone",
        uiBgColor: "brand1",
        action: function(){
          alert("Hello World!")
        }
      }
       return <RC.Hero {... hero} />
    }
  `
    }

    renderExample() {
      let hero = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
        uiClass: "phone",
        uiBgColor: "brand1",
        action: function(){
          alert("Hello World!")
        }
      }
       return <RC.Hero {... hero} />
    }
  }
)
