
App.Form_Handling = React.createClass({
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
  formReset(e){
    e.preventDefault()
    this.refs.input1.reset()
    this.refs.input2.reset()
  },
  formSubmit(e){
    e.preventDefault()
    /**
     Note:
     getFormData() is a helper function that makes it easier to access and manipulate <form> data.
     It creates an object with all of the form element's name and value.

     However, unless all the form elements have a "name" prop, it will not be returned here.
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

    return <RC.List>



      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>When looking at this example code, imagine mongo queries where there are sessions.</p>
        <p>Pay close attention to getFormData() and getValue() functions and how they can help in performing mongo queries.</p>
      </RC.Item>



      <RC.Form ref="myForm" onSubmit={this.formSubmit} onReset={this.formReset}>
        <RC.Item theme="divider">Form Submit</RC.Item>
        <RC.Input
          ref="input1"
          name="name" value="Bruno Lee"
          label="Full Name"
        />
        <RC.Select
          ref="input2"
          options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
          name="favFruit" value="Oranges"
          label="Favourite Fruit"
        />
        <RC.Item>
        <RC.Button name="button" buttonColor="brand" style={{marginRight: "5px"}}>Submit</RC.Button>
        <RC.Button name="button" type="reset" buttonColor="brand">Reset</RC.Button>
        </RC.Item>
        {
        !this.data.form1 ? null :
        <RC.Item theme="body" style={{color: "red"}}>
          Hello, my name is <strong>{this.data.form1.name}</strong>. My favourite fruits are <strong>{this.data.form1.favFruit}</strong>.
        </RC.Item>
        }
      </RC.Form>



      <RC.Item theme="divider">Form Change</RC.Item>
      <RC.Input
        ref="form2Input"
        changeHandler={this.formInputChange}
        value="Hello World" label="Type Here"
      />
      <RC.Select
        ref="form2Select"
        options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
        changeHandler={this.formSelectChange}
        value="Donkey" label="Change This"
      />
      {
      !this.data.form2 ? null :
      <RC.Item style={{color: "red"}}>
        {this.data.form2}
      </RC.Item>
      }



    </RC.List>
  }
})

//dfdfd
