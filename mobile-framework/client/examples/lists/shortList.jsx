
App.Short_List = React.createClass({
  render() {

    let peopleA = [{
      value: [<strong key={1}>Aju,</strong>, <span key={2}>" Kiwi"</span>],
    },{
      value: [<strong key={1}>Anderson,</strong>, <span key={2}>" Joseph"</span>],
    },{
      value: [<strong key={1}>Arion,</strong>, <span key={2}>" Veronica"</span>],
    }]
    let peopleB = [{
      value: [<strong key={1}>Bedlon,</strong>, <span key={2}>" Romeo"</span>],
    },{
      value: [<strong key={1}>Beetle,</strong>, <span key={2}>" Charlie"</span>],
    },{
      value: [<strong key={1}>Bion,</strong>, <span key={2}>" Christopher"</span>],
    },{
      value: [<strong key={1}>Bjork,</strong>, <span key={2}>" Julia"</span>],
    },{
      value: [<strong key={1}>Bork,</strong>, <span key={2}>" Aaron"</span>],
    }]
    let peopleC = [{
      value: [<strong key={1}>Carleton,</strong>, <span key={2}>" William"</span>],
    },{
      value: [<strong key={1}>Celo,</strong>, <span key={2}>" June"</span>],
    }]
    let peopleD = [{
      value: [<strong key={1}>Diablo,</strong>, <span key={2}>" Shane"</span>],
    },{
      value: [<strong key={1}>Donaldo,</strong>, <span key={2}>" Douglas"</span>],
    },{
      value: [<strong key={1}>Duke,</strong>, <span key={2}>" Willington"</span>],
    }]

    return <RC.Div bgColor="brand3Light" theme="full">
      <RC.List theme="inset">
        <RC.Item theme="body">
          <h3>Description</h3>
          <p>Short items are good for condensed lists where lots of information is needed on a screen.</p>
        </RC.Item>

        <RC.Item theme={["divider","short"]}>A</RC.Item>
        {
        peopleA.map(function(c,n){
          c.theme = ["body","short"]
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
        })
        }

        <RC.Item theme={["divider","short"]}>B</RC.Item>
        {
        peopleB.map(function(c,n){
          c.theme = ["body","short"]
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
        })
        }

        <RC.Item theme={["divider","short"]}>C</RC.Item>
        {
        peopleC.map(function(c,n){
          c.theme = ["body","short"]
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
        })
        }

        <RC.Item theme={["divider","short"]}>D</RC.Item>
        {
        peopleD.map(function(c,n){
          c.theme = ["body","short"]
          return <RC.Item {... _.omit(c,"value")} key={n}>{c.value}</RC.Item>
        })
        }
      </RC.List>
    </RC.Div>
  }
})
