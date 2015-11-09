
App.HeroEx1 = App.Example(
  React.createClass({
    mixins: [RC.Mixins.PureRender],

    renderCode() {
        let code = '\
React.createClass({@br\
  render() {@br\
    let self = this@br\
    let hero = {@br\
      backgroundImage: "/assets/examples/hero.jpg",@br\
      avatar: "/assets/examples/avatar4.jpg",@br\
      title: "Bruno Lee",@br\
      subtitle: "Best Dog in the World",@br\
    }@br\
    return <RC.Hero {... hero}>@br\
      <RC.Tabs bgColor="white" theme="slider" initialTab={0}>@br\
        <RC.URL>Story</RC.URL>@br\
        <RC.URL>List</RC.URL>@br\
      </RC.Tabs>@br\
    </RC.Hero>@br\
  },@br\
})'

      return <code dangerouslySetInnerHTML={{__html: h.stringToCodeHL(code)}} />
    },
    renderExample() {
      let self = this
      let hero = {
        backgroundImage: "/assets/examples/hero.jpg",
        avatar: "/assets/examples/avatar4.jpg",
        title: "Bruno Lee",
        subtitle: "Best Dog in the World",
      }
       return <RC.Hero {... hero}>
          <RC.Tabs bgColor="white" theme="slider" initialTab={0}>
            <RC.URL>Story</RC.URL>
            <RC.URL>List</RC.URL>
          </RC.Tabs>
        </RC.Hero>
    },
    render() {
      return this.props.code
        ? this.renderCode()
        : (typeof this.props.snippet==="undefined" ? this.renderExample() : this.renderSnippet())
    },
  })
)
