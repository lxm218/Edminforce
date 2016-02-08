
'use strict';

mapper.Activity = function () {

  var dateObj = h.getDateStringFromDay(this.MDay);
  var dateArray = Object.keys(dateObj).map((k) => {
    return dateObj[k];
  });

  var id = `${this.employerId}_Activity_${dateArray.join("")}`;
  var Day = dateArray.join("-");

  var data = this.lastValue;

  emit(id, {
    employerId: this.employerId,
    Day: Day,
    steps: data.step,
    distance: data.step * data.stepsize / (1000 * 1000),   // Distance is saved in kilometers
    calories: data.calorie,
    count: 1
  });
};


reducer.Activity = function (key, values) {
  var count = 0, steps = 0, distance = 0, calories = 0;
  values.forEach((v)=> {
    count += v.count;
    steps += v.steps;
    distance += v.distance;
    calories += v.calories;
  });

  return {
    employerId: values[0].employerId,
    Day: values[0].Day,
    steps: steps,
    distance: distance,
    calories: calories,
    count: count
  }
};

finalizer.Activity = function (key, value) {
  var count = value.count;
  return {
    employerId: value.employerId,
    dataType: "Activity",
    Date:  h.getLocalDate(new Date(value.Day), -employers[value.employerId]), //new Date(value.Day),
    steps: value.steps / count,
    distance: value.distance / count,
    calories: value.calories / count,
    count: value.count
  }
};