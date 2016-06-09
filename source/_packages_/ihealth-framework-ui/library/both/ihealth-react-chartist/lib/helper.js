
h.ChartMixins = {
  /**
   * Pre-made Bar Graph width calculator
   */
  BarGraphStroke: function(stroke,extendObj) {
    if (!_.isString(stroke)) return {}
    const def = {
      draw: function(data) {
        if(data.type === 'bar') {
          data.element.attr({
            style: "stroke-width: "+stroke
          })
        }
      }
    }
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def
  },
  /**
   * Pre-made Line Graph color calculation for Blood pressures
   */
  ColorBloodPressure: function(systolic,diastolic) {

    if (!systolic || !diastolic)
      return {}

    const bpColors = ["green","yellow","orange","red","danger"]
    var bpRes = _.map(systolic, function(sys, n){
      return _.isNumber(sys) && _.isNumber(diastolic[n])
      ? [sys,diastolic[n]]
      : false
    })
    return {
      draw: function(data) {
        if (data.type=="point") {
          var zone = h.getBPZone(bpRes[data.index])
          if (bpRes[data.index])
            data.element.addClass(bpColors[zone])
        }
      }
    }
  },
  /**
   * Pre-made Pie Chart animater
   */
  AnimatePieChart: function(extendObj) {
    const def = {
      draw: function(data) {
        if(data.type === 'slice') {
          // Get the total path length in order to use for dash array animation
          var pathLength = data.element._node.getTotalLength();

          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
          });

          // Create animation definition while also assigning an ID to the animation for later sync usage
          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 1000,
              from: -pathLength + 'px',
              to:  '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
              fill: 'freeze'
            }
          };

          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
          if(data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
          }

          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({
            'stroke-dashoffset': -pathLength + 'px'
          });

          // We can't use guided mode as the animations need to rely on setting begin manually
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
          data.element.animate(animationDefinition, false);
        }
      }
    }
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def
  },
  /**
   * Pre-made Pie Chart animater
   */
  DefaultOptions: function(data, extendObj) {
    const def = data && data.series ? {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(function(a, b) {
          return a + b
        }) * 100) + '%';
      }
    } : {}
    return _.isObject(extendObj) ? _.extend(def,extendObj) : def
  },
}
