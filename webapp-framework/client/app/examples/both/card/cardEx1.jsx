
App.CardEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let props = {
        avatar: "/assets/examples/avatar1.jpg",
        title: "Bruno Lee",
        subtitle: "Handsome Dog"
      }
      return <RC.Card {... props}>
        <RC.Item theme="body">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
        </RC.Item>
      </RC.Card>
    }
  `
    }

    renderExample() {
      let props = {
        avatar: "/assets/examples/avatar1.jpg",
        title: "Bruno Lee",
        subtitle: "Handsome Dog"
      }
      return <RC.Card {... props}>
        <RC.Item theme="body">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
        </RC.Item>
      </RC.Card>
    }
  }
)
