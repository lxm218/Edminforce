
App.Swipe = React.createClass({
  swipeLeft() {
    this.refs.swiper.swipe.prev()
  },
  swipeRight() {
    this.refs.swiper.swipe.next()
  },
  render() {

    var self = this
    var panes = [
      // This is the FIRST window
      <RC.Card>
        <RC.ItemDivider>Passing a Component</RC.ItemDivider>
        <RC.Item theme="body">
          <p>Swipe is a &quot;area /&quot; component. You can pass any components into &lt;Swipe/&gt;.</p>
          <p>You can swipe your finger left/right to view more content. But it only works in mobile.</p>
          <p>This component is only available in the mobile framework. It is <strong>not</strong> included in the webapp framework.</p>
          <p>You can activate a swipe by swiping a finger left or right; <em>or</em> you can also create an event handler <span className="clickHandler" onClick={this.swipeLeft}>like this</span> or <span className="clickHandler" onClick={this.swipeRight}>this</span>.</p>
        </RC.Item>
      </RC.Card>,

      // This is the SECOND window
      <div className="padding">
        <h1>Tuna Ipsum</h1>
        <p>
          Scissor-tail rasbora mudminnow sargassum fish flagfish kappy dusky grouper large-eye bream Pacific salmon southern sandfish red velvetfish yellowtail amberjack. Forehead brooder, longjaw mudsucker Cornish Spaktailed Bream fingerfish. Wolffish springfish thorny catfish dogfish shark rockling alewife snapper man-of-war fish crucian carp southern hake yellowbanded.
        </p>
        <p>
          Sand knifefish olive flounder gray eel-catfish featherfin knifefish threespine stickleback; electric ray, "Redhorse sucker, saber-toothed blenny."
        </p>
        <p>
          Harelip sucker squirrelfish mahseer longfin escolar marine hatchetfish, Australian grayling; queen triggerfish? Skipjack tuna blue catfish lefteye flounder.
        </p>
        <p>
          Dwarf gourami yellowtail snapper loach minnow sand goby louvar Mexican golden trout great white shark?
        </p>
        <p>
          Lumpsucker, marine hatchetfish: angler North American freshwater catfish demoiselle discus bighead carp longnose dace southern sandfish taimen: four-eyed fish. Convict blenny glassfish sand goby rohu clingfish.
        </p>
      </div>,

      // This is the THIRD window
      <RC.VerticalAlign center={true} className="padding" height="300px">
        <h2>
          Vertical Align
        </h2>
        <p>
          Hello, I am a DIV that is centered vertically and also horizontally.
        </p>
      </RC.VerticalAlign>
    ]

    return <RC.Swipe ref="swiper" createNavHeight={true}>
      {panes}
    </RC.Swipe>
  }
})
