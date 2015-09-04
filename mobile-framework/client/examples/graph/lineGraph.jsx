
App.Line_Graph = React.createClass({
  render() {

    // Example 1
    let ex1data = {
      labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"],
      series: [
        [10, 24,14,9,7,15,13,20,24,38,30,25,21,17,25]
      ]
    }
    let ex1opt = {
      height: "180px",
      high: 40,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          if (index==0) return "Dec&nbsp;"+value
          return index % 2 === 0 ? value : null
        }
      }
    }

    // Example 2
    let ex2data = {
      labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"],
      series: [
        [10, 24,14,9,7,15,13,20,24,38,30,25,21,17,25]
      ]
    }
    let ex2opt = {
      showPoint: false, // This removes points
      lineSmooth: false, // This straightens the line graph
      height: "180px",
      high: 40,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          if (index==0) return "Dec&nbsp;"+value
          return index % 2 === 0 ? value : null
        }
      }
    }

    // Example 3
    let ex3data = {
      labels: ["A","B","C","D","E","F","G","H"],
      series: [
        [10,20,30,25,30,20,18,11,15],
        [15,23,35,22,25,15,22,13,18],
        [5,10,25,12,35,20,12,9,5],
      ]
    }
    let ex3opt = {
      height: "180px",
      high: 40,
      low: 0,
    }

    // Example 4
    let ex4data = {
        labels: ["A", "B","C","D","E","F","G","H","I","J","K","L","M","N"],
        series: [
          [10, 24,14,9,7,15,13,20,24,38,30,25,21,17],
          [20, 14,23,19,13,25,33,26,14,18,20,15,29,30],
          [30, 20,13,29,23,15,13,7,27,8,5,2,19,23]
        ]
    }
    let ex4opt = {
      showLine: false,
      height: "180px",
      axisX: {
        labelInterpolationFnc: function(value, index) {
          if (index==0) return "Dec&nbsp;"+value
          return index % 2 === 0 ? value : null
        }
      }
    }

    /**
     * NOTE
     * Notice how both <RC.Item /> and <RC.Chart /> are used together.
     * They are both "item" components.
     * Thus they can work together inside a "canvas" component such as <RC.List />
     */
    return <RC.List>
      <RC.Item theme="divider">Normal Line Graph</RC.Item>
      <RC.Chart data={ex1data} options={ex1opt} type="Line" />

      <RC.Item theme="divider">Straight Line Graph, No Dots</RC.Item>
      <RC.Chart data={ex2data} options={ex2opt} type="Line" />

      <RC.Item theme="divider">Multiple Data Set</RC.Item>
      <RC.Chart data={ex3data} options={ex3opt} type="Line" />

      <RC.Item theme="divider">Dot Graph</RC.Item>
      <RC.Chart data={ex4data} options={ex4opt} type="Line" />
    </RC.List>
  }
})
