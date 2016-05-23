/**
 * Created on 5/15/16.
 */

//let testClassesData =  [
//	{
//		"_id": "iiPNA4cwmsdyWM4F8",
//		"programID": "ap_art",
//		"sessionID": "pXcLfgxhiuYM9kkMw",
//		"status": "Active",
//		"length": "2 hr",
//		"teacher": "Eli",
//		"schedule": {
//			"day": "Wed",
//			"time": "06:30PM"
//		},
//		"tuition": {
//			"type": "class",
//			"money": "40"
//		},
//		"maxStudent": 9,
//		"minStudent": 0,
//		"trialStudent": 2,
//		"minAgeRequire": 0,
//		"maxAgeRequire": 100,
//		"makeupStudent": 1,
//		"makeupClassFee": 5,
//		"genderRequire": "All",
//		"makeup": {},
//		"trial": {},
//		"numberOfRegistered": 0,
//		"level": "Beginner",
//		"createTime": "2016-05-13T17:07:13.114Z",
//		"updateTime": "2016-05-21T17:50:01.801Z",
//		"program": {
//			"_id": "ap_art",
//			"name": "AP Art",
//			"description": "Need to add",
//			"displayOrder": 0,
//			"createTime": "2016-05-13T04:16:42.389Z",
//			"updateTime": "2016-05-13T04:16:42.389Z"
//		},
//		"session": {
//			"_id": "pXcLfgxhiuYM9kkMw",
//			"name": "Fall 2016",
//			"startDate": "2016-09-05T07:00:00.000Z",
//			"endDate": "2016-12-18T08:00:00.000Z",
//			"registrationStartDate": "2016-05-13T07:00:00.000Z",
//			"registrationStatus": "Yes",
//			"blockOutDay": [
//				"2016-11-24T08:00:00.000Z",
//				"2016-11-25T08:00:00.000Z"
//			],
//			"registrationEndDate": "2016-12-18T08:00:00.000Z",
//			"createTime": "2016-05-13T17:07:06.396Z",
//			"updateTime": "2016-05-13T17:07:06.396Z"
//		}
//	}]


let  PAGE_SIZE_CLASS = 999



KUI.Class_calendar = class extends RC.CSSMeteorData{

	constructor(p){
		super(p);

		this.state = {
			query : null,
			page : 1,
			refresh : false
		};

		this.m = KG.DataHelper.getDepModule();
	}
	//mixins: [ReactMeteorData],
	//
	//getInitialState(){
	//	return {
	//		query : {
	//			programID:"ap_art",
	//			sessionID:"pXcLfgxhiuYM9kkMw",
	//			status:"Active",
	//		},
	//		//page : 1,
	//		//refresh : false
	//
	//		events:[]
	//	};
	//}

	getProgramData(){

		let m = KG.get('EF-Program');
		return m.getDB().find({}, {sort:{
			createTime : -1
		}}).fetch();
	}
	getSessionData(){
		let m = KG.get('EF-Session');
		return m.getDB().find({}, {
			sort : {
				updateTime : -1
			}
		}).fetch();
	}

	getMeteorData(){
		let query = this.state.query;
		let x1 = null;
		if(query){

			x1 = KG.get('EF-Class').subscribeClassByQuery(query, {
				pageSize : PAGE_SIZE_CLASS,
				pageNum : this.state.page
			});
		}
		let x2 = Meteor.subscribe('EF-Program', {});
		x3 = Meteor.subscribe('EF-Session', {
			query : {
				registrationStatus : 'Yes'
			}
		});
		let x4 = Meteor.subscribe('EF-AdminUser', {
			query : {
				role : 'teacher'
			}
		});

		if(!x2.ready() || !x3.ready() || !x4.ready()) return {ready : false};


		let list = [];
		if(x1){
			list = x1.data;
			console.log(x1.ready(), list);
		}


		return {
			ready : x1?x1.ready():true,
			list : list,
			count : x1?x1.count:0
		};
	}

	getSearchBox(){

		let p = {
			program : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'program',
				label : 'Program'
			},
			session : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'session',
				label : 'Session'
			},
			status : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'status',
				label : 'Status'
			},
			teacher : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'teacher',
				label : 'Teacher'
			},
			//day : {
			//	labelClassName : 'col-xs-4',
			//	wrapperClassName : 'col-xs-8',
			//	ref : 'day',
			//	label : 'Day Of Class'
			//}
		};

		let option = {
			program : this.getProgramData(),
			session : this.getSessionData(),
			status : KG.get('EF-Class').getDBSchema().schema('status').allowedValues,
			//day : KG.get('EF-Class').getDBSchema().schema('schedule.day').allowedValues,
			teacher : []
		};

		option.teacher = this.m.AdminUser.getAll({});


		return (
			<RB.Row>
				<form className="form-horizontal">
					<RB.Col md={6} mdOffset={0}>
						<RB.Input type="select" {... p.program}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.program, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input type="select" {... p.teacher}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.teacher, (item, index)=>{
									return <option key={index} value={item.nickName}>{item.nickName}</option>;
								})
							}
						</RB.Input>

						{
							//<RB.Input type="select" {... p.day}>
							//	<option key={-1} value="all">All</option>
							//	{
							//		_.map(option.day, (item, index)=>{
							//			return <option key={index} value={item}>{item}</option>;
							//		})
							//	}
							//</RB.Input>
						}


					</RB.Col>

					<RB.Col md={6} mdOffset={0}>
						<RB.Input type="select" {... p.session}>
							<option key={-1} value="all">All</option>
							{
								_.map(option.session, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input type="select" {... p.status}>
							{
								_.map(option.status, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>

					</RB.Col>
				</form>
			</RB.Row>
		);
	}

	//getMeteorData(){
	//
	//	let query =this.state.query
	//
	//	let  classes = Meteor.subscribe('EF-Class', query);
	//
	//	return {
	//		ready:classes.ready(),
	//		list:KG.get('EF-Class').getDB().find(query).fetch()
	//	}
	//}

	render(){

		if(!this.data.ready){
			//return util.renderLoading();
		}

		const sy = {
			rd : {
				textAlign : 'right'
			}
		};

		return (
			<RC.Div>

				{this.getSearchBox()}
				<RC.Div style={sy.rd}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
				</RC.Div>

				<hr/>
				{this.data.ready?'':<div style={{textAlign:'center'}}>loading {this.data.list && this.data.list.length}</div>}

				{this.state.query ? <p>Search Result : {this.data.count} matches</p> : null}

				<div ref="calendar">
				</div>


			</RC.Div>
		);


	}
	search(){
		let program = this.refs.program,
			session = this.refs.session,
			teacher = this.refs.teacher,
			status = this.refs.status
			//day = this.refs.day;
		let query = {
			programID : program.getValue(),
			sessionID : session.getValue(),
			status : status.getValue(),
			//'schedule.day' : day.getValue()
		};
		if(query.programID === 'all'){
			delete query.programID;
		}
		if(query.sessionID === 'all'){
			delete query.sessionID;
		}
		if(query['schedule.day'] === 'all'){
			delete query['schedule.day'];
		}

		if(teacher.getValue() && teacher.getValue()!=='all'){
			query.teacher = {
				value : teacher.getValue(),
				type : 'RegExp'
			};
		}

		//if(teacher.getValue() !== 'all'){
		//    query.teacher = teacher.getValue();
		//}


		this.setState({
			query : query,
			page : 1
		});
	}


	//////////////////////////

	//moment().format('ddd') Sun
	getEventsByDay(m, classesData){

		let arr=[]
		classesData.forEach(function(classItem){
			if(
				classItem.schedule.day == m.format('ddd')  //周
				&& m.isBetween(classItem.session.startDate, classItem.session.endDate,null,'[]')  //在session的时间里

			){
				console.log(classItem.session.startDate, m.format(), classItem.session.endDate)
				let start = moment(classItem.schedule.time,['hh:mmA'])
				start.year(m.year())
				start.month(m.month())
				start.date(m.date())


				// todo 考虑所有可能
				let unitMap = {
					min:"minutes",
					hr:"hours",
				}
				let addInfo = classItem.length.split(' ')
				let end = moment(start).add(addInfo[0],unitMap[addInfo[1]])

				let event ={
					start:start,
					end:end,
					title:classItem.nickName,
					url:'program/class/detail/'+classItem._id
				}
				arr.push(event)

			}
		})

		return arr
	}

	getClassesEvents(start, end ,classesData){
		let self = this

		let dayLength = end.diff(start,'days')

		let classEvents = []

		for(let i=0;i<dayLength;i++){
			let m =  moment(start).add(i, 'days')
			let events = self.getEventsByDay(m, classesData)

			classEvents = classEvents.concat(events)
		}


		return classEvents

	}


	componentDidUpdate(nextProps, nextState){
		let self =this;


		$(this.refs.calendar).fullCalendar( 'refetchEvents' )

		//$(this.refs.calendar).fullCalendar('removeEvents')
		//$(this.refs.calendar).fullCalendar( 'addEventSource', self.getClassesEvents(self.start, self.end, self.data.list) )
		//debugger
	}


	componentDidMount(){
		let self =this

		$(this.refs.calendar).fullCalendar({
			defaultView: 'agendaWeek',
			header: {
				left: 'prev,next today',
				center: 'title',
				//right: 'month,basicWeek,basicDay'
				right: 'month,agendaWeek,agendaDay'
			},

			events: function(start, end, timezone, callback) {
				//console.log(start, end, timezone, callback)

				self.start= start
				self.end= end

				let events =self.getClassesEvents(start, end, self.data.list||[])
				//let events =self.getClassesEvents(start, end, testClassesData)

				//debugger

				callback(events)

			},
			eventClick: function(event) {
				if (event.url) {
					window.open(event.url);
					return false;
				}
			}

		})

	}




}