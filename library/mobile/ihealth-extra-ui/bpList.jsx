
IH.RC.BPList = React.createClass({
  propTypes: {
    userId: React.PropTypes.string,
    emergenciesOnly: React.PropTypes.bool,
    showAvatars: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      emergenciesOnly: true
    }
  },
  mixins: [ReactMeteorData],
  displayName: "BPList",
  componentWillMount(){
    let showEmergenciesOnly = this.props.emergenciesOnly;
    this.setState({emergenciesOnly: showEmergenciesOnly})
  },
  getMeteorData: function() {
    let measurements = []
    let self = this
    let userId = _.isUndefined(this.props.userId) ?
                Meteor.user().roles === 'doctor' ?
                Meteor.user().profile.patients ?
                Meteor.user().profile.patients : [] : Meteor.userId() : this.props.userId
    let cond = {
      userId: _.isString(userId) ? userId : { $in: userId },
      deviceType: "BP"
    };
    if(this.state.emergenciesOnly){
      cond.$or = [
        {HP:{$gt:h.getBPConds()[0].hiPressure}},
        {LP:{$gt:h.getBPConds()[0].loPressure}}
      ];
    }
    let opts = {
      sort: {
        MDate: -1
      },
      limit: 15
    }
    let sub = bp.listSub.subscribe("BPMeasurements", cond, opts);
    let isReady = sub.ready();

    if (isReady) {
      let avatarsRaw = Meteor.users.find({_id: cond.userId},{fields:{"profile.avatar":1}});
      console.log('avatarsRaw', avatarsRaw.count())
      let avatars = _.object(avatarsRaw.map(function(u) {
        return [u._id, u.profile.avatar]
      }))

      let measurementsRaw = IH.Coll.Measurements.find(cond, opts)
      console.log('measurementsRaw', measurementsRaw.count())
      measurements = measurementsRaw.map((m0) => {
        let m = DbTools.renameKeys (_.invert(DbTools.keyMap.bp), m0);
        if (!m) return null

        if (self.props.showAvatars)
          m.avatar = avatars[m.userId]
        return m
      })
    }
    return {
      isReady: isReady,
      measurements: measurements
    };
  },
  getInitialState(){
    return {
      emergenciesOnly: true,
    }
  },
  switchList(c){
    this.setState({
      emergenciesOnly: !this.state.emergenciesOnly
    })
  },
  render: function() {
    var styles = this.styles()
    let detailClickHandler = function(bp) {
      console.log(bp._id)
      FlowRouter.go( FlowRouter.path("measurementView", { mId: bp._id }))
    };
    return <RC.Div bgColor="light" theme="full" {... this.props} style={styles.area}>
      {this.props.children}

      { /* tabs */ }
      { this.props.showTabs
        ? <RC.Item bgColor="brand1Darker" theme={"divider"} style={{textAlign: "center"}} onClick={this.switchList}>
          <p><RC.uiIcon uiClass={!this.state.emergenciesOnly ? "square" : "check-square"} theme="inline-block-left" uiSize={13} uiColor="white" /><strong>Show Emergencies Only</strong></p>
        </RC.Item>
        : '' }

      { /* list */ }
      <RC.Loading isReady={this.data.isReady}>
        <IH.RC.BPListPure measurements={this.data.measurements} detailClickHandler={detailClickHandler}/>
      </RC.Loading>
    </RC.Div>
  },
  styles: function() {
    return {
      area: {
        padding: "0 0 20px"
      }
    };
  }
});

IH.RC.SampleAvatars = [
 {
  "profile": {
   "avatar": "/assets/examples/m-patient4.jpg"
  },
  "_id": "fSuynQ56RPAK2jcHG"
 }
]

IH.RC.SampleBPMeasurements = [
  {"_id":"v9DCRu9X2hW8ab4Ha","deviceAddress":"8CDE52A1A7AD","LP":83,"HP":125,"finalPressure":173,"HR":76,"finalWave":[15,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-12T08:25:51.479Z","connectionId":"6XJbpuf56wMT3tje3","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-12T08:25:15.930Z","connectionInfo":{"_id":"6XJbpuf56wMT3tje3","clientAddress":"41.13.44.39","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A404 (5038739056)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-12T08:21:50.274Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"HA4Bck7AfJr0EkWhJz_4EkT1ASkwtKAnBRmbsWlVsL0","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"vy4NqMz2JAivSN8Fc","deviceAddress":"8CDE52199C2D","LP":88,"HP":118,"finalPressure":150,"HR":83,"finalWave":[18,17,17,18,18,18,18,17],"deviceModel":"BP5","MDate":"2015-10-09T08:07:04.885Z","connectionId":"WMmMHDLDedmbdqGYs","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-09T08:07:07.908Z","connectionInfo":{"_id":"WMmMHDLDedmbdqGYs","clientAddress":"91.253.3.172","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5593411408)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-09T07:58:31.501Z","loginAttempt":[{"type":"password","allowed":true,"methodName":"login","user":{"username":"patient"},"password":{"digest":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08","algorithm":"sha-256"},"userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"z3GMkdxkABRgiw5bQ","deviceAddress":"8CDE52199C2D","LP":88,"HP":129,"finalPressure":150,"HR":93,"finalWave":[16,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-09T08:03:34.824Z","connectionId":"WMmMHDLDedmbdqGYs","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-09T08:03:37.851Z","connectionInfo":{"_id":"WMmMHDLDedmbdqGYs","clientAddress":"91.253.3.172","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5593411408)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-09T07:58:31.501Z","loginAttempt":[{"type":"password","allowed":true,"methodName":"login","user":{"username":"patient"},"password":{"digest":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08","algorithm":"sha-256"},"userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"k7XChYMQ6oquMHzcC","deviceAddress":"8CDE52199C2D","LP":72,"HP":143,"finalPressure":224,"HR":59,"finalWave":[15,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-09T08:00:20.150Z","connectionId":"WMmMHDLDedmbdqGYs","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-09T08:00:23.011Z","connectionInfo":{"_id":"WMmMHDLDedmbdqGYs","clientAddress":"91.253.3.172","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5593411408)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-09T07:58:31.501Z","loginAttempt":[{"type":"password","allowed":true,"methodName":"login","user":{"username":"patient"},"password":{"digest":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08","algorithm":"sha-256"},"userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"4Fz7dSQvu2BY9j99S","deviceAddress":"8CDE52A149D8","LP":82,"HP":117,"finalPressure":140,"HR":100,"finalWave":[15,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-07T22:37:52.150Z","connectionId":"ru9DSLYbcgFRbPPAF","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-07T22:37:54.049Z","connectionInfo":{"_id":"ru9DSLYbcgFRbPPAF","clientAddress":"74.7.62.213","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5593700160)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-07T22:30:38.385Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"8hgA9gLWctG5wQ9mfwMxMyprB4GPM7-Wvaw1C9HMN3r","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"FgXtmPdu8o7osKRJQ","deviceAddress":"8CDE52A149D8","LP":86,"HP":118,"finalPressure":135,"HR":104,"finalWave":[15,15,15,16,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-07T22:31:31.914Z","connectionId":"ru9DSLYbcgFRbPPAF","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-07T22:31:33.820Z","connectionInfo":{"_id":"ru9DSLYbcgFRbPPAF","clientAddress":"74.7.62.213","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5593700160)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-07T22:30:38.385Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"8hgA9gLWctG5wQ9mfwMxMyprB4GPM7-Wvaw1C9HMN3r","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"yPKW6jkbHxJjhupbo","deviceAddress":"8CDE52A149D8","LP":81,"HP":111,"finalPressure":165,"HR":88,"finalWave":[15,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-07T16:20:33.851Z","connectionId":"B7phBqZxbgPSAqsie","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-07T16:20:35.639Z","connectionInfo":{"_id":"B7phBqZxbgPSAqsie","clientAddress":"74.7.62.213","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5357783904)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-07T16:18:37.955Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"8hgA9gLWctG5wQ9mfwMxMyprB4GPM7-Wvaw1C9HMN3r","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"TGfQCEjdj2e99LLcd","deviceAddress":"8CDE52A149D8","LP":84,"HP":126,"finalPressure":159,"HR":87,"finalWave":[15,15,15,15,15,15,15,15],"deviceModel":"BP5","MDate":"2015-10-07T16:11:03.086Z","connectionId":"Hpi9W3PYcK44wiKpZ","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-07T16:11:04.889Z","connectionInfo":{"_id":"Hpi9W3PYcK44wiKpZ","clientAddress":"74.7.62.213","host":"52.26.116.131:8001","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5357783904)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-07T16:10:12.341Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"8hgA9gLWctG5wQ9mfwMxMyprB4GPM7-Wvaw1C9HMN3r","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"a4QvfN9XJG8orgrK8","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-10-04T00:36:27.021Z","connectionId":"NN2aeQiuyxQkEHKCW","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-04T00:36:12.307Z","connectionInfo":{"_id":"NN2aeQiuyxQkEHKCW","clientAddress":"108.199.0.223","host":"52.88.16.72","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A452 (5735101760)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-04T00:35:31.809Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"rytAiL09hz_JKz4JcT01a37MJZc8EtprXkutXoRcz8y","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"57WtJMvn38MLcSqmZ","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-10-01T11:14:27.717Z","connectionId":"mt7MtBEKT38n8gyhu","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-01T11:14:14.506Z","connectionInfo":{"_id":"mt7MtBEKT38n8gyhu","clientAddress":"45.78.5.173","host":"52.88.16.72","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36","accept-language":"zh-CN,zh;q=0.8,en;q=0.6","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-01T11:08:00.827Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"ctz9GQkvOxggeN8l1HtQoWFjeN8zSESDS91FuuSMW_u","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"hCuzki4oRoR53YRcY","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-10-01T06:28:23.063Z","connectionId":"c9Q4kBvtEsbzNyZ9T","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-01T06:28:09.948Z","connectionInfo":{"_id":"c9Q4kBvtEsbzNyZ9T","clientAddress":"104.128.80.211","host":"52.88.16.72","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36","accept-language":"zh-CN,zh;q=0.8,en;q=0.6","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-01T06:24:32.059Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"ctz9GQkvOxggeN8l1HtQoWFjeN8zSESDS91FuuSMW_u","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"GgFqDyf4mrEG2vMKK","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-10-01T06:05:29.817Z","connectionId":"LNGk8jjPWnWWYdrmG","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-10-01T06:05:16.751Z","connectionInfo":{"_id":"LNGk8jjPWnWWYdrmG","clientAddress":"104.128.80.211","host":"52.88.16.72","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36","accept-language":"zh-CN,zh;q=0.8,en;q=0.6","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-10-01T06:01:20.651Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"ctz9GQkvOxggeN8l1HtQoWFjeN8zSESDS91FuuSMW_u","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"C5JBLqEEa5rArHSuT","deviceAddress":"8CDE5208B9ED","LP":103,"HP":149,"finalPressure":172,"HR":94,"finalWave":[24,24,23,21,20,18,17,16],"deviceModel":"BP5","MDate":"2015-09-29T18:16:36.856Z","connectionId":"JSFdZWTkSR73mcuDH","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-09-29T18:16:01.763Z","connectionInfo":{"_id":"JSFdZWTkSR73mcuDH","clientAddress":"74.7.62.213","host":"52.88.16.72","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13A404 (5718351088)","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-09-29T18:14:51.615Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"5mYcupHoZHcxVt_KfeRPaSnDYJSVPCBIYE5MpWbn1Tz","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"tKP5j2dPpDujit6TR","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-09-29T08:11:15.460Z","connectionId":"C9LFutygTuYLeAAYi","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-09-29T08:11:02.698Z","connectionInfo":{"_id":"C9LFutygTuYLeAAYi","clientAddress":"45.78.5.173","host":"52.88.16.72","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36","accept-language":"zh-CN,zh;q=0.8,en;q=0.6","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-09-29T08:07:33.417Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"ctz9GQkvOxggeN8l1HtQoWFjeN8zSESDS91FuuSMW_u","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}},
  {"_id":"7CjQneBoW4S48CP3G","LP":85,"deviceAddress":"8CDE521448F0","deviceModel":"BP5","HR":63,"finalPressure":136,"finalWave":[19,19,19,19,18,18,18,18],"HP":115,"MDate":"2015-09-29T05:07:49.157Z","connectionId":"KQgW9d9H2S7GP6FXQ","userId":"fSuynQ56RPAK2jcHG","deviceType":"BP","createdAt":"2015-09-29T05:07:37.218Z","connectionInfo":{"_id":"KQgW9d9H2S7GP6FXQ","clientAddress":"45.78.5.173","host":"52.88.16.72","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36","accept-language":"zh-CN,zh;q=0.8,en;q=0.6","serverExec":"/usr/lib/node_modules/userdown/bin/userdown","createdAt":"2015-09-29T04:51:45.839Z","loginAttempt":[{"type":"resume","allowed":true,"methodName":"login","resume":"ctz9GQkvOxggeN8l1HtQoWFjeN8zSESDS91FuuSMW_u","userInfo":{"_id":"fSuynQ56RPAK2jcHG","username":"patient","profile":{"firstName":"Richard","lastName":"Smith","gender":"Male","age":39,"avatar":"/assets/examples/m-patient4.jpg","roles":"patient"}}}]}}
]

IH.RC.BPListResult = React.createClass({
  propTypes: {
    measurements: React.PropTypes.array.isRequired
  },
  getInitialState() {
    return {
      result: null
    }
  },
  render() {
    let self = this;

    let detailClickHandler = (bp)=> {
      console.log('clicked ' + JSON.stringify(bp));
      self.setState({
        result: bp
      });
    }
    let resultClickHandler = () => {
      self.setState({
        result: null
      });
    }
    return <div>
      <RC.Animate transitionName="from-bottom" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {
        self.state.result
        ? <IH.RC.BPResultPure bp={self.state.result} onClick={resultClickHandler}/>
        : <IH.RC.BPListPure measurements={self.props.measurements} detailClickHandler={detailClickHandler}/>
      }
      </RC.Animate>
    </div>
  }
});

IH.RC.BPListPure = React.createClass({
  propTypes: {
    measurements: React.PropTypes.array.isRequired,
    detailClickHandler: React.PropTypes.func.isRequired
  },
  render() {
    let self = this;
    return <RC.Div bgColor="light">
      { _.map( self.props.measurements, function(bp, n) {

        return <IH.RC.BPListItem
          bp={bp}
          n={n}
          key={n}
          avatar={bp.avatar}
          detailClickHandler={self.props.detailClickHandler.bind(null,bp)} />
      })}
    </RC.Div>
  }
});

IH.RC.BPListItem = React.createClass({
  getInitialState(){
    return {isActive: false}
  },
  displayName: "BPListItem",
  propTypes: {
    n: React.PropTypes.oneOfType([
      React.PropTypes.number.isRequired,
      React.PropTypes.string.isRequired
    ]),
    bp: React.PropTypes.shape({
      lowpressure: React.PropTypes.number.isRequired,
      highpressure: React.PropTypes.number.isRequired
    }),
    avatar: React.PropTypes.string,
    detailClickHandler: React.PropTypes.func
  },
  componentDidMount: function() {
    if (this.state.isActive) {
      return this.refs["dc" + this.props.n].setActive();
    } else {
      return this.refs["dc" + this.props.n].setInactive();
    }
  },
  componentDidUpdate: function() {
    if (this.state.isActive) {
      return this.refs["dc" + this.props.n].setActive();
    } else {
      return this.refs["dc" + this.props.n].setInactive();
    }
  },
  setActive: function(){
    this.setState({isActive: true})
  },
  setInactive: function(e){
    //console.log("setInactive",e.type, this.state.isActive)
    this.setState({isActive: false})
  },
  render: function() {
    var measureTime, self, styles;
    self = this;
    // measureTime = moment(this.props.bp.MDate).format("h:mm A");
    let mdate = new Date();
    measureTime = moment(mdate).format("h:mm A");
    styles = self.styles();
    return <RC.Card theme={["double-from-right","no-shadow"]} ref={"dc"+this.props.n} uiBgColor={styles.zoneColor} style={styles.area}>
      <RC.Item theme="no-borders" data-time={measureTime} onClick={self.setActive}>

        <figure style={h.assignClone(styles.dot, {backgroundColor: styles.zoneColor})}>
          {this.props.avatar ? <img src={this.props.avatar} style={styles.avatar}/> : void 0 }
        </figure>
        <span style={styles.arrow} />

        <div style={styles.BPRes}>
          <p style={styles.BPBig}>
            {this.props.bp.highpressure}/{this.props.bp.lowpressure}
          </p>

          <p style={styles.BPSmall}>
            <RC.uiIcon uiClass="heart-o" itemStyle={styles.BPIcon} />
            <span>mmHg</span>
          </p>
        </div>

        <div style={styles.HRRes}>
          <p style={styles.HRBig}>
            {this.props.bp.heartrate}
          </p>

          <p style={styles.HRSmall}>
            <RC.uiIcon uiClass="stethoscope" itemStyle={styles.BPIcon} />
            <span>bpm</span>
          </p>
        </div>
      </RC.Item>

      <RC.Item theme="no-borders" bgColor={styles.zoneColor} style={styles.back} onMouseLeave={self.setInactive}>
        <p style={styles.backText} onMouseDown={self.setInactive} onTouchStart={self.setInactive}>
          <strong>{moment(this.props.bp.MDate).format("MMM D, YYYY")} {measureTime}</strong>
        </p>
        <p style={styles.buttons} onMouseDown={self.props.detailClickHandler} onTouchStart={self.props.detailClickHandler}>
          <RC.uiIcon theme="absCenter" uiClass="eye" uiColor={styles.zoneColor} uiBgColor={styles.zoneTextColor}/>
        </p>
      </RC.Item>

    </RC.Card>;
  },
  styles: function() {
    var arrowDistance, color, colors, dotBorder, dotSize, icon, res, textBig, textSmall, zone;
    colors = [
      "#69d356", //Green
      "#f5d141", //Yellow
      "#e89544", //Orange
      "#dc4535" //Red
    ]
    textColors = [
      "#fff",
      "rgba(0,0,0,.64)",
      "rgba(0,0,0,.64)",
      "#fff"
    ]

    res = h.getBPZone(this.props.bp.highpressure, this.props.bp.lowpressure);
    color = (res != null) && (colors[res] != null) ? colors[res] : null;
    textColor = (res != null) && (textColors[res] != null) ? textColors[res] : null;
    dotSize = this.props.avatar ? 38 : 24;
    dotBorder = this.props.avatar ? 3 : 0;
    arrowDistance = this.props.avatar ? -47 : -38;
    zone = {
      margin: 0,
      display: "inline-block",
      position: "relative",
      textAlign: "right",
      verticalAlign: "top"
    }
    textSmall = {
      margin: "19px 0 0 5px",
      padding: 0,
      verticalAlign: "top",
      display: "inline-block",
      fontSize: 12,
      lineHeight: 1
    }
    textBig = {
      padding: 0,
      verticalAlign: "top",
      display: "inline-block",
      fontSize: 32,
      lineHeight: 1,
    }
    icon = {
      textAlign: "right",
      fontSize: 13,
      top: 7,
      left: "auto",
      right: 0
    }

    return {
      zoneColor: color,
      zoneTextColor: textColor,
      area: {
        margin: "10px 0 0 55px"
      },
      BPRes: h.assignClone([zone, RC.cssMixins.font("light")], {
        width: 155
      }),
      HRRes: h.assignClone([zone, RC.cssMixins.font("light")], {
        width: 100,
        position: "absolute", right: 10,
      }),
      BPBig: h.assignClone(textBig, {
        position: "absolute",
        right: 45,
        fontFamily: RC.Theme.font.light, color: color
      }),
      BPSmall: h.assignClone(textSmall, {
        width: 45
      }),
      BPIcon: h.assignClone(icon, {
        right: 0
      }),
      HRBig: h.assignClone(textBig, {
        right: 0
      }),
      HRSmall: textSmall,
      HRIcon: h.assignClone(icon, {
        display: "inline-block",
        textAlign: "left",
        right: 0
      }),
      back: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        height: 54,
        margin: "-28px 0 0",
        paddingTop: 20,
        paddingBottom: 20
      },
      backText: {
        padding: "2px 0 0", margin: "0 55px 0 0",
        fontSize: 12,
        lineHeight: 1
      },
      buttons: {
        position: "absolute", left: "auto", right: 0, top: 5, bottom: 5,
        width: 55, textAlign: "center", margin: "-23px 10px 0 0"
      },
      dot: {
        borderRadius: "50%",
        borderWidth: dotBorder,
        borderStyle: "solid",
        borderColor: color,
        position: "absolute",
        top: "50%",
        left: arrowDistance,
        width: dotSize,
        height: dotSize,
        margin: (dotSize / -2) + "px 0 0"
      },
      avatar: {
        borderRadius: "50%",
        width: dotSize,
        height: dotSize
      },
      arrow: {
        position: "absolute",
        left: 0,
        top: "50%",
        width: 0,
        height: 0,
        margin: "-8px 0 0 -7px",
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: "7px solid rgba(0,0,0,.12)"
      }
    };
  }
});
