
'use strict';

h.getDateString = function (date) {
  if (! date instanceof Date ) throw new Error("Input must be date");

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getYear() + 1900;

  var mStr = month < 10 ? "0" + month : "" + month;
  var dStr = day < 10 ? "0" + day : "" + day;

  return {
    year: `${year}`,
    month: mStr,
    day: dStr
  }
};

h.getDateStringFromDay = function (dayString) {
  // dayString is '20160121'
  if (! typeof dayString === 'string' ) throw new Error("Input must be string");

  return {
    year: dayString.slice(0, 4),
    month: dayString.slice(4, 6),
    day: dayString.slice(6, 8)
  }
};

h.getLocalDate = function (date, tz) {
  if (! date instanceof Date ) throw new Error("Input must be date");
  if (typeof tz === 'undefined' || typeof tz !== 'number') return date;

  var d = new Date(date.valueOf());
  d.setHours(d.getHours() + tz);

  return d;
};