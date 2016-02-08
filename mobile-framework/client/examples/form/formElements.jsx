
App.Basic_Form_Items = React.createClass({
  doNothing(e) {
    e.preventDefault()
  },
  render() {

    return <RC.Form onSubmit={this.doNothing}>



      <RC.Item theme="body">
        <h3>Description</h3>
        <p>Form elements are essentially items with form related functions. They should be wrapped inside a area element such as &lt;RC.List/&gt;, &lt;RC.Card/&gt; or &lt;RC.Form/&gt;.</p>
      </RC.Item>



      <RC.ItemDivider>Normal Labels</RC.ItemDivider>
      <RC.Div theme="padding">
        <RC.Input name="fName" label="First Name" value="Bruno" />
        <RC.Input name="lName" label="Last Name" value="Lee" />
        <RC.Textarea name="biography" label="Biography">
          Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
        </RC.Textarea>
        <RC.Select
          options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
          value="Donkey" label="Animals"
        />
      </RC.Div>



      <RC.ItemDivider>Stacked Labels</RC.ItemDivider>
      <RC.Div theme="padding">
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
      </RC.Div>



      <RC.ItemDivider>Stacked Labels with Color</RC.ItemDivider>
      <RC.Div theme="padding">
        <RC.Input name="fName" theme="stacked-label" label="First Name" labelColor="brand1" value="Bruno" />
        <RC.Input name="lName" theme="stacked-label" label="Last Name" labelColor="brand2" value="Lee" />
        <RC.Textarea theme="stacked-label" name="biography" label="Biography" labelColor="gray">
          Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
        </RC.Textarea>
        <RC.Select
          theme="stacked-label"
          options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
          value="Donkey" label="Animals" labelColor="brand3"
        />
      </RC.Div>



      <RC.ItemDivider>No Labels</RC.ItemDivider>
      <RC.Div theme="padding">
        <RC.Input name="fName" value="Bruno" />
        <RC.Input name="lName" value="Lee" />
        <RC.Textarea name="biography">
          Hello everyone, I like long walks on the beach. I like to jump high in the air and catch frisbees.
        </RC.Textarea>
        <RC.Select
          options={["African Wild Dog","Badger","Catfish","Donkey","Fire-Bellied Toad","Giant Clam","Hercules Beetle","Italian Blue Shark"]}
          value="Donkey"
        />
      </RC.Div>



      <RC.ItemDivider>Buttons</RC.ItemDivider>
      <RC.Div theme="padding">

        <RC.Button>Button (Default)</RC.Button>
        <RC.Button bgColor="white">Button (White)</RC.Button>
        <RC.Button bgColor="brand2">Button (Brand2)</RC.Button>

        <RC.Button theme="inline" bgColor="dark">Button (Inline Dark)</RC.Button><br />
        <RC.Button theme="inline" bgColor="brand1">Button (Inline Brand1)</RC.Button><br />

        <RC.Button
          theme="inline"
          color="white"
          bgColor="silver"
          bgColorHover="brand2"
        >Button (with Different Hover)</RC.Button>
        <br />
        <RC.Button
          theme="inline"
          bgColorHover="dark"
        >Button (with Different Hover)</RC.Button>
        <br />

      </RC.Div>



    </RC.Form>

  }
})
