
App.Neutral.LeftHome = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "App.Neutral.LeftHome",
  getInitialState() {
    return {
      isHover: false
    }
  },
  _click() {
    FlowRouter.go("home-web")
  },
  hoverStart() {
    this.setState({
      isHover: true
    })
  },
  hoverEnd() {
    this.setState({
      isHover: false
    })
  },
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      <div style={styles.back}/>
      <figure style={styles.hero} onClick={this._click} onMouseEnter={this.hoverStart} onMouseLeave={this.hoverEnd}>
        <p style={styles.text}>
          <span style={styles.arrow1}/>
          <span style={styles.arrow2}/>
          Get Started with the<br />
          Web Framework
        </p>
      </figure>
      <h1 style={styles.heading}>
        Web &amp;<br />
        for Meteor.js
      </h1>
      <img src="/assets/logos/meteor-icon.png" style={styles.meteor} />
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["isHover"],
  baseStyles(np, ns) {
    let white = RC.Theme.color.white
    return {
      area: Object.assign({}, area, App.CSS.brand1Gradient(),{
        left: 0, right: "50%",
      }),
      back: Object.assign({}, back,RC.cssMixins.absFull, {
        opacity: ns.isHover ? 1 : 0,
        background: "rgba(0,0,0,.1)",
      }),
      hero: Object.assign({}, hero, {
        margin: Math.round(hero.height/-3.5)+"px 0 0",
        backgroundImage: 'url("/assets/home/left.png")',
        left: "auto", right: 0,
      }),
      heading: {
        fontSize: 45, color: white,
        textAlign: "right",
        position: "absolute", top: "50%", right: 0, zIndex: 2,
        width: 350, height: 250, padding: 15, margin: "-310px 0 0 0"
      },
      text: Object.assign({}, text, {
        transform: "translate("+(ns.isHover ? 0 : 35)+"px, 0)",
        opacity: ns.isHover ? 1 : 0,
        textAlign: "right",
        right: 51, padding: "0 0 0 21px"
      }),
      arrow1: Object.assign({}, arrow, {
        left: 0, margin: "4px 0 0",
        background: white, transform: "rotate(-45deg)",
      }),
      arrow2: Object.assign({}, arrow, {
        left: 0, margin: "-4px 0 0",
        background: white, transform: "rotate(45deg)",
      }),
      meteor: {
        position: "absolute", bottom: 20, right: 20,
        width: 73, height: 72
      }
    }
  },
})

App.Neutral.RightHome = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "App.Neutral.RightHome",
  getInitialState() {
    return {
      isHover: false
    }
  },
  _click() {
    FlowRouter.go("home-mobile")
  },
  hoverStart() {
    this.setState({
      isHover: true
    })
  },
  hoverEnd() {
    this.setState({
      isHover: false
    })
  },
  render() {
    let styles = this.css.styles
    return <div style={styles.area}>
      <div style={styles.back}/>
      <figure style={styles.hero} onClick={this._click} onMouseEnter={this.hoverStart} onMouseLeave={this.hoverEnd}>
        <p style={styles.text}>
          <span style={styles.arrow1}/>
          <span style={styles.arrow2}/>
          Get Started with the<br />
          Mobile Framework
        </p>
      </figure>
      <h1 style={styles.heading}>
        Mobile Framework<br />
        &amp; React
      </h1>
      <img src="/assets/logos/react-icon.png" style={styles.react} />
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchStates: ["isHover"],
  baseStyles(np, ns) {
    let white = RC.Theme.color.white
    return {
      area: Object.assign({},area, App.CSS.brand2Gradient(),{
        left: "50%", right: 0,
      }),
      back: Object.assign({},back, RC.cssMixins.absFull, {
        opacity: ns.isHover ? 1 : 0,
        background: "rgba(0,0,0,.09)",
      }),
      hero: Object.assign({}, hero, {
        backgroundImage: 'url("/assets/home/right.png")',
        margin: Math.round(hero.height/-3.5)+"px 0 0",
        left: 0, right: "auto"
      }),
      heading: {
        fontSize: 45, color: white,
        textAlign: "left",
        position: "absolute", top: "50%", left: 0, zIndex: 1010,
        width: 450, height: 250, padding: 15, margin: "-310px 0 0 0"
      },
      text: Object.assign({}, text, {
        transform: "translate("+(ns.isHover ? 0 : -35)+"px, 0)",
        opacity: ns.isHover ? 1 : 0,
        left: 51, padding: "0 21px 0 0"
      }),
      arrow1: Object.assign({}, arrow, {
        right: 0, margin: "-4px 0 0",
        background: white, transform: "rotate(-45deg)",
      }),
      arrow2: Object.assign({}, arrow, {
        right: 0, margin: "4px 0 0",
        background: white, transform: "rotate(45deg)",
      }),
      react: {
        position: "absolute", bottom: 20, left: 20,
        width: 73, height: 72
      }
    }
  },
})

let area = {
  minHeight: "100vh", overflow: "hidden",
  position: "fixed", top: 0, bottom: 0, zIndex: 9999,
}
let hero = {
  width: 378, height: 326, cursor: "pointer", zIndex: 2,
  backgroundRepeat: "no-repeat", backgroundPosition: "50%", backgroundSize: "contain",
  position: "absolute", top: "50%",
}
let back = {
  transition: "all .3s ease",
  zIndex: 1,
}
let text = {
  transition: "all .3s ease",
  position: "absolute", top: "50%",
  margin: "-25px 0 0",
}
let arrow = {
  position: "absolute", top: 13,
  width: 4, height: 14,
}
