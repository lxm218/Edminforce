
App.Tab_Sliders = React.createClass({
  render() {
    return <RC.List>

      <RC.Item>
        <h3>Tab Sliders</h3>
        <p>Tab sliders are useful in combination with other components.</p>
      </RC.Item>

      <RC.TabsSlider>
        <RC.URL>Sushi</RC.URL>
        <RC.URL>White Tuna</RC.URL>
        <RC.URL>Teriyaki</RC.URL>
      </RC.TabsSlider>

      <RC.TabsSlider bgColor="brand1" cursorColor="white">
        <RC.URL uiClass="hand-rock-o">Rock</RC.URL>
        <RC.URL uiClass="hand-paper-o">Paper</RC.URL>
        <RC.URL uiClass="hand-scissors-o">Scissors</RC.URL>
      </RC.TabsSlider>

      <RC.TabsSlider bgColor="brand2" cursorColor="white">
        <RC.URL uiClass="square" uiClassCur="check-square">Eggs</RC.URL>
        <RC.URL uiClass="square" uiClassCur="check-square">Bacon</RC.URL>
        <RC.URL uiClass="square" uiClassCur="check-square">Ham</RC.URL>
      </RC.TabsSlider>

      <RC.Item>
        <h3>Tab Sliders with different themes</h3>
      </RC.Item>

      <RC.TabsSlider theme="small">
        <RC.URL>Sushi</RC.URL>
        <RC.URL>White Tuna</RC.URL>
        <RC.URL>Teriyaki</RC.URL>
      </RC.TabsSlider>

      <RC.TabsSlider theme="big">
        <RC.URL>Sushi</RC.URL>
        <RC.URL>White Tuna</RC.URL>
        <RC.URL>Teriyaki</RC.URL>
      </RC.TabsSlider>

      <RC.TabsSlider theme="no-borders">
        <RC.URL>Sushi</RC.URL>
        <RC.URL>White Tuna</RC.URL>
        <RC.URL>Teriyaki</RC.URL>
      </RC.TabsSlider>


    </RC.List>
  }
})
