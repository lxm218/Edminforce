
App.Form_Handling = React.createClass({
  getInitialState() {
    return {
      form1: null,
      form2: null
    }
  },
  formReset(e) {
    e.preventDefault()
    this.refs.input1.reset()
    this.refs.input2.reset()
  },
  formSubmit(e) {
    e.preventDefault()
    /**
     Note:
     getFormData() is a helper function that makes it easier to access and manipulate <form> data.
     It creates an object with all of the form element's name and value.

     However, unless all the form elements have a "name" prop, it will not be returned here.
    */
    this.setState({
      form1: this.refs.myForm.getFormData()
    })
  },
  formInputChange() {
    this.setState({
      form2: this.refs.form2Input.getValue()
    })
  },
  formSelectChange() {
    this.setState({
      form2: this.refs.form2Select.getValue()
    })
  },
  form3errorHandler(val) {
    return val!="Oranges"
  },
  render() {

    return <RC.Form ref="myForm" onSubmit={this.formSubmit} onReset={this.formReset}>


      <RC.Item theme="body">
        <h3>Description</h3>
        <p>When looking at this example code, imagine mongo queries where there are sessions.</p>
        <p>Pay close attention to getFormData() and getValue() functions and how they can help in performing mongo queries.</p>
      </RC.Item>


      <RC.Item theme="divider">Form Submit</RC.Item>
      <RC.Div theme="padding">
        <RC.Input
          ref="input1"
          name="name" value="Bruno Lee"
          label="Full Name"
        />
        <RC.Select
          ref="input2"
          style={{marginBottom: 20}}
          options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
          name="favFruit" value="Oranges"
          label="Favourite Fruit"
        />
        <RC.Button name="button" theme="inline" bgColor="brand1" style={{marginRight: "5px"}}>Submit</RC.Button>
        <RC.Button name="button" theme="inline" type="reset">Reset</RC.Button>
      </RC.Div>
      {
      !this.state.form1 ? null :
      <RC.Item theme="body" style={{color: "red"}}>
        Hello, my name is <strong>{this.state.form1.name}</strong>. My favourite fruits are <strong>{this.state.form1.favFruit}</strong>.
      </RC.Item>
      }


      <RC.Item theme="divider">Form Change</RC.Item>
      <RC.Div theme="padding">
        <RC.Input
          ref="form2Input"
          onChange={this.formInputChange}
          value="Hello World" label="Type Here"
        />
        <RC.Select
          ref="form2Select"
          options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
          onChange={this.formSelectChange}
          value="Donkey" label="Change This"
        />
      </RC.Div>
      {
      !this.state.form2 ? null :
      <RC.Item style={{color: "red"}}>
        {this.state.form2}
      </RC.Item>
      }


      <RC.Item theme="divider">Error Handler</RC.Item>
      <RC.Div theme="padding">
        <RC.Input
          theme="stacked-label"
          errorHandler={this.form3errorHandler}
          value="Oranges" label='Must be equal to "Oranges"'
        />
        <RC.Select
          theme="stacked-label"
          errorHandler={this.form3errorHandler}
          options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
          value="Oranges"
          label="Favourite Fruit"
        />
      </RC.Div>
    </RC.Form>
  }
})

//dfdfd
