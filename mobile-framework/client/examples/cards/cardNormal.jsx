
App.Normal_Cards = React.createClass({
  render() {

    // return <RC.Div bgColor="brand1Light">
    return <RC.Div bgColor="brand1Light">

      <RC.Card>
        <RC.Item theme="divider">Cards Component</RC.Item>
        <RC.Item>
          <p>
            Cards are a very common component. They are useful for creating lists or multimedia content.
          </p>
          <p>
            Cards have multiple layers to its component. You can mix and match them using the childrens&rsquo; &quot;theme&quot; prop.
          </p>
        </RC.Item>
        <RC.Item>
          By default, texts inside &lt;RC.Item/&gt; are truncated when the child is not wrapped.
        </RC.Item>
        <RC.Item theme="divider">Footer</RC.Item>
      </RC.Card>



      <RC.Card avatar="/assets/examples/avatar1.jpg" title="Bruno Lee" subtitle="Avatar with title and subtitle">
        <RC.Item theme="body">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
          {/*
          <p>
            <a href="#" className="subdued">59812 Like</a>
            <a href="#" className="subdued">78101 Comments</a>
          </p>
          */}
        </RC.Item>
      </RC.Card>



      <RC.Card uiClass="building-o" uiBgColor="brand1" title="Full Sized Image" subtitle="Avatars are optional.">
        <RC.Item theme="image">
          <img src="/assets/examples/avatar5.jpg" />
        </RC.Item>
      </RC.Card>



      <RC.Card>
        <RC.Item theme="divider">Tabs in Card</RC.Item>
        <RC.Item theme="body">
          <p>
            The Body theme is useful for creating breaks inside your content while still making it look like one unit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui lectus, hendrerit eu enim eu, elementum bibendum neque. Nunc libero neque.
          </p>
        </RC.Item>
        <RC.Item theme="body">
          <p>
            Aenean at luctus urna. Nulla laoreet ligula et quam mollis, ut cursus nulla elementum. Nullam sagittis felis sit amet quam bibendum.
          </p>
          <p>
            Nunc ligula neque, semper quis turpis ac, consectetur auctor ex. Quisque faucibus ornare faucibus. Phasellus congue tempus tellus, et eleifend tortor. Nam faucibus malesuada ullamcorper bibendum.
          </p>
        </RC.Item>
        <RC.Tabs theme="no-borders" color="gray">
          <RC.URL uiClass="chrome">Chrome</RC.URL>
          <RC.URL uiClass="safari">Safari</RC.URL>
          <RC.URL uiClass="firefox">Firefox</RC.URL>
        </RC.Tabs>
      </RC.Card>



      <RC.Card>
        <RC.Item theme="divider">Card as a List</RC.Item>
        <RC.Item theme="icons" uiClass="thumbs-up" uiColor="brand1">Like This Page</RC.Item>
        <RC.Item theme="icons" uiClass="refresh" uiColor="brand2">Refresh This Page</RC.Item>
        <RC.Item theme="icons" uiClass="pie-chart" uiColor="brand3">Analyze This Page</RC.Item>
        <RC.Item theme="icons" uiClass="send" uiSize={23}>Send This Page</RC.Item>
      </RC.Card>

    </RC.Div>
  }
})
