h.getBPConds = function() {
  const zones = [
    {hiPressure: 120, loPressure: 80},
    {hiPressure: 140, loPressure: 90},
    {hiPressure: 160, loPressure: 100}
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
