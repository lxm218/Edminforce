
AnimateCascade = React.createClass({
  getInitialState() {
    return {
      displayedCommands: []
    }
  },
  componentDidMount() {
    this.delayedDisplay(this.props.children);
  },
  componentWillReceiveProps(nextProps) {
    let prev = _.pluck(this.props.children,'key');
    let next = _.pluck(nextProps.children, 'key');
    let diff = _.difference(prev, next)
    let shouldRerun = diff.length > 0;
    // console.log('rerun props', diff);

    if (shouldRerun) this.delayedDisplay(nextProps.children);
  },
  delayedDisplay(commands) {
    let self = this;
    self.setState({displayedCommands: []})
    let delayedExec = function(arr0, totalTime, action) {
      var arr;
      if(_.isArray(arr0)) {
        arr = arr0;
      } else {
        arr = [arr0];
      };
      let n = arr.length;
      let times = []
      let eachTime = totalTime/n;

      _.map(_.range(n), function(i) {
        times.push( i * eachTime );
      });

      _.map(times, function(time, i) {
        Meteor.setTimeout( action.bind(null, arr[i]), time )
      });
    };

    delayedExec(_.range(commands.length), this.props.animationDuration, function(i) {
      // debugL(4)('delayedExec', i);
      if (typeof(self.state.displayedCommands.push)==='function') {
        self.setState(function(ps, cp) {
          let newlist = ps.displayedCommands
          newlist.push(i)
          return {
            displayedCommands: newlist
          }
        })
      };
    });
  },

  render() {
    let self=this;
    return <RC.Animate transitionName="slide-up" transitionAppear={true}>
      {this.state.displayedCommands.map(function(i){
        return self.props.children[i];
      })}
    </RC.Animate>
  }
})
