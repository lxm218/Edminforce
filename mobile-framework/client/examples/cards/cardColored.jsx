
App.Colored_Cards = React.createClass({
  render() {

    return <RC.Div bgColor="brand1Light">

      <RC.Card>
        <RC.Item theme="divider" bgColor="brand1">Colored Cards</RC.Item>
        <RC.Item bgColor="#719534">
          <p>
            You can add colors to your &lt;RC.Item/&gt; or &lt;RC.Card/&gt; components.
          </p>
        </RC.Item>
        <RC.Item bgColor="green" color="yellow">
          <p>
            Colors can be passed as a string. If the string is a property name for the theme's palette, then that value will be used. If not, then the string is only used if it is a real color.
          </p>
        </RC.Item>
      </RC.Card>


      <RC.Card src="/assets/examples/avatar2.jpg" title="Bruno Lee" subtitle="Light header with white body" bgColor="light">
        <RC.Item bgColor="white">
          <img src="/assets/examples/avatar3.jpg" />
          <p>I am the most handsome dog in the world.</p>
        </RC.Item>
      </RC.Card>


      <RC.Card uiClass="building-o" uiBgColor="fog" uiColor="brand1" title="Colored Image" subtitle="Avatars are optional.">
        <RC.ItemImage src="/assets/examples/avatar4.jpg" />
      </RC.Card>

    </RC.Div>
  }
})
