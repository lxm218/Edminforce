
App.Ex2 = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe("getEx2TimeColl");
    return {
      collections:Ex2TimeColl.find().fetch()
    }
  },
  addButton() {
    console.log("Add button");
    Ex2TimeColl.insert({now:new Date()})
  },
  removeButton() {
    console.log("Remove button");
    Meteor.call('RemoveAllTime');
  },
  render() {

    return <div className="padding">
      <div className="half">
        <RC.Button text="Add a time record" className="bg-white" type="submit" clickHandler={this.addButton}/>
      </div>
      <div className="half">
        <RC.Button text="Remove last record" className="bg-white half" type="submit" clickHandler={this.removeButton}/>
      </div>
      <ul>
      {
        this.data.collections.map(function(item,n){
          let timeString = item.now.toString();
          console.log("timeString is, ", timeString);

          return <li>
              {item.now.toString()}
            </li>
        })
      }
      </ul>
    </div>
  }
});
