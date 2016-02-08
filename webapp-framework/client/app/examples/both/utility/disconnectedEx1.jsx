"use strict";

App.DisconnectedEx1 = App.Example(
  class extends RC.Code {
    renderExample() {
      const props = { demoOnly: true };
      const style1 = {
        area: {
          position: "relative",
        }
      };
      const style2 = {
        area: {
          position: "relative",
          backgroundColor: "rgba(20,20,20,.9)", color: "#fff000",
        }
      };
      return <div>
          <RC.Item theme="divider">Original RC.Disconnect shows at the bottom</RC.Item>
          <RC.Disconnected {...props} style={{area: {left: 300}}}><b>Connection to server lost. Reconnecting... (Don't worry, this one is only for demo)</b></RC.Disconnected>
          <RC.Disconnected {...props} style={style1} >You can change the text</RC.Disconnected>
          <RC.Disconnected {...props} style={style2} >Or the style</RC.Disconnected>
        </div>
    }
    code() {
      return `
    renderExample() {
      const props = { demoOnly: true };
      const style1 = {
        area: {
          position: "relative",
        }
      };
      const style2 = {
        area: {
          position: "relative",
          backgroundColor: "rgba(20,20,20,.9)", color: "#fff000",
        }
      };
      return <div>
          <RC.Item theme="divider">Original RC.Disconnect shows at the bottom</RC.Item>
          <RC.Disconnected {...props} style={{area: {left: 300}}}><b>Connection to server lost. Reconnecting... (Don't worry, this one is only for demo)</b></RC.Disconnected>
          <RC.Disconnected {...props} style={style1} >You can change the text</RC.Disconnected>
          <RC.Disconnected {...props} style={style2} >Or the style</RC.Disconnected>
        </div>
    }
  `
    }
  }
)