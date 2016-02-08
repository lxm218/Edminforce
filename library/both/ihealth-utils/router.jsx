
FlowRouter.LastRoute = []
var savedRoute = null

// ##
// Router Group
DefaultRoutes = FlowRouter.group({
  // prefix: '/example',
  triggersEnter: [
    function(r) {
      // This is the Before() function for every DefaultRoutes Group
      //
      // Examples of useful things you could put in here include...
      // Google Analytics
      // MixPanel
      // Disable/Enable Animations

      window.scrollTo(0,0)

      if (!FlowRouter.Silent && !FlowRouter.BackButton && savedRoute) {
        FlowRouter.LastRoute = _.filter( FlowRouter.LastRoute, (route) => {
          return route != savedRoute
        })
        FlowRouter.LastRoute.push(savedRoute)
      } else if (FlowRouter.BackButton)
        FlowRouter.LastRoute.pop()

      if (!FlowRouter.Silent)
        savedRoute = FlowRouter.current().path

      FlowRouter.BackButton = false
      FlowRouter.Silent = false
    }
  ]
})
