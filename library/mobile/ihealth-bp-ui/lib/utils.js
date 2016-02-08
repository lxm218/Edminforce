"use strict"

h.getBPConds = function() {
  const zones = [
    {hiPressure: 120, loPressure: 80},
    {hiPressure: 140, loPressure: 90},
    {hiPressure: 160, loPressure: 100},
    {hiPressure: 180, loPressure: 110},
  ];
  return zones;
}

h.getBPZone = function(hiPressure, loPressure) {
  if (_.isArray(hiPressure) && hiPressure.length>=2) {
    loPressure = hiPressure[1]
    hiPressure = hiPressure[0]
  }
  if (!hiPressure || !loPressure)
    return null;
  else {
    var BPConds = h.getBPConds();
    var BPCondsCount = _.size(BPConds);
    for (var i = BPCondsCount - 1; i >= 0; i--) {
      if (hiPressure > BPConds[i].hiPressure || loPressure > BPConds[i].loPressure) {
        return i + 1;
      }
    }
    return 0;
  }
}

h.getBPZoneName = function(score,returnString) {
  const zones = [
    "Normal BP",
    "Prehypertension",
    ["Hypertension","Stage 1"],
    ["Hypertension","Stage 2"],
    ["Hypertension","Crisis"]
  ]
  if (typeof score=="undefined")
    return zones

  const name = zones[score]
  return returnString && name && typeof name!="string"
    ? name[0] // Assumming this is an array
    : name
}
