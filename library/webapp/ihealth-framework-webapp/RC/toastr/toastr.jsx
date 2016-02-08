
"use strict"

/**
 * When creating functions under the "this" context,
 * There should be 4 types of functions.
 * 1. React Lifecycles
 * 2. Utility functions that can be used in and outside this component ("camelCase" these)
 * 3. Event handler functions that were intended to be used only inside this component (lead with underscore "_")
 * 4. render() functions that are designed to be extended (lead with render, i.e. renderName())
 */

RC.Toastr = class extends RC.CSS {

  constructor(p) {
    super(p)
    this.defBgColor = "green" // This actually comes from the theme, it is not the default "green"
    this.interval = null // This variable is reserved for interval. ALWAYS make sure that timers are cleared in Unmount()
    this.timeouts = {} // This variable is reserved for timeouts. ALWAYS make sure that timers are cleared in Unmount()

    this.state = {
      obj: Immutable.Map({
        isNew: Immutable.List(),
        isHover: null,
        msgs: Immutable.List( this.isValidMsg(p.msg) ? [p.msg] : [] )
      })
    }
  }
  // @@@@
  // @@@@
  // Lifecycle
  // @@@@
  // @@@@
  componentWillReceiveProps(np) {
    if (this.isValidMsg(np.msg) && !_.isEqual(np.msg, this.props.msg)) {
      const uniqueKey = h.uniqueKey()
      this.setState( ({obj}) => ({
        obj: obj.merge({
          msgs: obj.get("msgs").unshift({
            key: uniqueKey,
            msg: np.msg
          }),
          isNew: obj.get("isNew").unshift(1)
        })
      }))
      this.createTimeout(uniqueKey, null, np.msg.timeoutDuration)
    }
  }
  componentWillUnmount() {
    // ALWAYS clear intervals and timeouts on Unmount()
    Object.keys(this.timeouts).map( (key) => {
      this.destroyTimeout(key)
    })
  }
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@

  // NOTE
  // When you are creating a framework component,
  // You should "camelCase" function names that can also be used by refs (this.refs...) and also extensible methods.

  createTimeout(uniqueKey, speed, timeoutDuration) {
    this.timeouts[uniqueKey] = Meteor.setTimeout( () => {
      const msgs = this.state.obj.get("msgs").toArray()
      let num = false

      _.every( msgs, (m,n) => {
        if (!m) return true
        if (m.key===uniqueKey)
          num = n
        return m.key!==uniqueKey
      })

      if (!isNaN(num)) {
        if (this.state.obj.get("isHover")!==num)
          this.removeMsg(num,uniqueKey)
        else {
          this.destroyTimeout(uniqueKey)
          this.timeouts[uniqueKey] = this.createTimeout(uniqueKey, 1000)
        }
      } else
        this.destroyTimeout(uniqueKey)
    }, timeoutDuration || this.props.timeoutDuration || speed || 3000)
  }
  destroyTimeout(uniqueKey) {
    if (typeof uniqueKey==="undefined") {
      const lastMsg = this.state.obj.get("msgs").last()
      if (!lastMsg) return null // Exit
      uniqueKey = lastMsg.key
    }
    Meteor.clearTimeout( this.timeouts[uniqueKey] )
    delete this.timeouts[uniqueKey]
  }
  isValidMsg(msg) {
    // return React.isValidElement(msg)
    // return msg!==null && (typeof msg==="object" || typeof msg==="string")
    return _.isObject( msg ) // Must not be React
  }
  removeMsg(n,uniqueKey) {
    const count = this.state.obj.get("msgs").count()
    if (count) {
      if (typeof n==="undefined") n = count-1
      this.destroyTimeout(uniqueKey)
      this.setState( ({obj}) => ({
        obj: obj.merge({
          msgs: obj.get("msgs").set(n, null)
        })
      }))
      this.timeouts[uniqueKey] = Meteor.setTimeout( () => {
        this.setState( ({obj}) => ({
          obj: obj.merge({
            msgs: obj.get("msgs").delete(n),
            isNew: obj.get("isNew").delete(n)
          })
        }))
      }, 300)
      this.destroyTimeout(uniqueKey)
    }
  }

  // NOTE
  // Start the names of all event handler functions with underscore "_".

  _hoverStart(n) {
    const isNew = this.state.obj.get("isNew")
    this.setState( ({obj}) => ({
      obj: obj.merge({
        isNew: obj.get("isNew").set(n, 0),
        isHover: n,
      })
    }))
  }
  _hoverEnd(n) {
    this.setState( ({obj}) => ({
      obj: obj.set("isHover", null)
    }))
  }
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderMessage(msgObj,n,maxLen) {
    const styles = this.css.get("styles")
    const state = this.state.obj
    const message = (msgObj && msgObj.msg) || {}

    let msgStates = []
    if (state.get("isHover")===n) msgStates.push(":hover")
    if (state.getIn(["isNew",n])) msgStates.push(":new")

    const msgStyles = h.assignPseudos( styles.msg, n, maxLen, ":hover" )

    let props = {
      style: msgStyles,
      onMouseEnter: this._hoverStart.bind(this,n),
      onMouseLeave: this._hoverEnd.bind(this,n)
    }
    if (typeof message.style==="object") Object.assign( props.style, message.style )
    Object.assign( props, _.omit(message, ["style","text","children"]) )

    const transition = {
      transitionName: this.props.transitionName || "zoom",
      transitionAppear: true,
      transitionAppearTimeout: 300,
      transitionEnterTimeout: this.props.transitionEnterTimeout || 300,
      transitionLeaveTimeout: this.props.transitionLeaveTimeout || 300
    }
    return <RC.Animate {... transition} key={n}>
      {
      msgObj
      ?
      <RC.Div {... props}>
        <p onClick={this.removeMsg.bind(this, n, msgObj.key)} style={styles.xContain}>
          <span style={styles.xTop}/>
          <span style={styles.xBot}/>
        </p>
        {message.title ? <strong style={styles.title}>{message.title}</strong> : null}
        {message.text || message.children}
      </RC.Div>
      :
      null
      }
    </RC.Animate>
  }
  renderChildren() {
    const msgs = this.state.obj.get("msgs"); if (!msgs.count()) return null;
    const maxLen = msgs.count()

    return msgs.map( (child,n) => {
      return this.renderMessage(child,n,maxLen)
    })
  }
  render() {
    return <div style={this.css.get("styles").area}>
      {this.renderChildren()}
    </div>
  }
  baseStyles(np,ns) {
    const isSmallPhone = RC.MQ.device===0
    const fontSize = RC.Theme.font.size
    const x = {
      transform: "rotate(45deg)",
      position: "absolute", top: "50%", left: "50%",
      background: "#FFF"
    }
    const activeMsg = {
      boxShadow: "0 0 10px rgba(0,0,0,.15)",
      opacity: 1
    }

    return {
      // Toastr
      area: {
        position: "fixed",
        top: 0, right: 0,
        // top: isSmallPhone ? 0 : 10, right: isSmallPhone ? 0 : 10,
        bottom: "auto", left: "auto", zIndex: 5000,
        width: "100%", maxWidth: isSmallPhone ? "100%" : 300,
      },
      title: {
        display: "block",
      },
      msg: {
        background: this.color.get("hex"), color: this.color.get("textColor"),
        padding: "13px 15px", margin: 10, borderRadius: 2,
        fontSize: fontSize-2, lineHeight: 1.35,
        position: "relative",
        transition: "all .15s ease", opacity: .7,
        ":hover": activeMsg, // Pseudos never get extended unless the state matches
        ":new": activeMsg, // Pseudos never get extended unless the state matches
      },
      // Close
      xContain: {
        position: "absolute", top: 3, right: 3,
        width: 20, height: 20
      },
      xTop: Object.assign({}, x, {
        height: 10, width: 2, margin: "-5px 0 0 -1px"
      }),
      xBot: Object.assign({}, x, {
        height: 2, width: 10, margin: "-1px 0 0 -5px"
      })
    }
  }
}

RC.Toastr.displayName = "RC.Toastr"
RC.Toastr.propTypes = {
  color: React.PropTypes.string,
  bgColor: React.PropTypes.string,
  timeoutDuration: React.PropTypes.number,

  theme: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),

  id: React.PropTypes.string,
  style: React.PropTypes.object,
}
