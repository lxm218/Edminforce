"use strict"

// Web Checkbox
RC.Checkbox = class extends RC.CheckboxBase {
  constructor(p) {
    super(p)
    this.renderCheckbox = this.renderInput
  }
  baseStyles(np,ns) {
    return {
      area: {
        fontSize: RC.Theme.font.size,
        cursor: "pointer"
      },
      form: {
        margin: "0 8px 0 2px"
      }
    }
  }
}
RC.Checkbox.displayName = "RC.Checkbox"

RC.CheckboxGroup = class extends RC.CSS {
  renderLabel() {
    if (!this.props.label) return null
    return <div style={this.css.get("styles").label}>{this.props.label}</div>
  }
  renderChildren() {
    const render = (options) => {
      return h.renderWithFunction( options, (props, n) => {
        if (this.props.theme) {
          let themes = h.strToArray(props.theme)
          props.theme = themes.concat(this.props.theme)
        }
        return <RC.Checkbox {... props} key={n} />
      })
    }

    if (this.props.options[0] && _.isArray(this.props.options[0]))
      return this.props.options.map( (o,n) => {
        return <div style={{float: "left", marginRight: this.props.options.length-1!=n ? RC.Theme.size.paddingPx*2 : 0}} key={n}>
          {render(o)}
        </div>
      })
    return render( this.props.options )
  }
  render() {
    return <div {... _.omit(this.props, "label")} style={this.css.get("styles").area}>
      {this.renderLabel()}
      {this.renderChildren()}
    </div>
  }
  baseStyles(np,ns) {
    if (typeof this.labelColor === "undefined" || np.labelColor != this.props.labelColor)
      this.labelColor = np.labelColor
        ? h.getRealColor(np.labelColor, "silver", null, true)
        : RC.Theme.color.silver

    return {
      area: {
        padding: "5px 0"
      },
      label: {
        padding: "0 0 5px", margin: "0 0 8px",
        borderBottom: `solid 1px ${RC.Theme.color.edges}`,
        color: this.labelColor
      }
    }
  }
  themeStyles() {
    return {
      smaller: {
        label: {
          fontSize: RC.Theme.font.size-2
        }
      }
    }
  }
}

RC.CheckboxGroup.displayName = "RC.CheckboxGroup"
RC.CheckboxGroup.propTypes = Object.assign({}, RC.CheckboxGroup.propTypes, {
  options: React.PropTypes.array
})
