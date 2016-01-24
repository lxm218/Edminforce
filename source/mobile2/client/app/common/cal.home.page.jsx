Cal.Home = React.createClass({


  mixins: [ReactMeteorData],
  getMeteorData(){

    Meteor.subscribe("appInfo");
    Meteor.subscribe("accountCurrent");

    return {
      appInfo: DB.App.findOne(),
      account: Meteor.users.findOne(),

      selectableSessions: Session.get('selectableSessions'),

      selectedSession: Session.get('selectedSession'),
      selectedSessionInfo: Session.get('selectedSessionInfo'),

      selectablePrograms: Session.get('selectablePrograms'),
      selectedProgram: Session.get('selectedProgram'),


    }
  },

  componentDidMount(){
    Tracker.autorun(function () {

      var selectedSession = Session.get('selectedSession')
      if (!selectedSession) return;



      //根据选择的session设置可选的program
      Session.set('selectablePrograms',[
        {text:'',value:false},
        {name:'Paced Program',value:'Paced',href:'/classRegister/info'},
        {name:'Intense Program',value:'Paced',href:'/intense/info'},
        {name:'Little Star Program',value:'LittleStar',href:'/littlestar/info'},
        {name:'Fastrack Program',value:'Fastrack',href:'/fastrack/info'},
      ])



    })

  },
  sessionSelectChange(e){
    console.log(this.refs.sessionSelect.getValue(),e.target.value)
    Session.set('selectedSession', e.target.value)

  },
  programSelectChange(e){
    console.log(this.refs.programSelect.getValue(),e.target.value)
    Session.set('selectedProgram', e.target.value)

  },
  continue(e){
    e.preventDefault()
    console.log('continue')

    var configURL ={
      Paced:'/classRegister/info',
      Intense:'/intense/info',
      LittleStar:'/littlestar/info',
      Fastrack:'/fastrack/info'
    }

    var selectedProgram =Session.get('selectedProgram')
    if(selectedProgram  && configURL[selectedProgram]){
      FlowRouter.go(configURL[selectedProgram]);

    }else{
      alert('please select session and program')
    }

  },

  tabClick(index){

    console.log('tabClick', this.data.selectableSessions[index])

    Session.set('selectedSession', this.data.selectableSessions[index]._id)
    Session.set('selectedSessionInfo', this.data.selectableSessions[index])
  },
  render() {

    let selectableSessions = this.data.selectableSessions
    let  sessionOptions = selectableSessions.map(function(item){
        return {text:item.name, value:item._id}
    })
    sessionOptions.unshift({text:'',value:false})

    console.log(sessionOptions)

    let title = 'Welcome To Our ' + (this.data.account && this.data.account.profile.location) + ' Facility'


    let selectablePrograms =this.data.selectablePrograms || []
    let programOptions = selectablePrograms.map(function(item){
      return {text:item.name, value:item.value}
    })


    //let Programs = (
    //  <div>
    //    <div className="row">
    //      <RC.Button className="item-button" name="button" buttonColor="brand"
    //                 href="/classRegister/info">
    //        Paced Program
    //      </RC.Button>
    //    </div>
    //
    //    <div className="row">
    //      <RC.Button className="item-button" name="button" buttonColor="brand" href="/intense/info">
    //        Intense Program
    //      </RC.Button>
    //    </div>
    //
    //    <div className="row">
    //      <RC.Button className="item-button" name="button" buttonColor="brand" href="/littlestar/info">
    //        Little Star Program
    //      </RC.Button>
    //    </div>
    //
    //    <div className="row">
    //      <RC.Button className="item-button" name="button" buttonColor="brand" href="/fastrack/info">
    //        Fastrack Program
    //      </RC.Button>
    //    </div>
    //  </div>
    //
    //)


    return <div>


      <RC.Card title={title}>

      </RC.Card>

      <RC.Form ref="myForm" onSubmit={this.formSubmit} theme="padding">


        <RC.Select theme="right"
          ref="sessionSelect"
          options={sessionOptions}
          onChange={this.sessionSelectChange}
           label="Session"
        />
        <RC.Select theme="right"
          ref="programSelect"
          options={programOptions}
          onChange={this.programSelectChange}
          value="" label="Program"
        />

        <RC.Button bgColor="brand1" onClick={this.continue}>continue</RC.Button>


      </RC.Form>

    </div>

  }
})
