
App.HeroEx4 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let hero1 = {@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Default Dim",@br\
      subtitle: "Best Dog in the World",@br\
    }@br\
    let hero2 = {@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Custom Dim 1",@br\
      subtitle: "Best Dog in the World",@br\
      areaInnerStyle: { backgroundColor: "rgba(0,130,236,.5)" }@br\
    }@br\
    let hero3 = {@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Custom Dim 2",@br\
      subtitle: "Best Dog in the World",@br\
      areaInnerStyle: { backgroundColor: "rgba(165,20,233,.5)" }@br\
    }@br\
    let hero4 = {@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Custom Dim 3",@br\
      subtitle: "Best Dog in the World",@br\
      areaInnerStyle: { backgroundColor: "rgba(54,211,23,.5)" }@br\
    }@br\
@br\
    return <div>@br\
      <RC.Hero {... hero1} />@br\
      <RC.Hero {... hero2} />@br\
      <RC.Hero {... hero3} />@br\
      <RC.Hero {... hero4} />@br\
    </div>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
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

      return <div>
        <RC.Hero {... hero1} />
        <RC.Hero {... hero2} />
        <RC.Hero {... hero3} />
        <RC.Hero {... hero4} />
      </div>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
