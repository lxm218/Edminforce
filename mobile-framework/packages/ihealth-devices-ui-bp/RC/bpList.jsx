
IH.RC.BPList = React.createClass({
  mixins: [ReactMeteorData],
  displayName: "BPList",
  componentWillMount(){
    let showEmergenciesOnly = _.isBoolean(this.props.emergenciesOnly) ? this.props.emergenciesOnly : true
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
        {systolic:{$gt:h.getBPConds()[0].hiPressure}},
        {diastolic:{$gt:h.getBPConds()[0].loPressure}}
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
      let avatars = _.object(Meteor.users.find({_id: cond.userId},{fields:{"profile.avatar":1}}).map(function(u) {
        return [u._id, u.profile.avatar]
      }))

      measurements = IH.Coll.Measurements.find(cond, opts).map(function(m){
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
  renderTabs: function(){
    let self = this
    let switchCond = !this.state.emergenciesOnly
    return <RC.Item bgColor="brand1Darker" theme={"divider"} style={{textAlign: "center"}} onClick={this.switchList}>
      <p><RC.uiIcon uiClass={switchCond ? "square" : "check-square"} theme="inline-block-left" uiSize={13} uiColor="white" /><strong>Show Emergencies Only</strong></p>
    </RC.Item>
  },
  renderMeasurements: function() {
    let self = this;
    let openBP = function(bp) {
      console.log(bp._id)
      FlowRouter.go( FlowRouter.path("measurementView", { mId: bp._id }))
    }
    //console.log(this.data.measurements);
    return <RC.Loading isReady={this.data.isReady}>
      { _.map( this.data.measurements, function(bp, n) {

        return <IH.RC.BPListItem
          bp={bp}
          n={n}
          key={n}
          avatar={bp.avatar}
          openBP={openBP.bind(null,bp)} />
      })}
    </RC.Loading>
  },
  render: function() {
    var styles = this.styles()
    return <RC.Div bgColor="light" theme="full" {... this.props} style={styles.canvas}>
      {this.props.children}
      {this.props.showTabs?this.renderTabs():''}
      {this.renderMeasurements()}
    </RC.Div>
  },
  styles: function() {
    return {
      canvas: {
        padding: "0 0 20px"
      }
    };
  }
});

IH.RC.BPListItem = React.createClass({displayName: "BPListItem",
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
  getInitialState(){
    return {isActive: false}
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
    measureTime = moment(this.props.bp.MDate).format("h:mm A");
    styles = self.styles();
    return <RC.Card theme={["double-from-right","no-shadow"]} ref={"dc"+this.props.n} uiBgColor={styles.zoneColor} style={styles.canvas}>
      <RC.Item theme="no-borders" data-time={measureTime} onClick={self.setActive}>

        <figure style={h.assignClone(styles.dot, {backgroundColor: styles.zoneColor})}>
          {this.props.avatar ? <img src={this.props.avatar} style={styles.avatar}/> : void 0 }
        </figure>
        <span style={styles.arrow} />

        <div style={styles.BPRes}>
          <p style={styles.BPBig}>
            {this.props.bp.systolic}/{this.props.bp.diastolic}
          </p>

          <p style={styles.BPSmall}>
            <RC.uiIcon uiClass="heart-o" itemStyle={styles.BPIcon} />
            <span>mmHg</span>
          </p>
        </div>

        <div style={styles.HRRes}>
          <p style={styles.HRBig}>
            {this.props.bp.heartRate}
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
        <p style={styles.buttons} onMouseDown={self.props.openBP} onTouchStart={self.props.openBP}>
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

    res = h.getBPZone(this.props.bp.systolic, this.props.bp.diastolic);
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
      canvas: {
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
