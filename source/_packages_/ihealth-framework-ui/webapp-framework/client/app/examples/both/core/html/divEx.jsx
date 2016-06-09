App.DivEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
      renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em',
        'backgroundImage': 'url(/assets/examples/hero.jpg)'
      }
      return (
        <RC.Div style={style}>
          some content
        </RC.Div>
      )
    }
  `
    }
    
    renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em',
        'backgroundImage': 'url(/assets/examples/hero.jpg)'
      }
      return (
        <RC.Div style={style}>
          some content
        </RC.Div>
      )
    }
  }
)

App.DivEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em',
        'backgroundImage': 'url(/assets/examples/hero.jpg)'
      }
      return (
        <RC.Div style={style} theme="background">
        </RC.Div>
      )
    }
  `
    }

    renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em',
        'backgroundImage': 'url(/assets/examples/hero.jpg)'
      }
      return (
        <RC.Div style={style} theme="background">
        </RC.Div>
      )
    }
  }
)

App.DivEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `

    renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em'
      }
      return (
        <RC.Div style={style} theme="full">
          some content
        </RC.Div>
      )
    }
  `
    }

    renderExample() {
      let style = {
        'padding': '5em',
        'height': '5em'
      }
      return (
        <RC.Div style={style} theme="full">
          some content
        </RC.Div>
      )
    }
  }
)

App.DivEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let style1 = {
        'height': '7em'
      }
      let style2 = {
        'width': '40%'
      }
      let style3 = {
        width: '40%'
      }
      return (
        <RC.Div style={style1}>
          <RC.Div style={style2}>
            no theme
          </RC.Div>
          <br />
          <RC.Div theme="autoMargin" style={style3}>
            autoMargin theme
          </RC.Div>
        </RC.Div> 
      )
    }
  `
    }

    renderExample() {
      let style1 = {
        'height': '7em'
      }
      let style2 = {
        'width': '40%'
      }
      let style3 = {
        width: '40%'
      }
      return (
        <RC.Div style={style1}>
          <RC.Div style={style2}>
            no theme
          </RC.Div>
          <br />
          <RC.Div theme="autoMargin" style={style3}>
            autoMargin theme
          </RC.Div>
        </RC.Div> 
      )
    }
  }
)
