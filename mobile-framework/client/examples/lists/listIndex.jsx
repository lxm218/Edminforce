
App.List_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h2 className="brand">List Examples</h2>
        <p>Click a list to see an example or click the menu (dots) button at top right.</p>
      </RC.Item>

      <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand1" href="/lists/Mixed_List">List with Mixed Elements</RC.Item>
      <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand2" href="/lists/List_From_Array">List from an Array</RC.Item>
      <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand3" href="/lists/Mapped_List">Mapped (Repeat) List</RC.Item>
      <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand1" href="/lists/Thumbnail_List">Thumbnail List</RC.Item>
      <RC.Item theme="icon-left" uiClass="list-ul" uiColor="brand2" href="/lists/Inset_List">Inset List</RC.Item>
    </RC.List>
  }
})
