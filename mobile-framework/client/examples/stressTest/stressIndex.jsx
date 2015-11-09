
App.Stress_Test_Index = React.createClass({
  render() {
    return <RC.List>
      <RC.Item>
        <h3>Stress Test</h3>
        <p>Stress tests to test the performance of React & the framework.</p>
      </RC.Item>

      <RC.Item theme="icons" uiClass="dashboard" uiColor="brand1" href="/stress/Stress_Test_1">Stress Test 1</RC.Item>
      <RC.Item theme="icons" uiClass="dashboard" uiColor="brand1" href="/stress/Stress_Test_1_SCU">Stress Test 1 SCU</RC.Item>
      <RC.Item theme="icons" uiClass="dashboard" uiColor="brand2" href="/stress/Stress_Test_2">Stress Test 2</RC.Item>
      <RC.Item theme="icons" uiClass="dashboard" uiColor="brand3" href="/stress/Stress_Test_3">Stress Test 3</RC.Item>
    </RC.List>
  }
})
