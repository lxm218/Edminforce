

App.Home = React.createClass({
  render(){
    return <div className="padding">
      <h1>Framework learning task</h1>
      <h2>Learn the example code</h2>
      <p>You are given 3 examples and one task (all 4 tabs in this page). Please read the code of Exmaple 1, 2 and 3. </p>
      <p>The code is inside /client/app/Example1.jsx /client/app/Example2.jsx /client/app/Example3.jsx.</p>
      <ul>
      <li>Example 1 (App.Ex1 class) is a example of form.</li>
      <li>Example 2 (App.Ex2 class) is a example of database operation.</li>
      <li>Example 3 (App.Ex3 class) is a example of show list of data from database.</li>
      <li>Task (App.Task) is the class you are going to write</li>
      </ul>
      <h2>Your task</h2>
      <p>It should work as shown in http://ihealth-task.meteor.com</p>
      <p>You can input a name and favourite fruit then submit. This name and favourite will be put into the list below</p>
      <p>Please use the knowlege you learnt from Example 1, 2 and 3 to build this task.</p>
      <h2>Tips:</h2>
      <ul>
      <li>You do not have to learn all detail of React and Meteor to complete this task.</li>
      <li>You can copy and paste example code. modify existing code to fit task requirements.</li>
      <li>CSS is not the purpose of task. You can ignore the beautification.</li>
      <li>You can use Internet to search for information, but not allow ask other people to help.</li>
      <li>We encourage you to use browser's debug tool. Debuging is also part of the test.</li>
      <li>To reduce the test time, code comments and unit test is not required for this small test.</li>
      </ul>
      <p></p>
    </div>
  }
});
