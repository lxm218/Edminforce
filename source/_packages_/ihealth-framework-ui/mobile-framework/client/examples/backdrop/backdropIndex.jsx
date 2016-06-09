
App.Backdrop_Index = React.createClass({
  getInitialState() {
    return {
      closeAnywhere: false,
      backdrop: null
    }
  },
  closeBackdrop() {
    this.setState({backdrop: null})
  },
  closeActionsheet() {
    this.refs.actionsheet.hide()
  },
  backdrop1() {
    this.setState({
      routeName: "backdrop1",
      backdrop: <App.BackDrop1 />
    })
  },
  backdrop2() {
    this.setState({
      routeName: "backdrop2",
      backdrop: <App.BackDrop2 close={this.closeBackdrop} />
    })
  },
  backdrop3() {
    this.refs.actionsheet.show()
  },
  render() {
    return <div>
      <RC.List>
        <RC.Item theme="body">
          <h3>Backdrop Examples</h3>
          <p>You can use backdrops to create actionsheets, popup messages and more.</p>
        </RC.Item>

        <RC.ItemIcons uiClass="tags" uiColor="brand1" onClick={this.backdrop1}>Backdrop with Message</RC.ItemIcons>
        <RC.ItemIcons uiClass="tags" uiColor="brand2" onClick={this.backdrop2}>Backdrop with Close Button</RC.ItemIcons>
        <RC.ItemIcons uiClass="tags" uiColor="brand3" onClick={this.backdrop3}>Backdrop with Actionsheets</RC.ItemIcons>

      </RC.List>

      <RC.BackDropArea onClick={"backdrop1"==this.state.routeName ? this.closeBackdrop : null}>
        {this.state.backdrop}
      </RC.BackDropArea>

      <RC.ActionSheet ref="actionsheet">
        <p>Hello Actionsheet!</p>
        <RC.Button uiClass="remove">Delete</RC.Button>
        <RC.Button uiClass="copy">Copy</RC.Button>
        <RC.Button uiClass="arrows" break={true}>Move</RC.Button>
        <RC.Button color="red" colorHover="red" onClick={this.closeActionsheet}>Cancel</RC.Button>
      </RC.ActionSheet>
    </div>
  }
})


// Backdrop with Message
App.BackDrop1 = React.createClass({
  render() {
    return <div>
      <h3 style={{color: "white"}}>Hello I am a Backdrop<br />with a Message.</h3>
      <p>
        Clicking anywhere on the backdrop area will close me because
        a close handler function was passed to the &lt;RC.BackDropArea/&gt; component.
      </p>
    </div>
  }
})

// Backdrop with Message and close button
App.BackDrop2 = React.createClass({
  render() {
    return <div>
      <h3 style={{color: "white"}}>Hello I am a Backdrop<br />with close button.</h3>
      <p>
        To close this backdrop, click the button below.
      </p>
      <p>
        <RC.Button theme="inline" bgColor="brand1" onClick={this.props.close}>Close</RC.Button>
      </p>
    </div>
  }
})
