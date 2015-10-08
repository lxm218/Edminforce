
// class Chart extends React.Component {
RC.Chart = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    options: React.PropTypes.object,
    responsiveOptions: React.PropTypes.array
  },

  displayName: 'Chartist',

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps);
  },

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  },

  componentDidMount() {
    this.updateChart(this.props);
  },

  updateChart(config) {
    let self = this
    Meteor.clearTimeout(this.timer)
    this.timer = Meteor.setTimeout(function(){
      let { type, data } = config;
      let options = config.options || {}
      let responsiveOptions = config.responsiveOptions || []
      let event;

      if (self.chartist) {
        if (config.listener) {
          for (event in config.listener) {
            if (config.listener.hasOwnProperty(event)){
              self.chartist.off(event);
              self.chartist.on(event, config.listener[event]);
            }
          }
        }
        self.chartist.update(data, options, responsiveOptions);
      } else {
        self.chartist = new Chartist[type](React.findDOMNode(self), data, options, responsiveOptions)
        if (config.listener) {
          for (event in config.listener) {
            if (config.listener.hasOwnProperty(event))
              self.chartist.on(event, config.listener[event])
          }
        }
      }
    },250)
    // return this.chartist;
  },

  render() {
    return React.DOM.div({className: "ct-chart "+(this.props.className || "") })
  }
})
