App.Task = React.createClass({
  render() {

    return <div className="padding">
      <h4 className="padding-t">Form Submit Example</h4>
      <App.TaskForm/>
      <App.TaskList/>
    </div>
  }
})

App.TaskForm = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      //form1: Session.get("form1"),

    }
  },
  componentWillUnmount() {
    //delete Session.keys["form1"]

  },
  formSubmit(e){
    e.preventDefault()
    /**
     Note:
     getFormData() is a helper function that makes it easier to access and manipulate <form> data.
     It creates an object with all of the form element's name and value.
    */
    let objGetFormData = this.refs.myForm.getFormData();
    console.log("formObject is,", objGetFormData);

    let newMember = {
      title: objGetFormData.name,
      subtitle: objGetFormData.favFruit,
      date: new Date()
    };
    MembersColl.insert(newMember);

  },
  render() {

    return <RC.Form className="space-b" ref="myForm" onSubmit={this.formSubmit}>
      <RC.Input
        name="name" value="Bruno"
        label="Full Name" />
      <RC.Select
        options={["Apples","Bananas","Oranges","Watermelons","Pears"]}
        name="favFruit" value="Oranges"
        label="Favourite Fruit" />
      <RC.Button name="button" text="Submit" />
    </RC.Form>
  }
})

App.TaskList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe("getAllMembers");

    return {
      isLoading: ! handle.ready(), // Use handle to show loading state
      members:MembersColl.find().fetch()
    }
  },
  render() {
    let myList = MembersColl.find();
    return <RC.List list={this.data.members} />
  }
})
