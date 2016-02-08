
App.Graph_Index = React.createClass({
  render() {

    let charts = [{
      href: "/graphs/Bar_Graph",
      text: "Bar Graph"
    },{
      href: "/graphs/Pie_Chart",
      text: "Pie Chart"
    },{
      href: "/graphs/Line_Graph",
      text: "Line Graph"
    },{
      href: "/graphs/Area_Graph",
      text: "Line Graph & Area"
    }]

    return <RC.List>
      <RC.Item theme="body">
        <h3>Graph Examples</h3>
        <p>For full documentation of the Chart graph component, see <a href="http://react-components.com/component/react-chartist" target="_blank">http://react-components.com/component/react-chartist</a>. and <a href="https://gionkunz.github.io/chartist-js/index.html" target="_blank">https://gionkunz.github.io/chartist-js/index.html</a>.</p>
        <p>To use Chart, type <em className="brand">"add ihealth:react-chart".</em></p>
      </RC.Item>
      {
      charts.map(function(c,n){
        return <RC.ItemIcons uiClass="line-chart" uiColor={"brand"+(n%3+1)} href={c.href} key={n}>{c.text}</RC.ItemIcons>
      })
      }
    </RC.List>
  }
})
