
App.Tabs_with_Icons = React.createClass({
  render() {
    return <RC.List>

      <RC.Item theme="body" >
        <h3 className="brand">Tabs with Icons</h3>
        <p>Tabs are also useful for creating horizontal nav and/or links.</p>
      </RC.Item>

      <RC.Tabs theme="no-borders" bgColor="white">
        <RC.URL uiClass="paperclip">Paperclip</RC.URL>
        <RC.URL uiClass="cut">Scissors</RC.URL>
        <RC.URL uiClass="eraser">Eraser</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="no-borders" bgColor="light">
        <RC.URL uiClass="heart">Heart</RC.URL>
        <RC.URL uiClass="heartbeat">Heartbeat</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="no-borders" bgColor="#eaeaea" style={{marginBottom: 20}}>
        <RC.URL uiClass="pencil" uiColor="cyan">Pencil</RC.URL>
        <RC.URL uiClass="paint-brush" uiColor="red">Paint Brush</RC.URL>
        <RC.URL uiClass="microphone" uiColor="blue">Microphone</RC.URL>
        <RC.URL uiClass="tree" uiColor="green">Tree</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand1">
        <RC.URL uiClass="tty">Telephone</RC.URL>
        <RC.URL uiClass="tv">Television</RC.URL>
        <RC.URL uiClass="lightbulb-o">Lightbulb</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand2">
        <RC.URL uiClass="moon-o">Moon</RC.URL>
        <RC.URL uiClass="money">Money</RC.URL>
        <RC.URL uiClass="sun-o">Sun</RC.URL>
      </RC.Tabs>

      <RC.Tabs bgColor="brand3" style={{marginBottom: 20}}>
        <RC.URL uiClass="hand-stop-o">Hand</RC.URL>
        <RC.URL uiClass="hand-lizard-o">Lizard</RC.URL>
        <RC.URL uiClass="hand-spock-o">Spock</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="dark">
        <RC.URL uiClass="fighter-jet">Fighter Jet</RC.URL>
        <RC.URL uiClass="rocket">Rocket</RC.URL>
        <RC.URL uiClass="subway">Subway</RC.URL>
      </RC.Tabs>

      <RC.Tabs theme="big" bgColor="#781492">
        <RC.URL uiClass="motorcycle">Motorcycle</RC.URL>
        <RC.URL uiClass="car">A Car</RC.URL>
        <RC.URL uiClass="ship">Ship</RC.URL>
      </RC.Tabs>

    </RC.List>
  }
})
