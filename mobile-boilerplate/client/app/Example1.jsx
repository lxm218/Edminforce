App.Ex1 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      form1: Session.get("form1"),

    }
  },
  componentWillUnmount() {
    delete Session.keys["form1"]

  },
  formSubmit(e){
    e.preventDefault()
    /**
     Note:
     getFormData() is a helper function that makes it easier to access and manipulate <form> data.
     It creates an object with all of the form element's name and value.
    */
    let formData = this.refs.myForm.getFormData();
    Session.set("form1", formData)
    alert("You submitted " + formData.name + ' ' + formData.favFruit);
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



    </div>
  }
})
