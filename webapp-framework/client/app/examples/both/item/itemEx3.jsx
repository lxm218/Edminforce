
App.ItemEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const avatar = {
        theme: "avatar",
        src: "/assets/examples/avatar2.jpg",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.Card {... avatar} style={{margin:0,boxShadow:"none"}}>
        <RC.ItemImage src="/assets/examples/img2.jpg" />
      </RC.Card>
    }
  `
    }
    renderExample() {
      const avatar = {
        theme: "avatar",
        src: "/assets/examples/avatar2.jpg",
        title: "Bruno Lee",
        subtitle: "Very handsome dog"
      }
      return <RC.Card {... avatar} style={{margin:0,boxShadow:"none"}}>
        <RC.ItemImage src="/assets/examples/img2.jpg" />
      </RC.Card>
    }
  }
)
