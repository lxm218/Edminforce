
App.Basic_Form_Items = React.createClass({
  doNothing(e) {
    e.preventDefault()
  },
  render() {

    return <RC.Form onSubmit={this.doNothing}>



      <RC.Item theme="body">
        <h2 className="brand">Description</h2>
        <p>Form elements are essentially items with form related functions. They should be wrapped inside a canvas element such as &lt;RC.List/&gt;, &lt;RC.Card/&gt; or &lt;RC.Form/&gt;.</p>
      </RC.Item>



      <RC.Item theme="divider">Normal Labels</RC.Item>
      <RC.Input name="fName" label="First Name" value="Bruno" />
      <RC.Input name="lName" label="Last Name" value="Lee" />
      <RC.Textarea name="biography" label="Biography">
        Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
      </RC.Textarea>
      <RC.Select
        options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
        value="Donkey" label="Animals"
      />



      <RC.Item theme="divider">Stacked Labels</RC.Item>
      <RC.Input name="fName" theme="stacked-label" label="First Name" value="Bruno" />
      <RC.Input name="lName" theme="stacked-label" label="Last Name" value="Lee" />
      <RC.Textarea theme="stacked-label" name="biography" label="Biography">
        Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
      </RC.Textarea>
      <RC.Select
        theme="stacked-label"
        options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
        value="Donkey" label="Animals"
      />



      <RC.Item theme="divider">Small Labels</RC.Item>
      <RC.Input name="fName" theme="small-label" label="First Name" labelColor="brand1" value="Bruno" />
      <RC.Input name="lName" theme="small-label" label="Last Name" labelColor="brand2" value="Lee" />
      <RC.Textarea theme="small-label" name="biography" label="Biography" labelColor="gray">
        Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
      </RC.Textarea>
      <RC.Select
        theme="small-label"
        options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
        value="Donkey" label="Animals" labelColor="brand3"
      />



    <RC.Item theme="divider">Buttons</RC.Item>
    <RC.Item theme="body">
      <h2 className="brand">More Coming Soon</h2>
      <p>Currently there is only one button type. Soon in the future, there will be multiple button types (available via theme prop).</p>
      <p>
        <RC.Button name="button">Button (Default)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="light">Button (Light)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="stable">Button (Stable)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="brand1">Button (Brand1)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="brand2">Button (Brand2)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="brand3">Button (Brand3)</RC.Button>
      </p>
      <p>
        <RC.Button name="button" buttonColor="dark">Button (Dark)</RC.Button>
      </p>
    </RC.Item>



    </RC.Form>

  }
})
