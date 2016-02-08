
IH.Device.BGLog = React.createClass({
  propTypes: {
    detailClickHandler: React.PropTypes.func
  },
  // @@@@
  // @@@@
  // Prep
  // @@@@
  // @@@@


  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  renderBG(bgVal, n){
    const m = this.props.measurements;
    let bg = 0;
    const bgList = _.filter(m, function(bg){
      const d1 = new Date(bgVal.MDate);
      const d2 = new Date(bg.MDate);
      return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && bg.beforeMeal === bgVal.beforeMeal;
    });
    bgList.forEach(function(bgItem){
      bg += bgItem.BG;
    })
    let bgItem = bgList[0];
    bgItem.BG = Math.floor(bg/bgList.length);
    return bgItem;

  },
  render() {
    let styles = this.styles()
    let navGroup = [{
      label: "Date",
      ui: "calendar"
    },{
      label: "Before",
      ui: "coffee"
    },{
      label: "After",
      ui: "coffee"
    },{
      label: "Carbs",
      ui: "coffee"
    }]
    const self = this;
    const m = this.props.measurements;
    let l = [];
    m.map( function(bgVal, n) {
      l.push(self.renderBG(bgVal, n));
    })
    l = _.uniq(l);
    const bgMap = _.where(l, {beforeMeal:true});
    return <div>
      <RC.Grid bgColor="fog" style={styles.navArea}>
        <span style={styles.line1} />
        <span style={styles.line2} />
        <span style={styles.line3} />
        {
        navGroup.map(function(nav,n){
          return <RC.GridItem width="25%" style={styles.navItem} key={n}>
            <RC.URL uiClass={nav.ui} uiSize={11} color="metal" uiItemStyle={{marginTop:-2}}>{nav.label}</RC.URL>
          </RC.GridItem>
        })
        }
      </RC.Grid>
      <div style={styles.area}>
        {
          bgMap.map(function(bgVal, n){
            return <IH.Device.BGLogItem measurements={self.props.measurements}
              bgVal={bgVal}
              order={n}
              key={n} />
          })
        }
      </div>
    </div>
  },
  // @@@@
  // @@@@
  // Styles
  // @@@@
  // @@@@
  styles() {
    let line = {
      width: 1,
      position: "absolute", top: 0, bottom: 0, zIndex: 5,
      background: "rgba(0,0,0,.04)"
    }
    return {
      // Main
      area: Object.assign({}, RC.cssMixins.absFull, {
        top: 32,
        overflowY: "auto"
      }),
      // Nav
      navArea: {
        position: "absolute", top: 0, left: 0, right: 0,
        height: 32,
        borderBottom: "solid 1px rgba(0,0,0,.1)"
      },
      navItem: {
        padding: "9px 5px",
        fontSize: RC.Theme.font.size-2, lineHeight: 1, textAlign: "center"
      },
      line1: Object.assign({},line, {
        left: "25%",
      }),
      line2: Object.assign({},line, {
        left: "50%"
      }),
      line3: Object.assign({},line, {
        left: "75%"
      }),
    }
  },
})

IH.Device.BGLogItem = React.createClass({
  propTypes: {
    bgVal: React.PropTypes.object.isRequired
  },
  // @@@@
  // @@@@
  // Render
  // @@@@
  // @@@@
  getVal(mealType, mDate, beforeMeal){
    const m = this.props.measurements;
    let bg = 0;
    const bgList = _.filter(m, function(bg){
      const d1 = new Date(bg.MDate);
      const d2 = new Date(mDate);
      return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && bg.beforeMeal === beforeMeal;
    });
    bgList.forEach(function(bgItem){
      bg += bgItem.BG;
    })
    return Math.floor(bg/bgList.length);
  },
  render() {
    let bgVal = this.props.bgVal
    let zoneColor = h.getBGColor(bgVal)

    let date = moment(bgVal.MDate).format("MM/DD/YY")
    let isToday = moment().format("MM/DD/YY")===date
    return (
      <IH.Device.LogItem zoneColor={zoneColor} alt={this.props.order%2}>
        <IH.Device.ListBox val={isToday ? "Today" : moment(bgVal.MDate).format("dddd")} unit={date} />
        <IH.Device.ListCircle val={this.getVal(bgVal.mealType, bgVal.MDate, true)} unit="mg/dl" />
        <IH.Device.ListCircle val={this.getVal(bgVal.mealType, bgVal.MDate, false)} unit="mg/dl" />
        <IH.Device.ListBox val={bgVal.carbs} unit="grams" />
      </IH.Device.LogItem>
    );
  },
})
