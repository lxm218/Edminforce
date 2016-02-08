
'use strict';

mapper.BP = function () {

  var date = h.getLocalDate(this.MDate, employers[this.employerId]);
  var dateObj = h.getDateString(date);
  var dateArray = Object.keys(dateObj).map((k) => {
    return dateObj[k];
  });

  var id = `${this.employerId}_BP_${dateArray.join("")}`;
  var Day = dateArray.join("-");

  emit(id, {
    employerId: this.employerId,
    Day: Day,
    HP: this.HP,
    LP: this.LP,
    HR: this.HR,
    count: 1
  });
};


reducer.BP = function (key, values) {
  var count = 0, HP = 0, LP = 0, HR = 0;
  values.forEach((v)=> {
    count += v.count;
    HP += v.HP;
    LP += v.LP;
    HR += v.HR;
  });

  return {
    employerId: values[0].employerId,
    Day: values[0].Day,
    HP: HP,
    LP: LP,
    HR: HR,
    count: count
  }
};

finalizer.BP = function (key, value) {
  var count = value.count;
  return {
    employerId: value.employerId,
    dataType: "BP",
    Date: h.getLocalDate(new Date(value.Day), -employers[value.employerId]),
    HP: value.HP / count,
    LP: value.LP / count,
    HR: value.HR / count,
    count: value.count
  }
};