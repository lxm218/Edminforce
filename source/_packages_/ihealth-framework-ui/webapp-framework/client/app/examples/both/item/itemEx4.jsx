
App.ItemEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      const areaInnerStyle = {
        "fontStyle": "italic"
      }
      const titleStyle = {
        "color": "orange"
      }
      const subtitleStyle = {
        "color": "red"
      }
      const noteStyle = {
        "color": "green"
      }
      const avatar = {
        src: "/assets/examples/avatar5.jpg",
        uiClass: "smile-o",
        uiColor: "brand3",
        title: "Bruno Lee",
        subtitle: "Very handsome dog",
        areaInnerStyle: areaInnerStyle,
        titleStyle: titleStyle,
        subtitleStyle: subtitleStyle,
        noteStyle: noteStyle
      }
      return <RC.List>
        <RC.ItemAvatar {... avatar} />
        <RC.Item {... avatar} />
      </RC.List>
    }
  `
    }

    renderExample() {
      const areaInnerStyle = {
        "fontStyle": "italic"
      }
      const titleStyle = {
        "color": "orange"
      }
      const subtitleStyle = {
        "color": "red"
      }
      const noteStyle = {
        "color": "green"
      }
      const avatar = {
        src: "/assets/examples/avatar5.jpg",
        uiClass: "smile-o",
        uiColor: "brand3",
        title: "Bruno Lee",
        subtitle: "Very handsome dog",
        areaInnerStyle: areaInnerStyle,
        titleStyle: titleStyle,
        subtitleStyle: subtitleStyle,
        noteStyle: noteStyle
      }
      return <RC.List>
        <RC.ItemAvatar {... avatar} />
        <RC.Item {... avatar} />
      </RC.List>
    }
  }
)