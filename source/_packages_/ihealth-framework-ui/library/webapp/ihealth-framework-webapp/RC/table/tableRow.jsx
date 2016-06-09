"use strict"

RC.THead = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.defBgColor = "dark"
  }
  renderChildren() {
    return h.renderWithFunction( this.props.children, (row) => {
      if (!React.isValidElement(row)) return row
      let props = {
        isHeader: true,
        noHover: true
      }
      return React.cloneElement( row, props )
    })
  }
  render() {
    return <thead {... this.props} style={this.css.get("styles").thead}>
      {this.renderChildren()}
    </thead>
  }
  baseStyles() {
    return {
      thead: {
        backgroundColor: this.color.get("hex"), color: this.color.get("textColor"),
      }
    }
  }
}
RC.THead.displayName = "RC.THead"


RC.TBody = class extends RC.CSS {
  renderChildren() {
    if (typeof this.props.noHover==="undefined")
      return this.props.children
    return h.renderWithFunction( this.props.children, (row) => {
      if (!React.isValidElement(row)) return row
      let props = {
        noHover: this.props.noHover
      }
      return React.cloneElement( row, props )
    })
  }
  render() {
    return <tbody {... this.props} style={this.css.get("styles").tbody}>
      {this.renderChildren()}
    </tbody>
  }
  baseStyles() {
    return {
      tbody: {

      }
    }
  }
}
RC.TBody.displayName = "RC.TBody"
RC.TBody.propTypes = Object.assign({}, RC.TBody.propTypes, {
  noHover: React.PropTypes.bool
})


RC.TR = class extends RC.CSS {
  constructor(p) {
    super(p)
    this.state = {
      obj: Immutable.Map({
        hover: false
      })
    }
  }
  _hoverStart() {
    this.setStateObj({
      hover: true
    })
    if (_.isFunction(this.props.onMouseEnter))
      this.props.onMouseEnter()
  }
  _hoverEnd() {
    this.setStateObj({
      hover: false
    })
    if (_.isFunction(this.props.onMouseLeave))
      this.props.onMouseLeave()
  }
  render() {
    const state = this.state.obj
    let cssStates = [this.props.order%2 ? ":even" : ":odd"]
    if (!this.props.noHover && state.get("hover")) cssStates.push(":hover")

    let props = Object.assign({}, this.props, { style: h.assignPseudos( this.css.get("styles").tr, null, null, cssStates ) })
    if (!this.props.noHover) {
      props.onMouseEnter = this._hoverStart.bind(this)
      props.onMouseLeave = this._hoverEnd.bind(this)
    }

    return <tr {... props}>
      {this.renderChildren()}
    </tr>
  }
  baseStyles(np,ns) {
    let trStyle = {
      padding: 0,
      ":hover": {
        backgroundColor: "#fff9ee"
      },
      ":even": {
        backgroundColor: "rgba(0,0,0,.03)"
      }
    }
    return {
      tr: trStyle
    }
  }
}
RC.TR.displayName = "RC.TR"
RC.TR.propTypes = Object.assign({}, RC.TR.propTypes, {
  noHover: React.PropTypes.bool,
  isHeader: React.PropTypes.bool
})
