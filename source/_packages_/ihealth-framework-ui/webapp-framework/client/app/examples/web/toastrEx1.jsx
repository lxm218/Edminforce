
App.ToastrEx1 = App.Example(
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
      return <div style={style}>
        <a onClick={this.add.bind(this)}>Add Message</a><br />
        <a onClick={this.remove.bind(this)}>Remove Message</a>
        <RC.Toastr msg={this.state.msg} ref="toastr" />
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
      const msgList = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat sed turpis.",
        "Praesent pulvinar enim et nisl tristique pharetra. Ut et lobortis nibh.",
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce arcu risus, cursus sed nisi dapibus, consequat.",
        "Donec consectetur sapien lectus, vel vulputate risus tempus nec."
      ]
      const colorList = ["green","red","blue"]
      let newMsg = {
        bgColor: colorList[ Math.floor(Math.random()*3) ],
        // Content can be passed as "text" or "children", they both have same results
        // Content can be a string or a react element, it's up to you.
        // If you pass "title", it will auto create the title.
        title: moment().format("MMMM Do, HH:mm:ss:SS"),
        text: msgList[ Math.floor(Math.random()*4) ]
      }

      this.setState({ msg: newMsg })
    }

    remove() {
      this.refs.toastr.removeMsg()
    }

    renderExample() {
      let style = {
        'width': '30em'
      }
      return <div style={style}>
        <a onClick={this.add.bind(this)}>Add Message</a><br />
        <a onClick={this.remove.bind(this)}>Remove Message</a>
        <RC.Toastr msg={this.state.msg} ref="toastr" />
      </div>
    }
  }
)
