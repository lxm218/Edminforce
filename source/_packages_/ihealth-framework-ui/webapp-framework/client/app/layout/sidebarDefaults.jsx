
App.SidebarDefaults = React.createClass({
  
  render() {

    let platform = this.props.platform
    let areaStyle = { padding: "14px 0 0" }
    let innerStyle = {}
    let innerBorder = {borderBottom: "solid 1px "+RC.Theme.color.edges, padding: "0 0 14px"}

    if (this.props.addLine) {
      Object.assign(innerBorder, this.props.keyRef ? {padding: "28px 0 14px"} : {padding: "14px 0"})
      innerStyle = innerBorder
    } else if (this.props.keyRef) {
      Object.assign(innerBorder, {padding: "14px 0"})
    }

    switch(this.props.switch) {
      case "utility":
        return <div style={areaStyle}>
          <p style={innerBorder}>
            <strong>Utility</strong>
          </p>
          <p style={innerStyle}>
            These are helpful functions and callbacks built into this component.
          </p>
        </div>
      break
      case "themes":
        return <div style={areaStyle}>
          <p style={innerBorder}>
            <strong>Themes</strong>
          </p>
          <p style={innerStyle}>
            The theme prop changes the way the component looks or functions. You can choose one theme by passing a string or multiple themes by passing an array of strings.
          </p>
        </div>
      break
      case "colorProps":
        return <div style={areaStyle}>
          <p style={innerBorder}>
            <strong>Colors</strong>
          </p>
          <p style={innerStyle}>
            Any color related props (such as bgColor, color, uiBgColor, uiColor) accepts string as its value.
          </p>
          <p style={innerStyle}>
            If the name matches one of the theme's color variables, that value will be used. Otherwise, the component will check to see if the value provided is a valid color.
          </p>
        </div>
      break
      case "styles":
        return <div style={areaStyle}>
          <p style={innerBorder}>
            <strong>Styles</strong>
          </p>
          <p style={innerStyle}>
            You can use these prop(s) to set the inline styles.
          </p>
          {
          (this.props.values || []).map(function(data,n){
            return <p key={n} style={innerStyle}>
              <span style={{color: platform=="mobile" ? RC.Theme.color.brand2 : RC.Theme.color.brand1}}>{data.name}</span><br />
              {data.desc}
            </p>
          })
          }
        </div>
        break
      default:
        return <p dangerouslySetInnerHTML={{__html: this.props.children}} style={innerStyle}></p>
    }
  }
})
