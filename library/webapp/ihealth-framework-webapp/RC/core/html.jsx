"use strict";

RC.WebBody = class extends RC.Body {
  constructor(props) {
    super(props)
    this.watchProps = ["leftNav","topNav"]
  }
  baseStyles(np,ns) {
    let BASE = super.baseStyles(np,ns)
    BASE.area.padding = `${np.topNav ? RC.Theme.size.topNavHeight : 0}px 0 0 ${np.leftNav ? RC.Theme.size.leftNavWidth : 0}px`
    return BASE
  }
}

RC.WebBody.displayName = "RC.WebBody"
RC.WebBody.propTypes = Object.assign({}, RC.WebBody.propTypes, {
  leftNav: React.PropTypes.bool,
  topNav: React.PropTypes.bool
})
