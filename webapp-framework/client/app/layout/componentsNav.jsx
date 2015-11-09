
App.Layout.ComponentsNav = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    let comps, cats = []

    let isReady = App.Subs1.ready()
    if (isReady) {
      comps = App.Coll.Components.find({
        platform: this.props.platform
      },{
        fields: {
          name: 1,
          category: 1,
          platform: 1,
          slug: 1
        }
      }).fetch()
      cats = App.Coll.Categories.find({}, {
        sort: { weight: -1 },
        fields: {
          name: 1,
          weight: 1,
        }
      }).fetch()
    }

    return {
      comps: comps,
      cats: cats,
      isReady: isReady
    }
  },
  render() {
    let self = this
    let platform = this.props.platform
    let lastCat = null
    // let nav = []

    // this.data.cats.map(function(cat,n){
    //   nav.push(<RC.Subtitle theme="line" key={n}>{cat.name}</RC.Subtitle>)
    //   let comps = _.filter(self.data.comps,function(c){
    //     return c.category==cat._id && c.slug
    //   })
    //   nav.push(comps.map(function(c,nn){
    //     return <RC.URL href={`/${platform}/components/${c.slug}`} key={`${n}-${nn}`}>{c.name}</RC.URL>
    //   }))
    // })

    return <div>
      {
      this.data.cats.map(function(cat,n){
        let nav = [<RC.Subtitle theme="line" key={n}>{cat.name}</RC.Subtitle>]
        let comps = _.filter(self.data.comps,function(c){
          return c.category==cat._id && c.slug
        })
        nav = nav.concat(comps.map(function(c,nn){
          return <RC.URL href={`/${platform}/components/${c.slug}`} key={`${n}-${nn}`}>{c.name}</RC.URL>
        }))
        return nav
      })
      }
    </div>
  }
})
