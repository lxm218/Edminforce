
App.Bar_Graph = React.createClass({
  render() {

    let ex1data = {
      labels: ["Aug 1","Aug 2","Aug 3","Aug 4","Aug 5","Aug 6","Aug 7","Aug 8","Aug 9","Aug 10","Aug 11","Aug 12","Aug 13","Aug 14","Aug 15","Aug 16","Aug 17","Aug 18","Aug 19","Aug 20"],
      series: [
        [10, 24,14,9,7,24,12,32,8,38,30,20,25,15,18,20,21,30,15,10]
      ]
    }
    let ex1opt = {
      height: "180px",
      high: 40,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          /**
           * NOTE
           * Using this simple function, we skip every other day
           */
          return index % 2 === 0 ? value : null
        }
      }
    }

    let ex2data = {
      labels: ["A","B","C","D","E","F","G","H"],
      series: [
        [10,20,30,25,30,20,18,11],
        [15,23,35,22,25,15,22,13],
        [5,10,25,12,35,20,12,9],
      ]
    }
    let ex2opt = {
      height: "180px",
      high: 40,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          /**
           * NOTE
           * Using this simple function, we add a prefix word to the first label only.
           */
          return index==0 ? "Server "+value : value
        }
      }
    }

    let ex3data = {
      labels: ["X","Y","Z","A","B","C","D","E"],
      series: [
        [1000,2000,3000,1500,2000,1000,4000,3000],
        [1500,2500,3200,1800,2200,1200,4400,3200],
        [1700,2900,3500,2200,2400,1400,4800,4000],
      ]
    }
    let ex3opt = {
      height: "180px",
      stackBars: true, // This makes the graph stack
      axisY: {
        labelInterpolationFnc: function(value, index) {
          /**
           * NOTE
           * Using this simple function, we skip every other day
           */
          return (value/1000) + "k"
        }
      }
    }
    let ex3listener = h.ChartMixins.BarGraphStroke("28px")
    /**
     * NOTE
     * Notice how both <RC.Item /> and <RC.Chart /> are used together.
     * They are both "item" components.
     * Thus they can work together inside a "area: {" component such as <RC.List />
     */
    return <RC.List>
      <RC.ItemDivider>Normal Bar Graph</RC.ItemDivider>
      <RC.Chart data={ex1data} options={ex1opt} type="Bar" />

      <RC.ItemDivider>Multiple Data Set</RC.ItemDivider>
      <RC.Chart data={ex2data} options={ex2opt} type="Bar" />

      <RC.ItemDivider>Stacked Bar Graph</RC.ItemDivider>
      <RC.Chart data={ex3data} options={ex3opt} listener={ex3listener} type="Bar" />
    </RC.List>
  }
})
