
App.Cards = React.createClass({
  render() {

    return <div>
      <RC.Card avatar="/assets/examples/avatar1.jpg" title="Card Layout" subtitle="Avatars are optional.">
        <p>
          Mobile framework does not have the RC.Grid component. Instead, it has the RC.Swipe component.
        </p>
      </RC.Card>
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
    </div>
  }
})
