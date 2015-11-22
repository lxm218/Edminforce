Meteor.startup(function () {
  DB.Classes.remove()

//////////////////////////////////////////////
  var classesDataArr = [

    ///////////////////////以前的session//////////////////
    ['MON1', 'testSession1', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['MON2', 'testSession1', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['MON3', 'testSession1', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['MON4', 'testSession1', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['MON5', 'testSession1', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['MON6', 'testSession1', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['MON7', 'testSession1', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['MON8', 'testSession1', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['MON9', 'testSession1', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['MON10', 'testSession1', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['MON11', 'testSession1', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['MON12', 'testSession1', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['MON13', 'testSession1', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['MON14', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['MON15', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['MON16', 'testSession1', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['MON17', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['MON18', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['MON19', 'testSession1', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    ///////////////////////正在进行的session//////////////////
    /////周一
    ['MON1', 'testSession2', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['MON2', 'testSession2', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['MON3', 'testSession2', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['MON4', 'testSession2', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['MON5', 'testSession2', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['MON6', 'testSession2', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['MON7', 'testSession2', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['MON8', 'testSession2', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['MON9', 'testSession2', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['MON10', 'testSession2', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['MON11', 'testSession2', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['MON12', 'testSession2', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['MON13', 'testSession2', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['MON14', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['MON15', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['MON16', 'testSession2', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['MON17', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['MON18', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['MON19', 'testSession2', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    ///周二
    ['TUE1', 'testSession2', 2, ["BUB1"], "15:00", "15:30", "TUE-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['TUE2', 'testSession2', 2, ["BUB1"], "15:30", "16:00pm", "TUE-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['TUE3', 'testSession2', 2, ["BUB2", "BUB3"], "15:00", "15:30", "TUE-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['TUE4', 'testSession2', 2, ["BUB2", "BUB3"], "15:30", "4:00", "TUE-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['TUE5', 'testSession2', 2, ["BUB2", "BUB3"], "16:00", "16:30", "TUE-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['TUE6', 'testSession2', 2, ["CRL1"], "16:00", "16:30", "TUE-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['TUE7', 'testSession2', 2, ["CRL2", "CRL3"], "16:00", "16:30", "TUE-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['TUE8', 'testSession2', 2, ["CRL2", "CRL3"], "16:45", "17:15", "TUE-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['TUE9', 'testSession2', 2, ["GLD1"], "16:00", "16:45pm", "TUE-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['TUE10', 'testSession2', 2, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "TUE-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['TUE11', 'testSession2', 2, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "TUE-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['TUE12', 'testSession2', 2, ["GLD2", "GLD3"], "17:30", "18:15", "TUE-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['TUE13', 'testSession2', 2, ["GLD2", "GLD3"], "18:30", "19:15", "TUE-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['TUE14', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "TUE-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['TUE15', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "TUE-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['TUE16', 'testSession2', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "TUE-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['TUE17', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "TUE-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['TUE18', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "TUE-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['TUE19', 'testSession2', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "TUE-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    ['WED1', 'testSession2', 3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession2', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession2', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession2', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession2', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession2', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession2', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession2', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession2', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession2',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession2', 3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession2', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession2', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession2', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession2', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    ///////////////////////////将要注册的session///////////////////////////////
    /////周一
    ['MON1', 'testSession3', 1, ["BUB1"], "15:00", "15:30", "MON-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['MON2', 'testSession3', 1, ["BUB1"], "15:30", "16:00pm", "MON-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['MON3', 'testSession3', 1, ["BUB2", "BUB3"], "15:00", "15:30", "MON-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['MON4', 'testSession3', 1, ["BUB2", "BUB3"], "15:30", "4:00", "MON-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['MON5', 'testSession3', 1, ["BUB2", "BUB3"], "16:00", "16:30", "MON-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['MON6', 'testSession3', 1, ["CRL1"], "16:00", "16:30", "MON-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['MON7', 'testSession3', 1, ["CRL2", "CRL3"], "16:00", "16:30", "MON-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['MON8', 'testSession3', 1, ["CRL2", "CRL3"], "16:45", "17:15", "MON-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['MON9', 'testSession3', 1, ["GLD1"], "16:00", "16:45pm", "MON-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['MON10', 'testSession3', 1, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "MON-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['MON11', 'testSession3', 1, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "MON-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['MON12', 'testSession3', 1, ["GLD2", "GLD3"], "17:30", "18:15", "MON-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['MON13', 'testSession3', 1, ["GLD2", "GLD3"], "18:30", "19:15", "MON-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['MON14', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "MON-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['MON15', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "MON-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['MON16', 'testSession3', 1, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "MON-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['MON17', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "MON-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['MON18', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "MON-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['MON19', 'testSession3', 1, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "MON-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    ///周二
    ['TUE1', 'testSession3', 2, ["BUB1"], "15:00", "15:30", "TUE-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['TUE2', 'testSession3', 2, ["BUB1"], "15:30", "16:00pm", "TUE-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['TUE3', 'testSession3', 2, ["BUB2", "BUB3"], "15:00", "15:30", "TUE-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['TUE4', 'testSession3', 2, ["BUB2", "BUB3"], "15:30", "4:00", "TUE-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['TUE5', 'testSession3', 2, ["BUB2", "BUB3"], "16:00", "16:30", "TUE-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['TUE6', 'testSession3', 2, ["CRL1"], "16:00", "16:30", "TUE-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['TUE7', 'testSession3', 2, ["CRL2", "CRL3"], "16:00", "16:30", "TUE-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['TUE8', 'testSession3', 2, ["CRL2", "CRL3"], "16:45", "17:15", "TUE-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['TUE9', 'testSession3', 2, ["GLD1"], "16:00", "16:45pm", "TUE-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['TUE10', 'testSession3',2, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "TUE-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['TUE11', 'testSession3', 2, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "TUE-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['TUE12', 'testSession3', 2, ["GLD2", "GLD3"], "17:30", "18:15", "TUE-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['TUE13', 'testSession3', 2, ["GLD2", "GLD3"], "18:30", "19:15", "TUE-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['TUE14', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "TUE-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['TUE15', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "TUE-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['TUE16', 'testSession3', 2, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "TUE-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['TUE17', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "TUE-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['TUE18', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "TUE-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['TUE19', 'testSession3', 2, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "TUE-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    ///周二
    ['WED1', 'testSession3',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession3', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession3', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession3', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession3', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession3', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession3', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession3', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession3', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession3',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession3',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession3', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession3', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession3', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession3', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    //////////////////////////////////////////////////////////
    ['WED1', 'testSession4',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession4', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession4', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession4', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession4', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession4', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession4', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession4', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession4', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession4',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession4',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession4', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession4', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession4', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession4', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession4', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession4', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession4', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession4', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],

    //////////////////////////////////////////////////////////
    ['WED1', 'testSession5',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession5', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession5', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession5', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession5', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession5', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession5', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession5', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession5', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession5',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession5',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession5', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession5', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession5', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession5', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession5', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession5', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession5', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession5', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    //////////////////////////////////////////////////////////
    ['WED1', 'testSession6',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession6', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession6', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession6', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession6', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession6', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession6', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession6', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession6', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession6',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession6',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession6', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession6', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession6', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession6', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession6', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession6', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession6', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession6', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    //////////////////////////////////////////////////////////
    ['WED1', 'testSession100',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession100', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession100', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession100', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession100', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession100', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession100', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession100', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession100', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession100',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession100',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession100', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession100', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession100', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession100', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession100', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession100', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession100', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession100', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    //////////////////////////////////////////////////////////
    ['WED1', 'testSession200',3, ["BUB1"], "15:00", "15:30", "WED-BUB1 3:00-3:30pm", "Betsy", "S",'paced'],
    ['WED2', 'testSession200', 3, ["BUB1"], "15:30", "16:00pm", "WED-BUB1 3:30-4:00pm", "Betsy", "S",'paced'],
    ['WED3', 'testSession200', 3, ["BUB2", "BUB3"], "15:00", "15:30", "WED-BUB 2,3 3:00-3:30pm", "Gabriela", "S",'paced'],
    ['WED4', 'testSession200', 3, ["BUB2", "BUB3"], "15:30", "4:00", "WED-BUB 2, 3 3:30-4:00pm", "Gabriela", "S",'paced'],
    ['WED5', 'testSession200', 3, ["BUB2", "BUB3"], "16:00", "16:30", "WED-BUB 2, 3 4:00-4:30pm", "Charlie", "S",'paced'],
    ['WED6', 'testSession200', 3, ["CRL1"], "16:00", "16:30", "WED-CRL1 4:00-4:30pm", "Leslie", "S",'paced'],
    ['WED7', 'testSession200', 3, ["CRL2", "CRL3"], "16:00", "16:30", "WED-CRL 2, 3 4:00-4:30pm", "Erica", "S",'paced'],
    ['WED8', 'testSession200', 3, ["CRL2", "CRL3"], "16:45", "17:15", "WED-CRL 2, 3 4:45-5:15pm", "Erica", "S",'paced'],
    ['WED9', 'testSession200', 3, ["GLD1"], "16:00", "16:45pm", "WED-GLD1 4:00-4:45pm", "Drishtee", "L",'paced'],
    ['WED10', 'testSession200',3, ["GLD1","GLD2","GLD3"], "16:00", "16:45", "WED-GLD1,2,3 4:00-4:45pm", "Betsy", "L",'paced'],
    ['WED11', 'testSession200',3, ["GLD1","GLD2","GLD3"], "19:15", "20:00", "WED-GLD1,2,3 7:15-8:00pm", "Gabriela", "L",'paced'],
    ['WED12', 'testSession200', 3, ["GLD2", "GLD3"], "17:30", "18:15", "WED-GLD 2, 3 5:30-6:15pm", "Charlie", "L",'paced'],
    ['WED13', 'testSession200', 3, ["GLD2", "GLD3"], "18:30", "19:15", "WED-GLD 2, 3 6:30-7:15pm", "Charlie", "L",'paced'],
    ['WED14', 'testSession200', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "15:45", "16:45", "WED-SPR/RCR 3:45-4:45pm", "Nicholas", "L",'paced'],
    ['WED15', 'testSession200', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "17:00", "18:00", "WED-SPR/RCR 5:00-6:00pm", "Nicholas", "L",'paced'],
    ['WED16', 'testSession200', 3, ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3"], "18:00", "19:00", "WED-SPR/RCR 6:00-7:00pm", "Nicholas", "L",'paced'],
    ['WED17', 'testSession200', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "15:45", "16:45", "WED-CHL/MST 3:45-4:45pm", "Jimmy", "L",'paced'],
    ['WED18', 'testSession200', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "17:00", "18:00", "WED-CHL/MST 5:00-6:00pm", "Jimmy", "L",'paced'],
    ['WED19', 'testSession200', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'paced'],


    //littleStar class
    ['WED20', 'testSession200', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "littleStar WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'littleStar'],

    //Fastrack class
    ['WED21', 'testSession200', 3, ["CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3"], "18:00", "19:00", "Fastrack WED-CHL/MST 6:00-7:00pm", "Jimmy", "L",'fastrack', '10'],

  ]

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



  function insertClassesData(){
    classesDataArr.forEach(function (item) {


      console.log(item[1] +'-'+ item[0]);


      DB.Classes.insert({
        _id: item[1] +'-'+ item[0],
        programId:item[9],  //'paced','intence','littleStar','fastrack'
        sessionId: item[1],
        name: item[6],
        levels: item[3],
        day: item[2],
        startTime: App.time2num(item[4]),
        endTime: App.time2num(item[5]),



        price: 100,
        seatsTotal: 10,
        seatsRemain: 10,
        seatsMini: item[10]||0

      })

    })

  }

  function insertRegisterData() {
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

  function resetData(){
    DB.Classes.remove({})

    insertClassesData()

    insertRegisterData()

  }


  if (DB.Classes.find({}).count() === 0) {

    resetData()

  }

  calTestData.resetClasses = resetData

});