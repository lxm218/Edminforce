/*************************************************************************
 * Copyright iHealth Lab, 2015
 *
 *************************************************************************
 *
 * @description
 * This component will generate a list of every user in the database and
 * allow you to edit their information.
 *
 * @author
 * Kris Hamoud
 * Jason Lee
 *
 *************************************************************************/
IH.RC.UserList = class extends RC.CSSMeteorData {
  constructor(p) {
    super(p)
    this.state = {
      showAllUsers: true,
      user: null,
      sortBy: null,
      searchBy: {}
    }
  }
  getMeteorData() {
    Meteor.subscribe("allUsers");
    let obj = {};
    if(this.state.sortBy){
      obj[this.state.sortBy.selector] = this.state.sortBy.sorted;
    }
    return {
      users: Meteor.users.find(this.state.searchBy, {sort: obj}).fetch()
    }
  }
  /**
   * [showMore description]
   * @return void
   * @description: set the new state so we can see the users details
   */
  showMore(user, e){
    e.preventDefault();
    this.setState({
      showAllUsers: ! this.state.showAllUsers,
      user: user
    });
  }
  /**
   * [renderUsers description]
   * @return ReactComponent
   * @description: Maps the users and creates RC.Items for all of them
   */
  renderUsers(){
    return this.data.users.map((user, i) => {
      return <IH.RC.UserListItem onClick={this.showMore.bind(this, user)}
                key={user._id}
                user={user} />;
    });
  }
  /**
   * [submitForm description]
   * @return void
   * @description: get the form data and set the user document to the new values
   */
  submitForm(e) {
    // if type click then the form was canceld and no need to update anything;
    if(e.type === "click"){
      this.setState({
        showAllUsers: ! this.state.showAllUsers,
        user: null
      });
    }

    const self = this;
    e.preventDefault();

    let units = {};
    // getting the form data and turning it into an object
    let formData = _.object($(e.target).serializeArray().map(function(v) {
      if(v.name == "height"){
        units["height"] = v.value;
      } else if (v.name == "weight") {
        units["weight"] = v.value;
      }
      return [v.name, v.value];
    }));

    formData["profile.height"] = convertHeightToCM(formData["profile.height"], units.height);
    formData["profile.weight"] = convertWeightToKG(formData["profile.weight"], units.weight);

    // update the user with this meteor call
    Meteor.call("updateUserProfile", formData._id, formData, function(err,res){
      if(err){
        alert(err.reason);
      } else {
        Meteor.setTimeout(function(){
          self.setState({
            showAllUsers: ! self.state.showAllUsers,
            user: null
          });
        },500)
      }
    });
  }
  /**
   * [sortBy description]
   * @param selector: a field in the user doc to sort on
   * @return void
   * @description: if there is already a selector then invert it, else sort on
   *  the new selector
   */
  sortBy(selector){
    if(this.state.sortBy && this.state.sortBy.selector === selector){
      const sorted = -this.state.sortBy.sorted;
      this.setState({sortBy: {selector: selector, sorted:sorted}});
    } else {
      this.setState({sortBy:{selector:selector, sorted:1}});
    }
  }
  /**
   * [renderUser description]
   * @return ReactComponent
   * @description: renders a form that has all the information on a given user
   */
  renderUser(){
    const user = this.state.user;
    return <IH.RC.UserDetails
              onSubmit={this.submitForm}
              user={user} />
  }
  /**
   * [filterList description]
   * @return void
   * @description: limit the list of users based on a query
   */
  filterList(queryParam, e){
    let query = this.state.searchBy;
    query[queryParam] = {$regex: e.target.value, $options:'i'};
    this.setState({searchBy: query});
  }
  /**
   * [render description]
   * @return ReactComponent
   * @description: render the UserList component
   */
  _renderTable() {
    const tableStyle = {
      width: "100%"
    }

    let tableHead = [{
      text: 'Name',
      onClick: this.sortBy.bind(this, "profile.firstName"),
    }, {
      text: 'Email',
      onClick: this.sortBy.bind(this, "emails.address")
    }, {
      text: 'Height',
      onClick: this.sortBy.bind(this, "profile.height")
    }, {
      text: 'Weight',
      onClick: this.sortBy.bind(this, "profile.weight")
    }, {
      text: 'BMI',
      onClick: this.sortBy.bind(this, "profile.bmi")
    }, {
      text: 'Daily Activity',
      onClick: this.sortBy.bind(this, "profile.dailyActivity")
    }, {
      text: 'Health Status',
      onClick: this.sortBy.bind(this, "profile.status")
    }]

    tableHead = tableHead.map((item) => {
      return _.extend(item, {sort: true})
    })

    let tableData = this.data.users.map((user, index) => {
      let profile = user.profile
      let email = user.emails && user.emails[0] && user.emails[0].address
      return {
        'Name': profile.firstName,
        'Email': email,
        'Height': profile.height,
        'Weight': profile.weight,
        'BMI': profile.bmi,
        'Daily Activity': profile.dailyActivity,
        'Health Status': profile.status
      }
    })
    let table = {
      headerBgColor: "gray",
      data: tableData,
      header: tableHead,
      isReady: true
    }

    return (
      <div>
        <RC.TableAuto {... table} />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th onClick={this.sortBy.bind(this, "profile.firstName")} align="left">Name</th>
              <th onClick={this.sortBy.bind(this, "emails.address")}>Email</th>
              <th onClick={this.sortBy.bind(this, "profile.height")} align="left">Height (cm)</th>
              <th onClick={this.sortBy.bind(this, "profile.weight")} align="left">Weight (kg)</th>
              <th onClick={this.sortBy.bind(this, "profile.bmi")} align="left">BMI</th>
              <th onClick={this.sortBy.bind(this, "profile.dailyActivity")} align="left">Daily Activity</th>
              <th onClick={this.sortBy.bind(this, "profile.status")} align="left">Health Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const inputStyle = {
      display: "inline-block"
    };
    return (
      <div>
        {
          this.state.showAllUsers ?
          <RC.Input inputStyle={inputStyle} onKeyUp={this.filterList.bind(this, "profile.firstName")} label="First Name:" />
          :
          null
        }
        {
          this.state.showAllUsers ?
          <RC.Input onKeyUp={this.filterList.bind(this, "profile.lastName")} label="Last Name:" />
          :
          null
        }
        {
          this.state.showAllUsers ?
          <RC.Input onKeyUp={this.filterList.bind(this, "emails.address")} label="Email:" />
          :
          null
        }
        {
          this.state.showAllUsers ?
          this._renderTable()
          :
          this.renderUser()
        }
      </div>
    )
  }
}

/**
 * [convertHeightToCM description]
 * @return float
 * @description: convert the weight from a string in some units to a float in
 * centimeters
 */
convertHeightToCM = function(height, units){
  switch (units){
    case "feet":
      let splitHeight = height.split(" ");
      let feet = splitHeight[0];
      feet = parseInt(feet);
      let inches = splitHeight[1];
      inches = parseInt(inches);
      let inchHeight = inches + (feet*12);
      return inchHeight * 2.54;
      break;
    case "centimeters":
      height = parseFloat(height);
      return height;
      break;
    case "inches":
      return parseInt(height) * 2.54;
      break;
  }
}

/**
 * [convertWeightToKG description]
 * @return float
 * @description: convert the height from a string in some units to a float in
 * kilograms
 */
convertWeightToKG = function(weight, units){
  switch (units){
    case "kg":
      return parseFloat(weight);
      break;
    case "lbs":
      return parseFloat(weight) / 2.20462;
      break;
  }
}
