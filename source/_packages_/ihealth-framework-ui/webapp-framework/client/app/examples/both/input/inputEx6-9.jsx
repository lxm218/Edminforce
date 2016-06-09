
App.InputEx6 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input theme="big" value="Mr." label="Prefix"/>
        <RC.Input theme="big" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="big" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="big" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input theme="big" value="Mr." label="Prefix"/>
        <RC.Input theme="big" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="big" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="big" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  }
)

App.InputEx7 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input theme="right" value="Mr." label="Prefix"/>
        <RC.Input theme="right" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="right" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="right" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input theme="right" value="Mr." label="Prefix"/>
        <RC.Input theme="right" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="right" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="right" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  }
)

App.InputEx8 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input theme="thin" value="Mr." label="Prefix"/>
        <RC.Input theme="thin" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="thin" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="thin" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input theme="thin" value="Mr." label="Prefix"/>
        <RC.Input theme="thin" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="thin" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="thin" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  }
)

App.InputEx9 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      return <div>
        <RC.Input theme="overlay" value="Mr." label="Prefix"/>
        <RC.Input theme="overlay" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="overlay" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="overlay" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  `
    }
    renderExample() {
      return <div>
        <RC.Input theme="overlay" value="Mr." label="Prefix"/>
        <RC.Input theme="overlay" value="John" label="First Name" labelColor="brand1"/>
        <RC.Input theme="overlay" value="Smith" label="Middle Name" labelColor="brand2"/>
        <RC.Input theme="overlay" value="Doe" label="Last Name" labelColor="brand3"/>
      </div>
    }
  }
)

App.InputEx10 = App.Example(
  class extends RC.Code {
    code() {
      return `
    renderExample() {
      let inputStyle = {
        "color": "blue"
      }
      let labelStyle = {
        "fontStyle": "italic"
      }
      return <div>
        <RC.Input value="Mr." label="Prefix" inputStyle={inputStyle} labelStyle={labelStyle} />
        <RC.Input value="John" label="First Name" labelColor="brand1" labelStyle={labelStyle}/>
        <RC.Input value="Smith" label="Middle Name" labelColor="brand2" labelStyle={labelStyle} />
        <RC.Input value="Doe" label="Last Name" labelColor="brand3" labelStyle={labelStyle}/>
      </div>
    }
  `
    }
    renderExample() {
      let inputStyle = {
        "color": "blue"
      }
      let labelStyle = {
        "fontStyle": "italic"
      }
      return <div>
        <RC.Input value="Mr." label="Prefix" inputStyle={inputStyle} labelStyle={labelStyle} />
        <RC.Input value="John" label="First Name" labelColor="brand1" labelStyle={labelStyle}/>
        <RC.Input value="Smith" label="Middle Name" labelColor="brand2" labelStyle={labelStyle} />
        <RC.Input value="Doe" label="Last Name" labelColor="brand3" labelStyle={labelStyle}/>
      </div>
    }
  }
)
