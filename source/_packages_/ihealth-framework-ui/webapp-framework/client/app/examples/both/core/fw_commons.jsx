App.NotFoundEx1 = App.Example(
  class extends RC.Code {
    code(){
      return `
    renderExample() {
      return <RC.NotFound />
    }
  `
    }
    renderExample() {
      return <RC.NotFound />
    }
  }
)

App.AvatarEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      let style = {
        'width': '30em'
      }
      return <RC.Div style={style}>
            <RC.Avatar src="/assets/examples/avatar4.jpg" theme="regular" uiColor="white" />
        </RC.Div>
    }
    code(){
      return `
    renderExample() {
      let style = {
        'width': '30em'
      }
      return <RC.Div style={style}>
            <RC.Avatar src="/assets/examples/avatar4.jpg" theme="regular" uiColor="white" />
        </RC.Div>
    }
  `
    }
  }
)
App.AvatarEx2 = App.Example(
  class extends RC.Code {
    renderExample() {
      let style = {
        'width': '30em'
      }
      return <RC.Div style={style}>
          <RC.Avatar src="/assets/examples/avatar3.jpg" theme="absLeft" uiColor="white" />
      </RC.Div>
    }
    code(){
      return `
    renderExample() {
      let style = {
        'width': '30em'
      }
      return <RC.Div style={style}>
          <RC.Avatar src="/assets/examples/avatar3.jpg" theme="absLeft" uiColor="white" />
      </RC.Div>
    }
  `
    }
  }
)

App.VerticalAlignEx1 = App.Example(
 class extends RC.Code {
    renderExample() {
      return (
        <div label="Watermelons">
          <RC.VerticalAlign center={true} className="padding" height="300px">
            <h1>
              Vertical Align
            </h1>
            <p>
              Hello, I am a DIV that is centered vertically and also horizontally.
            </p>
          </RC.VerticalAlign>
        </div>
      )
    }
   code(){
     return `
    renderExample() {
      return (
        <div label="Watermelons">
          <RC.VerticalAlign center={true} className="padding" height="300px">
            <h1>
              Vertical Align
            </h1>
            <p>
              Hello, I am a DIV that is centered vertically and also horizontally.
            </p>
          </RC.VerticalAlign>
        </div>
      )
    }
  `
   }
  }
)
