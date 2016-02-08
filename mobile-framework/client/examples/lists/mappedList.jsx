
App.Mapped_List = React.createClass({
  render() {

    let FakeDataFromMongo = [{
      src: "/assets/examples/avatar1.jpg",
      href: "/lists/List_Index",
      title: "Bruno Lee",
      subtitle: "Click this to go back to the list index.",
    },{
      src: "/assets/examples/avatar2.jpg",
      title: "Bruno Lee",
      subtitle: "I am the best dog in the world.",
    },{
      src: "/assets/examples/avatar3.jpg",
      title: "Bruno Lee",
      subtitle: "I am the most handsome dog in the world.",
    },{
      src: "/assets/examples/avatar7.jpg",
      title: "Bear Alagatharam",
      subtitle: "I like to eat and roll in mud.",
    },{
      src: "/assets/examples/avatar8.jpg",
      title: "Bruce Wayne",
      subtitle: "My vehicles are black.",
    },{
      src: "/assets/examples/avatar9.jpg",
      title: "Clark Kent",
      subtitle: "I can fly.",
    }]

    let brand = ["brand1","brand2","brand3"]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>When you write code, try not to write repeated code. Utilize map() functions to write better code.</p>
      </RC.Item>
      {
      FakeDataFromMongo.map(function(row,n){
        return <RC.ItemAvatar
          src={row.avatar}
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
