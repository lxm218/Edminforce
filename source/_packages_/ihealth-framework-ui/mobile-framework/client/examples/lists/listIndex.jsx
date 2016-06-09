
App.List_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h3>List Examples</h3>
        <p>Click a list to see an example or click the menu (dots) button at top right.</p>
      </RC.Item>

      <RC.ItemIcons uiClass="list-ul" uiColor="brand1" href="/lists/Mixed_List">List with Mixed Elements</RC.ItemIcons>
      <RC.ItemIcons uiClass="list-ul" uiColor="brand2" href="/lists/Mapped_List">Mapped (Repeat) List</RC.ItemIcons>
      <RC.ItemIcons uiClass="list-ul" uiColor="brand3" href="/lists/Thumbnail_List">Thumbnail List</RC.ItemIcons>
      <RC.ItemIcons uiClass="list-ul" uiColor="brand1" href="/lists/Inset_List">Inset List</RC.ItemIcons>
      <RC.ItemIcons uiClass="list-ul" uiColor="brand2" href="/lists/Short_List">Short List Items</RC.ItemIcons>
    </RC.List>
  }
})
