
App.Mixed_List = React.createClass({
  render() {

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>This &lt;RC.List/&gt; is made of &lt;RC.Item/&gt;. You can put any component inside the list; but know that <em>Lists</em> were created for <em>Items</em>.</p>
      </RC.Item>

      <RC.Item theme="divider">Cool Animals</RC.Item>
      <RC.Item theme="icons" uiClass={["book", "phone"]} uiColor={["brand2", "brand"]}>Bald Eagle</RC.Item>
      <RC.Item theme="icons" uiClass={["language", "chevron-right"]} uiColor={["brand", "gray"]}>Gorilla</RC.Item>
      <RC.Item theme="icons" uiClass="cubes" uiColor="brand3">Gazelle</RC.Item>
      <RC.Item theme="icons" uiClass="diamond" uiColor="brand">Australian Flying Fox</RC.Item>

      <RC.Item theme="divider">Even Cooler Animals</RC.Item>
      <RC.Item theme="avatar" avatar="/assets/examples/avatar5.jpg" uiClass="smile-o" uiColor="brand3" title="Bruno Lee" subtitle="Very handsome dog abcdef abcdef abcdef abcdef"/>
      <RC.Item theme="avatar" uiClass="paper-plane-o" title="Flying Squirrel" subtitle="He glides..."/>
      <RC.Item theme="icons" uiClass="university" uiColor="brand3" note="He Sleeps">Hippopotamus</RC.Item>
      <RC.Item theme="icons" uiClass="paw" uiColor="brand2" note="She runs">Horse</RC.Item>
      <RC.Item theme="icons" uiClass="send">Send This Page</RC.Item>
    </RC.List>
  }
})
