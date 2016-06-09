/*************************************************************************
 * Copyright iHealth Lab, 2015
 *
 *************************************************************************
 *
 * @description
 * This component will generate a form that contains all of the editbale
 * information that a user has.
 *
 * @author
 * Kris Hamoud
 *
 *************************************************************************/
IH.RC.UserDetails = React.createClass({
  /**
   * [propTypes description]
   * @description: require a user object in order for this component to
   * render
   */
  propTypes:{
    user: React.PropTypes.object.isRequired
  },

  /**
   * [getInitialState description]
   * @return {}
   * @description: set the initial state for height and weight
   */
  getInitialState(){
    return {height:"inches", weight:"lbs"};
  },

  /**
   * [changeRole description]
   * @param {Object} user - the user document to be edited
   * @param {Object} e - the event object
   * @return void
   * @description: change the role of the selected user
   */
  changeRole(user, e){
    Meteor.call("updateRoles", user._id, e.target.value,e.target.value);
  },

  /**
   * [render description]
   * @param {Object} user - the user document to be edited
   * @param {Object} e - the event object
   * @return ReactComponent
   * @description: render a form containing the information of a given user
   */
  changeActivity(user,e){
    Meteor.call("updateActivity", user._id, e.target.value);
  },


  /**
   * [getHeight description]
   * @return String
   * @description: given a number H centimeters, return the user height
   * formatted to inches or centimeters
   */
  getHeight(){
    let height = this.props.user.profile.height;
    switch (this.state.height){
      case "centimeters":
        return String(height) + "cm";
        break;
      case "inches":
        return String((height * 0.393701).toFixed(2)) + "in";
        break;
    }
  },


  /**
   * [setHeight description]
   * @param {Object} e - the event that was fired
   * @return void
   * @description: set the new state of height units
   */
  setHeight(e){
    this.setState({
      height:e.target.value
    });
  },



  /**
   * [getWeight description]
   * @return String
   * @description: given a weight w, return the weight in kg or lbs
   */
  getWeight(){
    let weight = this.props.user.profile.weight;
    switch (this.state.weight){
      case "kg":
        return String(weight.toFixed(2)) + "kg";
        break;
      case "lbs":
        return String((weight*2.20462).toFixed(2)) + "lbs";
        break;
    }
  },

  /**
   * [setWeight description]
   * @param {Object} e - the event that was fired
   * @return void
   * @description: set the new state of weight units
   */
  setWeight(e){
    this.setState({
      weight:e.target.value
    });
  },


  /**
   * [getBMI description]
   * @return string
   * @description: compute and return the BMI of the patient
   */
  getBMI(){
    const user = this.props.user;
    const bmi = user.profile.weight / Math.pow((user.profile.height/100),2);
    return String(bmi.toFixed(2));
  },

  /**
   * [render description]
   * @return ReactComponent
   * @description: render a form containing the information of a given user
   */
  render(){
    const heightUnits = [
      {
        value:"centimeters",
        label:"Centimeters"
      },
      {
        value:"inches",
        label:"Inches"
      }
    ];
    const weightUnits = [
      {
        value:"kg",
        label:"Kilograms"
      },
      {
        value:"lbs",
        label:"Pounds"
      }
    ];
    return (
      <RC.Form onSubmit={this.props.onSubmit} ref="form">
        <RC.Input name="_id" value={this.props.user._id} type="hidden" />

        <RC.Input name="profile.avatar" value={this.props.user.profile.avatar}
          label="Avatar" />

        <RC.Input name="profile.firstName"
          value={this.props.user.profile.firstName}
          label="First Name" />

        <RC.Input name="profile.lastName"
          value={this.props.user.profile.lastName}
          label="Last Name" />

        <RC.Select onChange={this.setHeight}
          name="height"
          options={heightUnits}
          label="Height Units"
          value="inches"/>

        <RC.Input name="profile.height" value={this.getHeight()}
          label="Height" />


        <RC.Select onChange={this.setWeight}
          name="weight"
          options={weightUnits}
          label="Weight Units"
          value="lbs"/>

        <RC.Input name="profile.weight" value={this.getWeight()}
          label="Weight" />

        <RC.Input name="profile.bmi" value={this.getBMI()}
          label="BMI" readOnly="true"/>

        <RC.Select onChange={this.changeRole.bind(this, this.props.user)}
          name="rolelist" options={IH.Roles} label="Role"
          value={this.props.user.roles} />

        <RC.Select onChange={this.changeActivity.bind(this, this.props.user)}
          name="dailyActivity"
          options={["Sedentary", "Active", "Very Active"]}
          label="Daily Activity"
          value={this.props.user.profile.dailyActivity}/>

        <RC.Button type="submit" theme="inline" bgColor="brand1">Submit</RC.Button>
        <RC.Button type="button" onClick={this.props.onSubmit} theme="inline">Cancel</RC.Button>
      </RC.Form>
    );
  }

})
