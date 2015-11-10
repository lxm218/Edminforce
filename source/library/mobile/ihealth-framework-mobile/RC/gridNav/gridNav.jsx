
RC.GridNav = React.createClass({
  mixins: [RC.Mixins.PureRender,RC.Mixins.CSS],
  displayName: "GridNav",
  propTypes: {
    id: React.PropTypes.string,

    theme: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),

    isVisible: React.PropTypes.bool,
    startTab: React.PropTypes.number,
    list: React.PropTypes.array,
  },
  getRow(np) {
    let props = np || this.props
    let perRow = !isNaN(props.itemsPerRow) ? props.itemsPerRow : 3
    return Math.min(Math.max(perRow, 0), 4)
  },
  renderRow(row, index) {
    let styles = this.css.styles
    return <div style={styles.row} key={index}>
      {
      row.map(function(c,n){
        let child = <div style={styles.label}>{c.props.children}</div>
        let thisStyle = styles.item

        let props = {
          key: n,
          style: thisStyle,
          uiTheme: "inline-block",
          uiSize: c.props.uiSize || 28,
        }
        return React.cloneElement(c, props, child)
      })
      }
    </div>
  },
  render() {
    let self = this
    let styles = this.css.styles
    let children = h.uniformChildren(this.props.children, "URL")
    let perRow = this.getRow()

    let groups = _.filter( children.map( function(c,n){
        return n%perRow===0 ? children.slice(n, n+perRow) : null
    }), function(c){ return c })

    return <div style={styles.area}>
      {
      groups.map(function(g,n){
        return self.renderRow(g,n)
      })
      }
      {
      _.range(perRow-1).map(function(line,n){
        return <span style={h.assignClone(styles.line,{left: `${100/perRow*(n+1)}%`})} key={n} />
      })
      }
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  watchProps: ["itemsPerRow","rowHeight"],
  baseStyles(np,ns) {
    let perRow = this.getRow(np)

    return {
      area: {
        position: "absolute", bottom: 0, left: 0, right: 0, top: "auto",
        background: this.color.hex,
      },
      row: {
        borderTop: `solid 1px ${RC.Theme.color.edges}`,
        display: "flex", alignItems: "center", minHeight: 100,
      },
      item: {
        width: `${100/perRow}%`, padding: "15px 10px 10px",
        textAlign: "center",
        fontSize: RC.Theme.font.size-3,
      },
      label: {
        padding: "5px 0 0"
      },
      line: {
        position: "absolute", top: 1, bottom: 1,
        width: 1,
        background: RC.Theme.color.edges
      }
    }
  }
})
