"use strict"

h.amCalculateDistance = (size, num, km) => {

  if (isNaN(size+num) || size==null || num==null)
    return "--"

  let base = km
    ? 160934 // 1 mile
    : 100000 // 1 km
  let total = size*num
  return Math.round(total/base*100)/100
}

h.amCalculateCalories = (profile, calories, date) => {

  let activityLevel = [1,1.05,1.1,1.15]
  if (isNaN(calories)) calories = 0

  let wt = profile.weight || 80 // Default
  let ht = profile.height || 180 // Default
  let age = profile.birthday ? moment().diff(moment(profile.birthday), "years") : 30 // Default
  let q = activityLevel[profile.activityLevel || 0] // Default

  let bmr = profile.gender
    ? (13.397 * wt + 4.799 * ht - 5.677 * age + 88.362) * q // Male
    : (9.247 * wt + 3.098 * ht - 4.330 * age + 44.593) * q // Female

  let m = moment(date)

  if (!m.isValid() || moment().diff(m, 'days') > 0)
    return h.numberFormat(bmr+calories, 0)

  let seconds = moment(date).diff( moment(date).startOf("day"), "seconds" )
  return h.numberFormat(bmr*seconds/(24*60*60)+calories, 0)
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

h.getAMZone = (perCent) => {
  return Math.round(perCent*-3+3) // Change 3 to 4 if you want to allow "danger" color (red)
}
