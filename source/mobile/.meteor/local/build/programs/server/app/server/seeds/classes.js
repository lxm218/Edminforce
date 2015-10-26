(function(){Meteor.startup(function () {
  DB.Classes.remove()

  if (DB.Classes.find({}).count() === 0) {

    //////////////////////////////////
    //构造session1的class数据

    //DB.Classes.insert({
    //    _id:  'class1',
    //    sessionId: 'testSession2',
    //    name: '' + 'class1',
    //
    //    level: 'BUB I',
    //    day:1,
    //    startTime:App.time2num('9:10'),
    //    endTime:App.time2num('11:00'),
    //
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: ['swimmer1','swimmer2']   //swimmer1已选‘class1’
    //});
    //
    //DB.Classes.insert({
    //    _id: 'class2',
    //    sessionId: 'testSession2',
    //    name: '' + 'class2',
    //
    //    level: 'BUB I',
    //    day:1,
    //    startTime:App.time2num('14:10'),
    //    endTime:App.time2num('16:00'),
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: ['swimmer1','swimmer2']
    //});
    //
    //DB.Classes.insert({
    //    _id:  'class3',
    //    sessionId: 'testSession2',
    //    name: '' + 'class3',
    //
    //    level: 'BUB I',
    //    day:1,
    //    startTime:App.time2num('15:10'),
    //    endTime:App.time2num('17:00'),
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: []   //swimmer1已选‘class1’
    //});


    ////////////////////////////////////////////
    //构造session2的class数据
    //session2 和session的class一样时才可以bookTheSameTime

    //DB.Classes.insert({
    //    _id:  'testSession2class1',
    //    sessionId: 'testSession2',
    //    name: 'testSession2' + 'class1',
    //
    //    level: 'BUB III',
    //    day:1,
    //    startTime:App.time2num('9:10'),
    //    endTime:App.time2num('11:00'),
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: []   //swimmer1已选‘class1’
    //});
    //
    //DB.Classes.insert({
    //    _id: 'testSession2class2',
    //    sessionId: 'testSession2',
    //    name: 'testSession2' + 'class2',
    //
    //    level: 'BUB III',
    //    day:2,
    //    startTime:App.time2num('14:10'),
    //    endTime:App.time2num('16:00'),
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: []
    //});
    //
    //DB.Classes.insert({
    //    _id:  'testSession2class3',
    //    sessionId: 'testSession2',
    //    name: 'testSession2' + 'class3',
    //
    //    level: 'BUB III',
    //    day:3,
    //    startTime:App.time2num('15:10'),
    //    endTime:App.time2num('17:00'),
    //
    //    seatsTotal:10,
    //    seatsRemain:10,
    //
    //    startDate: new Date(),
    //    endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //    frequency: "2/week",
    //    type: 'ss',
    //    availableSeats: 10,
    //    price: 100,
    //    students: []   //swimmer1已选‘class1’
    //});

    //var times=["10:00","11:00","13:00","15:00","17:00"]
    //var days=[1,2,3,4,5,6,7]
    //var times = ["15:00"]
    //var days = [1, 3]
    //App.Config.classLevels.forEach(function (level, i, o) {
    //  days.forEach(function (day, i, o) {
    //    times.forEach(function (time, i, o) {
    //      DB.Classes.insert({
    //        _id: day + "_" + level + "_" + time.replace(':', "_") + '_testSession1',
    //        sessionId: 'testSession1',
    //        name: day + "_" + level + "_" + time,
    //
    //        level: level,
    //        day: day,
    //        startTime: App.time2num(time),
    //        endTime: App.time2num(time) + 30 * 60 * 1000,  //30minutes
    //
    //        seatsTotal: 10,
    //        seatsRemain: 10,
    //
    //        price: 100,
    //      });
    //
    //    })
    //  })
    //
    //})
    //
    //
    //App.Config.classLevels.forEach(function (level, i, o) {
    //  days.forEach(function (day, i, o) {
    //    times.forEach(function (time, i, o) {
    //      DB.Classes.insert({
    //        _id: day + "_" + level + "_" + time.replace(':', "_") + '_testSession2',
    //        sessionId: 'testSession2',
    //        name: day + "_" + level + "_" + time,
    //
    //        level: level,
    //        day: day,
    //        startTime: App.time2num(time),
    //        endTime: App.time2num(time) + 30 * 60 * 1000,  //30minutes
    //
    //        seatsTotal: 10,
    //        seatsRemain: 10,
    //
    //        startDate: new Date(),
    //        endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //        frequency: "2/week",
    //        type: 'ss',
    //        availableSeats: 10,
    //        price: 100,
    //        students: []   //swimmer1已选‘class1’
    //      });
    //
    //    })
    //  })
    //
    //})
    //
    //
    //App.Config.classLevels.forEach(function (level, i, o) {
    //  days.forEach(function (day, i, o) {
    //    times.forEach(function (time, i, o) {
    //      DB.Classes.insert({
    //        _id: day + "_" + level + "_" + time.replace(':', "_") + '_testSession3',
    //        sessionId: 'testSession3',
    //        name: day + "_" + level + "_" + time,
    //
    //        level: level,
    //        day: day,
    //        startTime: App.time2num(time),
    //        endTime: App.time2num(time) + 30 * 60 * 1000,  //30minutes
    //
    //        seatsTotal: 10,
    //        seatsRemain: 10,
    //
    //        startDate: new Date(),
    //        endDate: new Date(+new Date() + (1000 * 60 * 60 * 24 * 90  )),//90天后结束
    //        frequency: "2/week",
    //        type: 'ss',
    //        availableSeats: 10,
    //        price: 100,
    //        students: []   //swimmer1已选‘class1’
    //      });
    //
    //    })
    //  })
    //
    //})


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



  }
});
}).call(this);

//# sourceMappingURL=classes.js.map
