
IH.RC.Trends = class extends RC.MeteorData {
  constructor(p) {
    super(p)
    this.styles = this._getStyles()
    this.genderArr = ['Both', 'Male', 'Female']
    this.ageArr = ['All', '20-30 years old', '30-40 years old', '40-50 years old', '50-60 years old', '60+ years old']
    this.activityArr = ['All', 'Sedentary', 'Active', 'Very Active']
    this.deviceArr = ['All', 'Blood Pressure', 'Blood Glucose', 'Weight Scale', 'Activity Tracker']
    this.conditionArr = _.clone(Meteor.settings.public.groupNames)
    this.conditionArr.unshift('All')
    this.criticalWidthArr = [1310, 760, 600]
    this.setWindowWidth = () => {
      this.setState({windowWidth: window.innerWidth})
    }
    this.state = {
      genderArr: this.genderArr,
      ageArr: this.ageArr,
      activityArr: this.activityArr,
      deviceArr: this.deviceArr,
      conditionArr: this.conditionArr,
      windowWidth: window.innerWidth
    }
  }

  getMeteorData() {
    let conditionArr = _.clone(Meteor.settings.public.groupNames)
    conditionArr.unshift('All')
    return {
      conditionArr: conditionArr
    }
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
    window.addEventListener('resize', this.setWindowWidth)
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount()
    window.removeEventListener('resize', this.setWindowWidth)
  }

  _renderFilterGender() {
    return this._renderFilterCommon('genderArr', 'Gender')
  }

  _renderFilterAge() {
    return this._renderFilterCommon('ageArr', 'Age Range')
  }

  _renderFilterActivity() {
    return this._renderFilterCommon('activityArr', 'Activity Level')
  }

  _renderFilterDevice() {
    return this._renderFilterCommon('deviceArr', 'Devices')
  }

  _renderFilterCondition() {
    return this._renderFilterCommon('conditionArr', 'Conditions')
  }

  _renderFilterCommon(arrName, text) {
    let originalArr = _.clone(this[arrName] || this.data[arrName])
    let currentArr = _.clone(this.state[arrName])

    let onClick = (value, index) => {
      if(index === -1) {
        if(value === 'All' || value === 'Both') {
          currentArr = originalArr
        }
        else {
          currentArr.push(value)
          if(originalArr.length === currentArr.length + 1) {
            if(currentArr.length === 2) {
              currentArr.push('Both')
            }
            else {
              currentArr.push('All')
            }
          }
        }
      }
      else {
        if(value === 'All' || value === 'Both') {
          currentArr = []
        }
        else {
          currentArr.splice(index, 1)
          if(currentArr.indexOf('All') !== -1) {
            currentArr.splice(currentArr.indexOf('All'), 1)
          }
          if(currentArr.indexOf('Both') !== -1) {
            currentArr.splice(currentArr.indexOf('Both'), 1)
          }
        }
      }
      let stateObj = {}
      stateObj[arrName] = currentArr
      this.setState(stateObj)
    }

    let checkboxList = originalArr.map( (value, n) => {
      let index = currentArr && currentArr.indexOf(value)
      return {
        label: value,
        ref: value,
        checked: index !== -1,
        onClick: onClick.bind(this, value, index)
      }
    })
    let options = [checkboxList]
    if(checkboxList.length > 6) {
      let leftList = _.clone(checkboxList).splice(0, Math.ceil(checkboxList.length / 2))
      let rightList = _.clone(checkboxList).splice(Math.ceil(checkboxList.length / 2))
      options = [leftList, rightList]
    }

    return (
      <div>
        <span style={this.styles.span}>{text}:</span><br/><br/>
        <RC.CheckboxGroup key={Meteor.uuid()} options={options} labelColor="brand1" theme="smaller" />
      </div>
    )
  }
  
  _renderFilters() {
    let windowWidth = this.state.windowWidth
    var widthArr
    if(windowWidth > this.criticalWidthArr[0]) {
      widthArr = ['10%', '15.5%', '15.5%', '15.5%', '42.8%']
    }
    else if(windowWidth > this.criticalWidthArr[1]) {
      widthArr = ['33.3%', '33.3%', '33.3%', '33.3%', '66.6%']
    }
    else if(windowWidth > this.criticalWidthArr[2]) {
      widthArr = ['50%', '50%', '50%', '50%', '100%']
    }
    else {
      widthArr = ['100%', '100%', '100%', '100%', '100%']
    }
    let itemStyle = {
      marginBottom: '1em'
    }

    return (
      <RC.Grid titleBgColor="brand2" bgColor="white" theme={["paddingPx"]}>
        <RC.GridItem theme="paddingPx-r" width={widthArr[0]} style={itemStyle}>
          {this._renderFilterGender()}
        </RC.GridItem><br/>
        <RC.GridItem theme="paddingPx-r" width={widthArr[1]} style={itemStyle}>
          {this._renderFilterAge()}
        </RC.GridItem><br/>
        <RC.GridItem theme="paddingPx-r" width={widthArr[2]} style={itemStyle}>
          {this._renderFilterActivity()}<br/>
        </RC.GridItem><br/>
        <RC.GridItem theme="paddingPx-r" width={widthArr[3]} style={itemStyle}>
          {this._renderFilterDevice()}
        </RC.GridItem><br/>
         <RC.GridItem theme="paddingPx-r" width={widthArr[4]} style={itemStyle}>
          {this._renderFilterCondition()}
        </RC.GridItem>
      </RC.Grid>
    )
  }

  _renderGraphs() {
    return (
      <div>
        <IH.RC.TrendsAM />
        <IH.RC.TrendsBP />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this._renderFilters()}
        {this._renderGraphs()}<br/><br/>
      </div>
    )
  }

  _getStyles() {
    return {
      span: {
        fontSize: '0.95em'
      },
      item: {
        height: '0.9em',
        padding: '0.5em 1.3em 1.3em 1.3em'
      },
      itemText: {
        fontSize: '0.7em'
      },
      list: {
        borderStyle: 'groove',
        borderColor: '#0082ec',
        borderWidth: '0.1em',
        width: '85%',
        float: 'right',
        margin: '1em',
        cursor: 'pointer'
      }
    }
  }
}

IH.RC.Trends.displayName = "IH.RC.Trends"

