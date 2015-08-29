
App.Basic_Inset_Form = React.createClass({
  doNothing(e) {
    e.preventDefault()
  },
  render() {

    return <div>

      <div className="bg-dark">
        <RC.List theme="inset">
          <RC.Item theme="body">
            <h3 className="dark">Description</h3>
            <p>Creating form elements inside an inset-list can produce a different look.</p>
          </RC.Item>
        </RC.List>
      </div>


      <RC.Form className="bg-brand" onSubmit={this.doNothing}>
        <RC.List theme="inset">
          <RC.Item theme="divider">Office Setup</RC.Item>
          <RC.Input name="computer" theme="small-label" label="Computer" labelColor="brand1" value="iMac" />
          <RC.Input name="chair" theme="small-label" label="Furniture Colour" labelColor="brand1" value="Black" />
          <RC.Textarea theme="small-label" name="requests" label="Requests" labelColor="brand1" placeholder="Enter any complaints or requests here." />
        </RC.List>
      </RC.Form>


      <RC.Form className="bg-brand2" onSubmit={this.doNothing}>
        <RC.List theme="inset">
          <RC.Item theme="divider">Office Setup</RC.Item>
          <RC.Input name="computer" theme="small-label" label="Computer" labelColor="brand2" value="iMac" />
          <RC.Input name="chair" theme="small-label" label="Furniture Colour" labelColor="brand2" value="Black" />
          <RC.Textarea theme="small-label" name="requests" label="Requests" labelColor="brand2" placeholder="Enter any complaints or requests here." />
        </RC.List>
    </RC.Form>


    <RC.Form className="bg-brand3" onSubmit={this.doNothing}>
      <RC.List theme="inset">
        <RC.Item theme="divider">Office Setup</RC.Item>
        <RC.Input name="computer" theme="small-label" label="Computer" labelColor="brand3" value="iMac" />
        <RC.Input name="chair" theme="small-label" label="Furniture Colour" labelColor="brand3" value="Black" />
        <RC.Textarea theme="small-label" name="requests" label="Requests" labelColor="brand3" placeholder="Enter any complaints or requests here." />
      </RC.List>
  </RC.Form>

  </div>
  }
})
