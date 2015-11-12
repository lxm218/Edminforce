Meteor.startup(function () {
  DB.Classes.remove()

  if (DB.Classes.find({}).count() === 0) {

    //////////////////////////////////////////////
    var classesDataArr = [

      ///////////////////////以前的session//////////////////
      ['MON1', 'testSession1', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['MON2', 'testSession1', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['MON3', 'testSession1', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['MON4', 'testSession1', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['MON5', 'testSession1', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['MON6', 'testSession1', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['MON7', 'testSession1', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['MON8', 'testSession1', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['MON9', 'testSession1', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['MON10', 'testSession1', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['MON11', 'testSession1', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['MON12', 'testSession1', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['MON13', 'testSession1', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['MON14', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['MON15', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['MON16', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['MON17', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['MON18', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['MON19', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L"],

      ///////////////////////正在进行的session//////////////////
      /////周一
      ['MON1', 'testSession2', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['MON2', 'testSession2', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['MON3', 'testSession2', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['MON4', 'testSession2', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['MON5', 'testSession2', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['MON6', 'testSession2', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['MON7', 'testSession2', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['MON8', 'testSession2', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['MON9', 'testSession2', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['MON10', 'testSession2', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['MON11', 'testSession2', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['MON12', 'testSession2', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['MON13', 'testSession2', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['MON14', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['MON15', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['MON16', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['MON17', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['MON18', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['MON19', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L"],

      ///周二
      ['TUE1', 'testSession2', 2, ["BUB1"], "15:00", "15:30", "TUE-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['TUE2', 'testSession2', 2, ["BUB1"], "15:30", "16:00pm", "TUE-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['TUE3', 'testSession2', 2, ["BUB2", "BUB3"], "15:00", "15:30", "TUE-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['TUE4', 'testSession2', 2, ["BUB2", "BUB3"], "15:30", "4:00", "TUE-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['TUE5', 'testSession2', 2, ["BUB2", "BUB3"], "16:00", "16:30", "TUE-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['TUE6', 'testSession2', 2, ["CRL1"], "16:00", "16:30", "TUE-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['TUE7', 'testSession2', 2, ["CRL2", "CRL3"], "16:00", "16:30", "TUE-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['TUE8', 'testSession2', 2, ["CRL2", "CRL3"], "16:45", "17:15", "TUE-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['TUE9', 'testSession2', 2, ["GLD1"], "16:00", "16:45pm", "TUE-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['TUE10', 'testSession2', 2, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "TUE-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['TUE11', 'testSession2', 2, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "TUE-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['TUE12', 'testSession2', 2, ["GLD2", "GLD3"], "17:30", "18:15", "TUE-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['TUE13', 'testSession2', 2, ["GLD2", "GLD3"], "18:30", "19:15", "TUE-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['TUE14', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "TUE-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['TUE15', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "TUE-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['TUE16', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "TUE-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['TUE17', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "TUE-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['TUE18', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "TUE-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['TUE19', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "TUE-CHL/MST 6:00-7:00pm", "Jimmy", "L"],

      ['WED1', 'testSession2', 3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['WED2', 'testSession2', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['WED3', 'testSession2', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['WED4', 'testSession2', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['WED5', 'testSession2', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['WED6', 'testSession2', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['WED7', 'testSession2', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['WED8', 'testSession2', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['WED9', 'testSession2', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['WED10', 'testSession2',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['WED11', 'testSession2', 3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['WED12', 'testSession2', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['WED13', 'testSession2', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['WED14', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['WED15', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['WED16', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['WED17', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['WED18', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['WED19', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L"],


      ///////////////////////////将要注册的session///////////////////////////////
      /////周一
      ['MON1', 'testSession3', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['MON2', 'testSession3', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['MON3', 'testSession3', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['MON4', 'testSession3', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['MON5', 'testSession3', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['MON6', 'testSession3', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['MON7', 'testSession3', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['MON8', 'testSession3', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['MON9', 'testSession3', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['MON10', 'testSession3', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['MON11', 'testSession3', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['MON12', 'testSession3', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['MON13', 'testSession3', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['MON14', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['MON15', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['MON16', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['MON17', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['MON18', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['MON19', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L"],

      ///周二
      ['TUE1', 'testSession3', 2, ["BUB1"], "15:00", "15:30", "TUE-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['TUE2', 'testSession3', 2, ["BUB1"], "15:30", "16:00pm", "TUE-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['TUE3', 'testSession3', 2, ["BUB2", "BUB3"], "15:00", "15:30", "TUE-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['TUE4', 'testSession3', 2, ["BUB2", "BUB3"], "15:30", "4:00", "TUE-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['TUE5', 'testSession3', 2, ["BUB2", "BUB3"], "16:00", "16:30", "TUE-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['TUE6', 'testSession3', 2, ["CRL1"], "16:00", "16:30", "TUE-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['TUE7', 'testSession3', 2, ["CRL2", "CRL3"], "16:00", "16:30", "TUE-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['TUE8', 'testSession3', 2, ["CRL2", "CRL3"], "16:45", "17:15", "TUE-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['TUE9', 'testSession3', 2, ["GLD1"], "16:00", "16:45pm", "TUE-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['TUE10', 'testSession3',2, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "TUE-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['TUE11', 'testSession3', 2, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "TUE-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['TUE12', 'testSession3', 2, ["GLD2", "GLD3"], "17:30", "18:15", "TUE-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['TUE13', 'testSession3', 2, ["GLD2", "GLD3"], "18:30", "19:15", "TUE-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['TUE14', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "TUE-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['TUE15', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "TUE-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['TUE16', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "TUE-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['TUE17', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "TUE-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['TUE18', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "TUE-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['TUE19', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "TUE-CHL/MST 6:00-7:00pm", "Jimmy", "L"],


      ///周二
      ['WED1', 'testSession3',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S"],
      ['WED2', 'testSession3', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S"],
      ['WED3', 'testSession3', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S"],
      ['WED4', 'testSession3', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S"],
      ['WED5', 'testSession3', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S"],
      ['WED6', 'testSession3', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S"],
      ['WED7', 'testSession3', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S"],
      ['WED8', 'testSession3', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S"],
      ['WED9', 'testSession3', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L"],
      ['WED10', 'testSession3',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L"],
      ['WED11', 'testSession3',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L"],
      ['WED12', 'testSession3', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L"],
      ['WED13', 'testSession3', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L"],
      ['WED14', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L"],
      ['WED15', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L"],
      ['WED16', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L"],
      ['WED17', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L"],
      ['WED18', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L"],
      ['WED19', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L"],

    ]

    classesDataArr.forEach(function (item) {
      DB.Classes.insert({
        _id: item[1] +'-'+ item[0],
        sessionId: item[1],
        name: item[6],
        levels: item[3],
        day: item[2],
        startTime: App.time2num(item[4]),
        endTime: App.time2num(item[5]),

        price: 100,
        seatsTotal: 10,
        seatsRemain: 10

      })

    })



    ////////////////////////////////////////////////////
    ///注册 test data
    /*
     * 一共分三个session
     session1 已过去
     当前正处于session2且已关闭注册
     开放注册的是 session3
     *
     * */

    var classRegisterData=[


      ////history
      {
        classId:'testSession1-MON3',
        swimmerId:'jandmfear@gmail.com_Mia-Fear',
        sessionId: 'testSession1',
        accountId:'jandmfear@gmail.com'
      },


      /////////////////session2//////////////////////////////////////
      //jliu@gmail.com
      {
        classId:'testSession2-MON14',
        swimmerId:'jliu@gmail.com_Allen-Liu',
        sessionId: 'testSession2',
        accountId:'jliu@gmail.com'
      },
      {
        classId:'testSession2-WED14',
        swimmerId:'jliu@gmail.com_Allen-Liu',
        sessionId: 'testSession2',
        accountId:'jliu@gmail.com'
      },
      {
        classId:'testSession2-MON17',
        swimmerId:'jliu@gmail.com_Lily-Liu',
        sessionId: 'testSession2',
        accountId:'jliu@gmail.com'
      },

      //jbhe@gmail.com
      {
        classId:'testSession2-MON17',
        swimmerId:'jbhe@gmail.com_Angle-He',
        sessionId: 'testSession2',
        accountId:'jbhe@gmail.com'
      },
      {
        classId:'testSession2-MON15',
        swimmerId:'jbhe@gmail.com_Mattew-He',
        sessionId: 'testSession2',
        accountId:'jbhe@gmail.com'
      },


      //dave_IrisRojan@gmail.com
      {
        classId:'testSession2-MON19',
        swimmerId:'dave_IrisRojan@gmail.com_Arush-Rojan',
        sessionId: 'testSession2',
        accountId:'dave_IrisRojan@gmail.com'

      }
    ];

      classRegisterData.forEach(function(item){

        DB.Classes.update({
          _id: item.classId,
          'seatsRemain': {'$gte': 1},
          //'pendingTransactions': {$ne: tid}
        }, {
          '$inc': {'seatsRemain': -1},
          '$push': {
            students: {
              swimmerId: item.swimmerId,
              swimmer: DB.Swimmers.findOne({_id:item.swimmerId}),
              cartId: 'test_cart_1', //占位
              status: 'paied',
              accountId:item.accountId
            },
            //pendingTransactions: tid
          }
        })

      })


  }
});