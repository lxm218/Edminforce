
h.getBPZone = function(hiPressure, loPressure) {
  if (_.isArray(hiPressure) && hiPressure.length>=2) {
    loPressure = hiPressure[1]
    hiPressure = hiPressure[0]
  }
  if (!hiPressure || !loPressure)
    return null
  // else if (hiPressure>180 || loPressure>110)
  //   return 4
  else if (hiPressure>=160 || loPressure>=100)
    return 3
  else if (hiPressure>=140 || loPressure>=90)
    return 2
  else if (hiPressure>=120 || loPressure>=80)
    return 1
  else
    return 0
}
