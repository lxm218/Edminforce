
App.Cards = React.createClass({
  render() {

    return <div className="bg-brand-light full-height">



      <RC.Card>
        <div theme="divider">Cards Component</div>
        <div theme="text-wrap">
          <p>
            Cards are a very common component. They are useful for creating lists or multimedia content.
          </p>
          <p>
            Cards have multiple layers to its component. You can mix and match them using the childrens&rsquo; &quot;theme&quot; prop.
          </p>
        </div>
        <div theme="text-wrap">
          <strong>Default Styles</strong><br />
          Basic card components have larger text by default unless they are in a &lt;P&gt; tag.
        </div>
        <div>
          Also by default, texts are truncated when the child doesn't have a theme.
        </div>
        <div theme="divider">Footer</div>
      </RC.Card>



      <RC.Card avatar="/assets/examples/avatar1.jpg" title="Bruno Lee" subtitle="Avatar with title and subtitle">
        <div theme="text-wrap">
          <img src="/assets/examples/avatar4.jpg" />
          <p>I am the most handsome dog in the world.</p>
          <p>
            <a href="#" className="subdued">59812 Like</a>
            <a href="#" className="subdued">78101 Comments</a>
          </p>
        </div>
      </RC.Card>



      <RC.Card uiClass="building-o" uiBrand={1} title="Full Sized Image" subtitle="Avatars are optional.">
        <div theme="image">
          <img src="/assets/examples/avatar5.jpg" />
        </div>
      </RC.Card>



      <RC.Card>
        <div theme="divider">Tabs in Card</div>
        <div theme="body">
          The <span className="brand">"Tabs"</span> and <span className="brand2">"List"</span> themes are special. They do not accept children. But they accept list (Array) prop.
        </div>
        <div theme="tabs" iconAlign="left" list={[
          { uiClass: "thumbs-o-up", label: "Like" },
          { uiClass: "commenting-o", label: "Comment" },
          { uiClass: "quote-right", label: "Quote" },
        ]} />
      </RC.Card>



      <RC.Card>
        <div theme="divider">List in Card</div>
        <div theme="list" iconAlign="left" list={[
          { uiClass: "thumbs-up", label: "Like This Page", uiColor: "brand" },
          { uiClass: "refresh", label: "Refresh This Page", uiColor: "brand2" },
          { uiClass: "pie-chart", label: "Analyze This Page", uiColor: "brand3" },
          { uiClass: "send", label: "Send This Page" },
        ]} />
      </RC.Card>

    </div>
  }
})

/*


<RC.Card avatar="/assets/examples/avatar2.jpg" title="Hello World" subtitle="Chicken crossed the road.">
  <p>
    Biltong boudin fatback venison. Beef bresaola sirloin, hamburger rump pig pork loin frankfurter ham kielbasa.
  </p>
</RC.Card>

<RC.Card avatar="/assets/examples/avatar3.jpg" title="Add Label Prop for Title" subtitle="Add clever subtitle here.">
  <p>
    Leberkas ham kielbasa hamburger ribeye. Shank sausage shankle. Tenderloin fatback beef ribs strip steak frankfurter beef corned beef bacon pancetta pastrami hamburger porchetta bacon. Pork chop jerky ribeye venison cupim ham hock landjaeger.
  </p>
  <p>
    Shankle frankfurter tri-tip, cow ham fatback chicken leberkas flank ball tip tongue pork chop.
  </p>
</RC.Card>

*/
