
App.Form = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      form1: Session.get("form1"),
      form2: Session.get("form2")
    }
  },
  componentWillUnmount() {
    delete Session.keys["form1"]
    delete Session.keys["form2"]
  },
  formSubmit(e){
    e.preventDefault()
    /**
     Note:
     getFormData() is a helper function that makes it easier to access and manipulate <form> data.
     It creates an object with all of the form element's name and value.
    */
    Session.set("form1", this.refs.myForm.getFormData())
  },
  formInputChange(){
    Session.set("form2", this.refs.form2Input.getValue())
  },
  formSelectChange(){
    Session.set("form2", this.refs.form2Select.getValue())
  },
  render() {

    return <div className="padding">

      <h4 className="padding-t">Form Submit Example</h4>

      <RC.Form ref="myForm" onSubmit={this.formSubmit}>

        <RC.Input
          name="name" value="Bruno"
          label="Full Name" />
        <RC.Select
          options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
          name="favFruit" value="Oranges"
          label="Favourite Fruit" />
        <RC.Button name="button" text="Submit" />

      </RC.Form>

      <p className="padding-t" style={{color: "red"}}>
        {this.data.form1 ? <span>Hello, my name is <strong>{this.data.form1.name}</strong>. My favourite fruits are <strong>{this.data.form1.favFruit}</strong>.</span> : null}
      </p>

      <h4 className="padding-t">Input Change Example</h4>
      <RC.Input
        ref="form2Input"
        changeHandler={this.formInputChange}
        value="Hello World" label="Type Here" />
      <RC.Select
        ref="form2Select"
        options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
        changeHandler={this.formSelectChange}
        value="Donkey" label="Change This" />

      <p className="padding-t" style={{color: "red"}}>{this.data.form2}</p>

    </div>
  }
})

//dfdfd
