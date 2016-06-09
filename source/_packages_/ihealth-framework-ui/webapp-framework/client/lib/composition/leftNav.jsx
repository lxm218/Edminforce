
App.CreateLeftNav = (nav) => {

  const createNavItem = (obj,n) => {
    return <RC.URL {... _.omit(obj, "children")} key={n}>{obj.children}</RC.URL>
  }

  return <RC.LeftNav logo="/assets/logo.png" logoHref="/" bgColor="dark">
    {
    (nav || []).map((group,n) => {
      return <RC.NavGroup title={group.title} key={n}>
      {
      group.list.map((item,nn) => {
        return createNavItem(item,nn)
      })
      }
      </RC.NavGroup>
    })
    }
  </RC.LeftNav>
}
