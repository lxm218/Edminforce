
App.Area_Graph = React.createClass({
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
      showArea: true,
    }

    // Example 2
    let ex2data = {
      labels: ["A","B","C","D","E","F","G","H"],
      series: [
        [0,20,-20,-30,-25,-10,18,20,10],
        [5,30,20,-10,-30,-25,-30,28,0],
        [-5,10,15,-12,-37,19,25,9,5],
      ]
    }
    let ex2opt = {
      height: "180px",
      showLine: false,
      showArea: true,
      high: 40,
      low: -40,
    }

    // Example 3
    let ex3data = {
      labels: ["A","B","C","D","E","F","G","H"],
      series: [
        [0,20,-20,-30,-25,-10,18,20,10],
        [5,30,20,-10,-30,-25,-30,28,0],
        [-5,10,15,-12,-37,19,25,9,5],
      ]
    }
    let ex3opt = {
      height: "180px",
      showPoint: false,
      showLine: false,
      showArea: true,
      high: 40,
      low: -40,
    }

    /**
     * NOTE
     * Notice how both <RC.Item /> and <RC.Chart /> are used together.
     * They are both "item" components.
     * Thus they can work together inside a "area: {" component such as <RC.List />
     */
    return <RC.List>
      <RC.Item theme="divider">Line Graph with Area</RC.Item>
      <RC.Chart data={ex1data} options={ex1opt} type="Line" />

      <RC.Item theme="divider">Bipolar Graph</RC.Item>
      <RC.Chart data={ex2data} options={ex2opt} type="Line" />

      <RC.Item theme="divider">Bipolar Area Graph</RC.Item>
      <RC.Chart data={ex3data} options={ex3opt} type="Line" />
    </RC.List>
  }
})
