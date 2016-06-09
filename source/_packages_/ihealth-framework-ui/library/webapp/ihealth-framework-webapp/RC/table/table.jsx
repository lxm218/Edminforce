"use strict"

RC.Table = class extends RC.CSS {
  renderChildren() {
    if (typeof this.props.noHover==="undefined")
      return this.props.children
    return h.renderWithFunction( this.props.children, (group) => {
      if (!React.isValidElement(group)) return group
      let props = {
        noHover: this.props.noHover
      }
      return React.cloneElement( group, props )
    })
  }
  render() {
    // "data" prop is an HTML entity, it *must* be omitted.
    return <table {... _.omit(this.props, "data")} style={this.css.get("styles").area}>
      {this.renderChildren()}
    </table>
  }
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  baseStyles() {
    return {
      area: {
        width: "100%",
        textAlign: "left",
        backgroundColor: this.color.get("hex"),
        border: "none", padding: 0, margin: "20px 0",
        borderSpacing: 0,
      }
    }
  }
}
RC.Table.displayName = "RC.Table"
RC.Table.propTypes = Object.assign({}, RC.Table.propTypes, {
  noHover: React.PropTypes.bool
})


RC.TableAuto = class extends RC.Table {
  componentWillMount() {
    super.componentWillMount()
    this._preparation.call(this,this.props)
  }
  componentWillReceiveProps(np) {
    this._preparation.call(this,np)
  }
  _preparation(np) {
    let firstRow = {}
    const isReady = typeof np.isReady==="undefined" || np.isReady
    const header = np.header || []
    if (np.data && np.data.length) {
      firstRow = _.keys( _.omit(np.data[0],"rowProps"))
      _.defaults( header, firstRow )
    }

    this.header = header.map( (th,n) => {
      let headRow = typeof th==="string" ? { text: th } : th
      if (!headRow.name) headRow.name = firstRow[n] || null // Cannot be undefined for matching purposes
      return headRow
    })

    if (isReady) {
      this.init = true
      this.tbody = np.data.map( this.renderTableBody.bind(this) )
    }
  }
  renderHeader() {
    const propDefaults = {
      theme: this.props.theme,
      bgColor: this.props.headerBgColor,
      color: this.props.headerColor
    }

    return <RC.THead {... propDefaults}>
      <RC.TR>
      {
      this.header.map( (th,n) => {
        let props = {}
        if (h.nk(this.props, "sortBy.name")==th.name) {
          props.color = this.props.sortColor || "white"
          props.bgColor = this.props.sortBgColor || "rgba(0,0,0,.25)"
          props.sort = h.nk(this.props, "sortBy.sort") || "desc"
        }
        props = Object.assign({}, propDefaults, th, props)
        return <RC.TH {... props} key={n}>{th.text || th.children}</RC.TH>
      })
      }
      </RC.TR>
    </RC.THead>
  }
  renderTableBody(r,n) {
    const rowProps = r.rowProps
    const row = _.omit(r, "rowProps")
    const keys = _.keys(row)
    return <RC.TR {... rowProps} order={n} key={n}>
      {
      _.values(row).map( (td,nn) => {
        const tdVal = td && typeof td=="object" && !_.isDate(td) ? td : { text: td }
        const value = _.isFunction(this.header[nn].render)
          ? this.header[nn].render(tdVal.text)
          : (tdVal.text instanceof Date ? moment(tdVal.text).format( this.header[nn].dateFormat || this.props.dateFormat ) : tdVal.text)
        const passProps = Object.assign( tdVal, _.pick( this.header[nn], ["align","ellipsis"]))

        if (h.nk(this.props, "sortBy.name")==keys[nn]) {
          passProps.color = undefined
          passProps.bgColor = "rgba(0,107,195,.1)"
        }

        return <RC.TD {... passProps} key={nn}>{value}</RC.TD>
      })
      }
    </RC.TR>
  }
  renderChildren() {
    const isReady = typeof this.props.isReady==="undefined" || (this.props.isReady && this.tbody)
    const style = this.init && !isReady ? {opacity: .4} : undefined
    return <RC.TBody tbodyStyle={style}>
      {
      isReady || this.init
      ?
      this.tbody
      :
      <tr><td colSpan={this.header.length}>
        <RC.Loading />
      </td></tr>
      }
    </RC.TBody>
  }
  render() {
    return <table {... this.props} style={this.css.get("styles").area}>
      {this.renderHeader()}
      {this.renderChildren()}
    </table>
  }
}
RC.TableAuto.displayName = "RC.TableAuto"
RC.TableAuto.defaultProps = {
  dateFormat: "MM/DD/YYYY"
}
RC.TableAuto.propTypes = Object.assign({}, RC.TableAuto.propTypes, {
  data: React.PropTypes.array.isRequired,
  sortBy: React.PropTypes.object,
  sortColor: React.PropTypes.string,
  sortBgColor: React.PropTypes.string,
  header: React.PropTypes.array
})
