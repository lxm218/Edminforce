
App.Pie_Chart = React.createClass({
  render() {

    // Example 1
    let ex1data = {
      series: [10,20,30]
    }
    // Get the default chart options, this will make your circles have "%" at end of the value.
    // Next, extend the default options with your custom options.
    let ex1opt = h.ChartMixins.DefaultOptions(ex1data, {
      donut: true,
      donutWidth: 85,
      height: "300px", // Height is pretty much the same thing as Radius
    })

    // This returns a pre-made Pie Chart animator.
    // If you want more listeners along with this, you must extend the object.
    let ex1listener = h.ChartMixins.AnimatePieChart()

    // Example 2
    let ex2data = {
      labels: ['Apples', 'Oranges', 'Watermelons'],
      series: [10,20,30]
    }
    let ex2opt = {
      height: "300px", // Height is pretty much the same thing as Radius
      chartPadding: 20,
      labelOffset: 80,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    }
    // If you want to get really complicated, you can use responsive options
    let ex2resp = [
      ['screen and (min-width: 580px)', {
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      // You can add as much CSS media queries as you want.
      // ['screen and (min-width: 1024px)', {
      //   labelOffset: 80,
      // }]
    ]

    // Example 3
    let ex3data = {
      series: [20,25,15,21]
      // series: [20,10,30,40]
    }
    let ex3opt = h.ChartMixins.DefaultOptions(ex3data, {
      donut: true,
      startAngle: 270,
      total: 162, // In order for the donut to be cut in half, this value must be 2x the sum of data series.
      height: "300px", // Height is pretty much the same thing as Radius
      showLabels: false, // You can hide labels by setting this to false
    })
    /**
     * NOTE
     * Notice how both <RC.Item /> and <RC.Chart /> are used together.
     * They are both "item" components.
     * Thus they can work together inside a "area: {" component such as <RC.List />
     */
    return <RC.List>
      <RC.ItemDivider>Animated Donut Chart</RC.ItemDivider>
      <RC.Chart data={ex1data} options={ex1opt} listener={ex1listener} type="Pie" />

      <RC.ItemDivider>Normal Pie Chart</RC.ItemDivider>
      <RC.Chart data={ex2data} options={ex2opt} responsiveOptions={ex2resp} type="Pie" />

      <RC.ItemDivider>Half Donute Chart</RC.ItemDivider>
      <RC.Chart data={ex3data} options={ex3opt} type="Pie" />

    </RC.List>
  }
})
