
App.Form_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h3>Form Examples</h3>
        <p>Form elements are similar to &lt;RC.Item/&gt; because they are meant to be inside other area components like &lt;RC.List/&gt;, &lt;RC.Card/&gt;, and &lt;RC.Form/&gt;.</p>
      </RC.Item>

      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand1" href="/forms/Basic_Form_Items">Basic Form Items</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand2" href="/forms/Basic_Inset_Form">Basic Inset Form</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand3" href="/forms/Form_Handling">Form Handling</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand1" href="/forms/Checkboxes">Checkboxes</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand2" href="/forms/Toggle_Checkboxes">Toggle Checkboxes</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand3" href="/forms/Radio_Buttons">Radio Buttons</RC.Item>
      <RC.Item theme="icons" uiClass="file-text-o" uiColor="brand1" href="/forms/Range_Sliders">Range Sliders</RC.Item>
    </RC.List>
  }
})
