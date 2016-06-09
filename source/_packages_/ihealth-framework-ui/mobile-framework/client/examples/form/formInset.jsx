
App.Basic_Inset_Form = React.createClass({
  doNothing(e) {
    e.preventDefault()
  },
  render() {

    return <div>

      <RC.Div bgColor="light">
        <RC.List theme="inset">
          <RC.Item style={{paddingBottom: 20}}>
            <h3>Description</h3>
            <p>Creating form elements inside an inset-list can produce a different look.</p>
          </RC.Item>
        </RC.List>
      </RC.Div>


      <RC.Form className="bg-brand" onSubmit={this.doNothing}>
        <RC.List theme="inset">
          <RC.ItemDivider>Office Setup</RC.ItemDivider>
          <RC.Div theme="padding">
            <RC.Input theme="stacked-label" label="Computer" labelColor="brand1" value="iMac" />
            <RC.Input theme="stacked-label" label="Furniture Colour" labelColor="brand1" value="Black" />
            <RC.Textarea theme="stacked-label" label="Requests" labelColor="brand1" placeholder="Enter any complaints or requests here." />
          </RC.Div>
        </RC.List>
      </RC.Form>


      <RC.Form className="bg-brand2" onSubmit={this.doNothing}>
        <RC.List theme="inset">
          <RC.ItemDivider>Office Setup</RC.ItemDivider>
          <RC.Div theme="padding">
            <RC.Input theme="stacked-label" label="Computer" labelColor="brand2" value="iMac" />
            <RC.Input theme="stacked-label" label="Furniture Colour" labelColor="brand2" value="Black" />
            <RC.Textarea theme="stacked-label" label="Requests" labelColor="brand2" placeholder="Enter any complaints or requests here." />
          </RC.Div>
        </RC.List>
    </RC.Form>


    <RC.Form className="bg-brand3" onSubmit={this.doNothing}>
      <RC.List theme="inset">
        <RC.ItemDivider>Office Setup</RC.ItemDivider>
        <RC.Div theme="padding">
          <RC.Input theme="stacked-label" label="Computer" labelColor="brand3" value="iMac" />
          <RC.Input theme="stacked-label" label="Furniture Colour" labelColor="brand3" value="Black" />
          <RC.Textarea theme="stacked-label" label="Requests" labelColor="brand3" placeholder="Enter any complaints or requests here." />
        </RC.Div>
      </RC.List>
  </RC.Form>

  </div>
  }
})
