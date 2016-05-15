/**
 * Created on 5/15/16.
 */

let testClassesData =  [{
		name : 'Test Class One',
		length : '60 min',
		teacher : 'Jason',
		schedule : {
			day : 'Mon',
			time : '09:00AM'
		},
		status : 'Active',
		tuition : {
			type : 'total',
			money : '200$'
		},
		maxStudent : 3,
		trialStudent : 1,
		maxAgeRequire: 20,
		programID : 'null',
		sessionID : 'null',
		numberOfClass : 10
	},
	{
		name : 'Test Class One',
		length : '60 min',
		teacher : 'Jason',
		schedule : {
			day : 'Sat',
			time : '09:00PM'
		},
		status : 'Active',
		tuition : {
			type : 'total',
			money : '200$'
		},
		maxStudent : 3,
		trialStudent : 1,
		maxAgeRequire: 20,
		programID : 'null',
		sessionID : 'null',
		numberOfClass : 10
	}]



KUI.Class_calendar = React.createClass ({

	mixins: [ReactMeteorData],

	getInitialState(){
		return {
			query : {
				programID:"ap_art",
				sessionID:"pXcLfgxhiuYM9kkMw",
				status:"Active",
			},
			//page : 1,
			//refresh : false
		};
	},

	getProgramData(){

		let m = KG.get('EF-Program');
		return m.getDB().find({}, {sort:{
			createTime : -1
		}}).fetch();
	},
	getSessionData(){
		let m = KG.get('EF-Session');
		return m.getDB().find({}, {
			sort : {
				updateTime : -1
			}
		}).fetch();
	},

	getMeteorData(){

		let query =this.state.query
		let x = Meteor.subscribe('EF-Class-By-Query', query,{page : 1});


		let db = KG.get('EF-Class').getDB()

		return {
			list:db.find({}).fetch()
		}
	},

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


				<div ref="calendar">


				</div>

			</RC.Div>
		);
	},


	//////////////////////////

	//moment().format('ddd') Sun
	getEventsByDay(m, classesData){

		let arr=[]
		classesData.forEach(function(classItem){
			if(classItem.schedule.day == m.format('ddd')){
				let start = moment(classItem.schedule.time,['hh:mmA'])
				start.year(m.year())
				start.month(m.month())
				start.date(m.date())


				// todo 考虑所有可能
				let unitMap = {
					min:"minutes",
					hr:"hours",
				}
				let end = moment(start).add(classItem.length,'minutes')

				let event ={
					start:start,
					end:end,
					title:classItem.name
				}
				arr.push(event)

			}
		})

		return arr
	},

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

	},


	componentWillUpdate(nextProps, nextState){
		let self =this;


		//$(this.refs.calendar).fullCalendar('removeEvents')
		//$(this.refs.calendar).fullCalendar( 'addEventSource', self.getClassesEvents(self.start, self.end, self.data.list) )
		//debugger
	},
	componentDidMount(){
		let self =this

		$(this.refs.calendar).fullCalendar({

			events: function(start, end, timezone, callback) {
				//console.log(start, end, timezone, callback)

				self.start= start
				self.end= end

				//let events =self.getClassesEvents(start, end, self.data.list||[])
				let events =self.getClassesEvents(start, end, testClassesData)

				//debugger

				callback(events)

			}

		})

	}




})