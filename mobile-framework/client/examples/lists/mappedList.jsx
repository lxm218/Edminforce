
App.Mapped_List = React.createClass({
  render() {

    let FakeDataFromMongo = [{
      avatar: "/assets/examples/avatar1.jpg",
      href: "/lists/List_Index",
      title: "Bruno Lee",
      subtitle: "Click this to go back to the list index.",
    },{
      avatar: "/assets/examples/avatar2.jpg",
      title: "Bruno Lee",
      subtitle: "I am the best dog in the world.",
    },{
      avatar: "/assets/examples/avatar3.jpg",
      title: "Bruno Lee",
      subtitle: "I am the most handsome dog in the world.",
    },{
      avatar: "/assets/examples/avatar7.jpg",
      title: "Bear Alagatharam",
      subtitle: "I like to eat and roll in mud.",
    },{
      avatar: "/assets/examples/avatar8.jpg",
      title: "Bruce Wayne",
      subtitle: "My vehicles are black.",
    },{
      avatar: "/assets/examples/avatar9.jpg",
      title: "Clark Kent",
      subtitle: "I can fly.",
    }]

    let brand = ["brand1","brand2","brand3"]

    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>When you write code, try not to write repeated code. Utilize map() functions to write better code.</p>
      </RC.Item>
      {
      FakeDataFromMongo.map(function(row,n){
        return <RC.Item
          theme="avatar"
          avatar={row.avatar}
          uiClass="phone" uiColor={brand[n%3]}
          title={row.title}
          subtitle={row.subtitle}
          href={row.href}
          key={n}
        />
      })
      }
    </RC.List>
  }
})
