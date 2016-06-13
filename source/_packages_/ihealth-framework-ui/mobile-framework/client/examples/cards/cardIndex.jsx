
App.Cards_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item theme="body">
        <h3>Card Examples</h3>
        <p>Card component work well with the list component. It's good for breaking up content.</p>
      </RC.Item>

      <RC.ItemIcons uiClass="sticky-note" uiColor="brand1" href="/cards/Normal_Cards">Normal Card</RC.ItemIcons>
      <RC.ItemIcons uiClass="sticky-note" uiColor="brand2" href="/cards/Colored_Cards">Cards with Color</RC.ItemIcons>
    </RC.List>
  }
})