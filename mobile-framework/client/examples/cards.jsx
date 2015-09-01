
App.Cards = React.createClass({
  render() {

    return <div className="bg-brand-light full-height">


      <RC.Card>
        <RC.Item theme="divider">Cards Component</RC.Item>
        <RC.Item theme="text-wrap">
          <p>
            Cards are a very common component. They are useful for creating lists or multimedia content.
          </p>
          <p>
            Cards have multiple layers to its component. You can mix and match them using the childrens&rsquo; &quot;theme&quot; prop.
          </p>
        </RC.Item>
        <RC.Item theme="text-wrap">
          <strong>Default Styles</strong><br />
          Basic card components have larger text by default unless they are in a &lt;P&gt; tag.
        </RC.Item>
        <RC.Item>
          Also by default, texts are truncated when the child doesn't have a theme.
        </RC.Item>
        <RC.Item theme="divider">Footer</RC.Item>
      </RC.Card>



      <RC.Card avatar="/assets/examples/avatar1.jpg" title="Bruno Lee" subtitle="Avatar with title and subtitle">
        <RC.Item theme="text-wrap">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
          <p>
            <a href="#" className="subdued">59812 Like</a>
            <a href="#" className="subdued">78101 Comments</a>
          </p>
        </RC.Item>
      </RC.Card>



      <RC.Card uiClass="building-o" uiBrand={1} title="Full Sized Image" subtitle="Avatars are optional.">
        <RC.Item theme="image">
          <img src="/assets/examples/avatar5.jpg" />
        </RC.Item>
      </RC.Card>



      <RC.Card>
        <RC.Item theme="divider">Tabs in Card</RC.Item>
        <RC.Item theme="body">
          The <span className="brand">"Tabs"</span> and <span className="brand2">"List"</span> themes are special. They do not accept children. But they accept list (Array) prop.
        </RC.Item>
        <RC.Item theme="tabs" iconAlign="left" list={[
          { uiClass: "thumbs-o-up", label: "Like" },
          { uiClass: "commenting-o", label: "Comment" },
          { uiClass: "quote-right", label: "Quote" },
        ]} />
      </RC.Card>



      <RC.Card>
        <RC.Item theme="divider">List in Card</RC.Item>
        <RC.Item theme="icon-left" uiClass="thumbs-up" uiColor="brand">Like This Page</RC.Item>
        <RC.Item theme="icon-left" uiClass="refresh" uiColor="brand2">Refresh This Page</RC.Item>
        <RC.Item theme="icon-left" uiClass="pie-chart" uiColor="brand3">Analyze This Page</RC.Item>
        <RC.Item theme="icon-left" uiClass="send">Send This Page</RC.Item>
      </RC.Card>

    </div>
  }
})
