App.BackdropEx1 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  `
    }

    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  }
)

App.BackdropEx2 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      return <RC.List>
        <RC.Item bgColor="brand2" color="white">
          <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show An Absolute BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="rgba(157, 213, 115, .6)" onClick={self.hideBackdrop.bind(self)} absolute={true}
                           transitionName="fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}
            >
            Absolute RC.BackDropArea (click to hide).
          </RC.BackDropArea>
          : null }
      </RC.List>
    }
  `
    }

    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      return <RC.List>
        <RC.Item bgColor="brand2" color="white">
          <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show An Absolute BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="rgba(157, 213, 115, .6)" onClick={self.hideBackdrop.bind(self)} absolute={true}
                           transitionName="fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}
            >
            Absolute RC.BackDropArea (click to hide).
          </RC.BackDropArea>
          : null }
      </RC.List>
    }
  }
)

App.BackdropEx3 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      const areaInnerStyle = {
        'backgroundColor': 'orange'
      }
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)} bgColor="rgba(255,69,0,1)" areaInnerStyle={areaInnerStyle}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  `
    }

    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      const areaInnerStyle = {
        'backgroundColor': 'orange'
      }
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)} bgColor="rgba(255,69,0,1)" areaInnerStyle={areaInnerStyle}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  }
)

App.BackdropEx4 = App.Example(
  class extends RC.Code {
    code() {
      return `
    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      const areaInnerStyle = {
        'backgroundColor': 'orange'
      }
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)} bgColor="rgba(255,69,0,0.5)" areaInnerStyle={areaInnerStyle}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  `
    }

    constructor(p){
      super(p);
      this.state = {
        obj: Immutable.Map({showBackdrop: false})
      }
    }
    showBackdrop(){
      this.setStateObj({showBackdrop: true})
    }
    hideBackdrop(){
      this.setStateObj({showBackdrop: false})
    }
    renderExample() {
      const showBackdrop = this.state.obj.get("showBackdrop");
      let self = this;
      const areaInnerStyle = {
        'backgroundColor': 'orange'
      }
      return <RC.List>
          <RC.Item bgColor="black" color="white">
            <RC.URL uiClass="chevron-right" uiColor="white" onClick={self.showBackdrop.bind(self)}>Show BackDropArea</RC.URL></RC.Item>
        { showBackdrop
          ?
          <RC.BackDropArea bgColor="backdrop" onClick={self.hideBackdrop.bind(self)} bgColor="rgba(255,69,0,0.7)" areaInnerStyle={areaInnerStyle}>
            RC.BackDropArea MUST have at least one child.
            <br/><br/><br/>Click anywhere on the backdrop to hide it.
          </RC.BackDropArea>
          : null }
        </RC.List>
    }
  }
)