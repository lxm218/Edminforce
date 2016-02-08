
'use strict';

mapper.Sleep = function () {

  var dateObj = h.getDateStringFromDay(this.MDay);
  var dateArray = Object.keys(dateObj).map((k) => {
    return dateObj[k];
  });

  var id = `${this.employerId}_Sleep_${dateArray.join("")}`;
  var Day = dateArray.join("-");

  var data = this.lastValue;

  emit(id, {
    employerId: this.employerId,
    Day: Day,
    DS: data.DS,
    RS: data.RS,
    NS: data.NS,
    count: 1
  });
};


reducer.Sleep = function (key, values) {
  var count = 0, DS = 0, RS = 0, NS = 0;
  values.forEach((v)=> {
    count += v.count;
    DS += v.DS;
    RS += v.RS;
    NS += v.NS;
  });

  return {
    employerId: values[0].employerId,
    Day: values[0].Day,
    DS: DS,
    RS: RS,
    NS: NS,
    count: count
  }
};

finalizer.Sleep = function (key, value) {
  var count = value.count;
  return {
    employerId: value.employerId,
    dataType: "Sleep",
    Date:  h.getLocalDate(new Date(value.Day), -employers[value.employerId]),
    DS: value.DS / count,
    RS: value.RS / count,
    NS: value.NS / count,
    count: value.count,
    lastUpdated: new Date()
  }
};