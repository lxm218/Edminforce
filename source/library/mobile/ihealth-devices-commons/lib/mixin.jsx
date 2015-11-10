
// Not Exported
let MiniFlux = function(){
  Object.assign(this, {
    tab: 0,
    cb: {}
  })
}
MiniFlux.prototype = {
  assignCB(name, cb) {
    if (_.isFunction(cb) && typeof name==="string")
      this.cb[name] = cb
  },
  removeCB(name) {
    if (this.cb[name])
      delete this.cb[name]
  },
  getState() {
    return {
      tab: this.tab
    }
  },
  mixinCB() {
    let callbacks = _.values(this.cb)
    let state = this.getState()
    callbacks.map(function(cb){
      if (_.isFunction(cb))
        cb(state)
    })
  },
  update(tab) {
    this.tab = tab
    this.mixinCB()
  }
}

let MiniDispatcher = new MiniFlux()

IH.Mixins.TabContents = {
  componentWillMount() {
    let self = this
    if (this.appName)
      MiniDispatcher.assignCB(this.appName, function(res){
        if (self.isMounted())
          self.setState(res)
      })
  },
  getInitialState() {
    return MiniDispatcher.getState()
  },
  update(tab) {
    MiniDispatcher.tab = tab
    MiniDispatcher.mixinCB()
  }
}
