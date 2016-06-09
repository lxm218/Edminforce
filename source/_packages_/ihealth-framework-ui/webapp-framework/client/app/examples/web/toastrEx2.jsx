
App.ToastrEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(p) {
      super(p)
      this.state = {
        msg: null
      }
    }

    add() {
      let msgList = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat sed turpis.",
        "Praesent pulvinar enim et nisl tristique pharetra. Ut et lobortis nibh.",
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce arcu risus, cursus sed nisi dapibus, consequat.",
        "Donec consectetur sapien lectus, vel vulputate risus tempus nec."
      ]
      let newMsg = <div>
        <strong>{moment().format("MMMM Do, HH:mm:ss:SS")}</strong><br />
        {msgList[ Math.floor(Math.random()*4) ]}
      </div>

      this.setState({ msg: newMsg })
    }

    remove() {
      this.refs.toastr.removeMsg()
    }

    renderExample() {
      let style = {
        'width': '30em'
      }
      let msgStyle = {
        'backgroundColor': (Math.random() > 0.5) ? 'orange' : 'lightblue'
      }
      let xContainStyle = {
        'backgroundColor': 'red'
      }
      let xTopStyle = {
        'backgroundColor': 'green'
      }
      let xBotStyle = {
        'backgroundColor': 'blue'
      }
      return <div style={style}>
        <a onClick={this.add.bind(this)}>Add Message</a><br />
        <a onClick={this.remove.bind(this)}>Remove Message</a>
        <RC.Toastr msg={this.state.msg} ref="toastr" msgStyle={msgStyle} xContainStyle={xContainStyle} xTopStyle={xTopStyle} xBotStyle={xBotStyle} />
      </div>
    }
  `
    }

    constructor(p) {
      super(p)
      this.state = {
        msg: null
      }
    }

    add() {
      let msgList = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat sed turpis.",
        "Praesent pulvinar enim et nisl tristique pharetra. Ut et lobortis nibh.",
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce arcu risus, cursus sed nisi dapibus, consequat.",
        "Donec consectetur sapien lectus, vel vulputate risus tempus nec."
      ]
      let newMsg = <div>
        <strong>{moment().format("MMMM Do, HH:mm:ss:SS")}</strong><br />
        {msgList[ Math.floor(Math.random()*4) ]}
      </div>

      this.setState({ msg: newMsg })
    }

    remove() {
      this.refs.toastr.removeMsg()
    }

    renderExample() {
      let style = {
        'width': '30em'
      }
      let msgStyle = {
        'backgroundColor': (Math.random() > 0.5) ? 'orange' : 'lightblue'
      }
      let xContainStyle = {
        'backgroundColor': 'red'
      }
      let xTopStyle = {
        'backgroundColor': 'green'
      }
      let xBotStyle = {
        'backgroundColor': 'blue'
      }
      return <div style={style}>
        <a onClick={this.add.bind(this)}>Add Message</a><br />
        <a onClick={this.remove.bind(this)}>Remove Message</a>
        <RC.Toastr msg={this.state.msg} ref="toastr" msgStyle={msgStyle} xContainStyle={xContainStyle} xTopStyle={xTopStyle} xBotStyle={xBotStyle} />
      </div>
    }
  }
)
