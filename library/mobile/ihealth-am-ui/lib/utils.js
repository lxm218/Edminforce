"use strict"

h.amCalculateDistance = (size, num, km) => {
  if (isNaN(size+num) || size==null || num==null)
    return 0

  let base = km
    ? 160934 // 1 mile
    : 100000 // 1 km
  let total = size*num
  return Math.round(total/base*100)/100
}

h.amCalculateCalories = (profile, calories, date, format) => {
  const activityLevel = [1,1.05,1.1,1.15]
  const doFormat = format || typeof format=="undefined"
  if (isNaN(calories)) calories = 0

  const wt = profile.weight || 80 // Default
  const ht = profile.height || 180 // Default
  const age = profile.birthday ? moment().diff(moment(profile.birthday), "years") : 30 // Default
  const q = activityLevel[profile.activityLevel || 0] // Default

  const bmr = profile.gender
    ? (13.397 * wt + 4.799 * ht - 5.677 * age + 88.362) * q // Male
    : (9.247 * wt + 3.098 * ht - 4.330 * age + 44.593) * q // Female

  const m = moment(date)

  if (!m.isValid() || moment().diff(m, 'days') > 0) {
    const kcal = bmr+calories
    return doFormat
      ? h.numberFormat(kcal, 0)
      : kcal
  }

  const seconds = moment(date).diff( moment(date).startOf("day"), "seconds" )
  const kcal = bmr*seconds/(24*60*60)+calories

  return doFormat
    ? h.numberFormat(kcal, 0)
    : kcal
}

h.cmToFeet = (number, returnString) => {
  number = Number(number)
  if (!_.isNumber(number)) {
    console.warn("h.cmToInches() failed. Number was not a number.")
    return null
  }

  // CM to FEET
  let baseCM = 30.48 // 1 Feet in CM
  let baseInch = 12 // 1 Feet in Inches
  let real = number/baseCM // In Decimals Value

  if (!returnString)
    return real

  let feet = Math.floor(real)
  let inches = Math.round((real-feet)*baseInch)

  return `${feet}"${inches}'`
}

h.feetToCM = (number) => {
  number = Number(number)
  if (!_.isNumber(number)) {
    console.warn("h.feetToCM() failed. Number was not a number.")
    return null
  }

  // CM to FEET
  let baseFeet = 30.48 // 1 Feet in CM
  let baseInch = 2.54 // 1 Inch in CM

  let feet = Math.floor(number)
  let inchesPc = number-feet

  let cm = baseFeet*feet + 12*inchesPc*baseInch

  return cm
}

h.lbsToKg = (number) => {
  number = Number(number)
  if (!_.isNumber(number)) {
    console.warn("h.lbsToKg() failed. Number was not a number.")
    return null
  }

  // LBS to KG
  let baseLBS = 2.20462 // 1 KG in LBS
  return number/baseLBS
}

h.kgToLbs = (number) => {
  number = Number(number)
  if (!_.isNumber(number)) {
    console.warn("h.kgToLbs() failed. Number was not a number.")
    return null
  }

  // LBS to KG
  let baseLBS = 2.20462 // 1 KG in LBS
  return number*baseLBS
}

h.amGetZone = (perCent) => {
  return Math.round(perCent*-3+3) // Change 3 to 4 if you want to allow "danger" color (red)
}

h.amGetMetricsUnit = (metrics) => {
  return metrics ? "km" : "miles"
}
