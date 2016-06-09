
App.Mixed_List = React.createClass({
  render() {

    return <RC.List>
      <RC.Item theme="body">
        <h3>Description</h3>
        <p>This &lt;RC.List/&gt; is made of &lt;RC.Item/&gt;. You can put any component inside the list; but know that <em>Lists</em> were created for <em>Items</em>.</p>
      </RC.Item>

      <RC.ItemDivider>Cool Animals</RC.ItemDivider>
      <RC.ItemIcons uiClass={["book", "phone"]} uiColor={["brand2", "brand"]}>Bald Eagle</RC.ItemIcons>
      <RC.ItemIcons uiClass={["language", "chevron-right"]} uiColor={["brand", "gray"]}>Gorilla</RC.ItemIcons>
      <RC.ItemIcons uiClass="cubes" uiColor="brand3">Gazelle</RC.ItemIcons>
      <RC.ItemIcons uiClass="diamond" uiColor="brand">Australian Flying Fox</RC.ItemIcons>

      <RC.ItemDivider>Even Cooler Animals</RC.ItemDivider>
      <RC.ItemAvatar src="/assets/examples/avatar5.jpg" uiClass="smile-o" uiColor="brand3" title="Bruno Lee" subtitle="Very handsome dog"/>
      <RC.ItemAvatar uiClass="paper-plane-o" title="Flying Squirrel" subtitle="He glides..."/>
      <RC.ItemIcons uiClass="university" uiColor="brand3" note="He Sleeps">Hippopotamus</RC.ItemIcons>
      <RC.ItemIcons uiClass="paw" uiColor="brand2" note="She runs">Horse</RC.ItemIcons>
      <RC.ItemIcons uiClass="send">Send This Page</RC.ItemIcons>
    </RC.List>
  }
})
