
App.HeroEx2 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let hero = {@br\
      theme: "bottom-left",@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Bruno Lee",@br\
      subtitle: "Best Dog in the World",@br\
    }@br\
    return <RC.Hero {... hero} />@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let hero = {
        theme: "bottom-left",
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero} />
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
