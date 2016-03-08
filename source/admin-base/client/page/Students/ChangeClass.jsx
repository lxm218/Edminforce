let MSG = 'EF-Student-ChangeClass-msg';

let FilterBox = class extends KUI.Page{

	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program')
		};
	}
	getMeteorData(){
		this.module = this.getDepModule();

		let x = Meteor.subscribe('EF-Program');
		return {
			ready : x.ready(),
			programList : this.module.Program.getDB().find().fetch()
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		let p = {
			program : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-6',
				ref : 'program',
				label : 'Select Program'
			},
			date : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-6',
				ref : 'date',
				label : 'Select Date'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<RB.Input onChange={this.search.bind(this)} type="select" {... p.program}>
							{
								_.map(this.data.programList, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input type="text" {... p.date} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}
	search(){
		let {program, date} = this.getRefs();
		let query = {
			programID : program.getValue(),
			date : $(date.getInputDOMNode()).datepicker('getDate')
		};
		console.log(query)
		util.message.publish(MSG, {
			query : query
		});

	}
	getRefs(){
		return {
			program : this.refs.program,
			date : this.refs.date
		};
	}
	runOnceAfterDataReady(){
		let {date} = this.getRefs();
		$(date.getInputDOMNode()).datepicker({});
		$(date.getInputDOMNode()).bind('hide', this.search.bind(this));
	}
};

let ResultTable = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			query : {}
		};
	}
	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program')
		};
	}
	getMeteorData(){
		this.module = this.getDepModule();

		let query = _.clone(this.state.query);

		let date = query.date || '';
		delete query.date;
		console.log(date, query);
		let x2 = this.module.Class.getClassByDateAndQuery(date, query);
		console.log(x2);
		return {
			ready : x2.ready(),
			classList : x2.data
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		console.log(this.data.classList);

		const titleArray = [
			{
				title : 'Name',
				key : 'nickName'
			},
			{
				title : 'Trail Number',
				key : 'trialStudent'
			},
			{
				title : 'Time',
				key : 'schedule.time'
			},
			{
				title : 'action',
				style : {
					textAlign : 'center'
				},
				reactDom(doc, index){
					return <RC.Div style={{textAlign:'center'}}><input value={index} type="radio" name="trail_table" /></RC.Div>;
				}
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={this.data.classList}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

	getSelectValue(){
		let rd = util.getReactJQueryObject(this.refs.table).find('input[type="radio"]');
		let i = null;
		rd.each(function(){
			if($(this).prop('checked')){
				i = $(this).val();
				return false;
			}
		});

		if(i){
			return {
				classID : this.data.classList[i]._id,
				date : this.state.query.date
			};
		}

		return null;

	}
};


KUI.Student_ChangeClass = class extends KUI.Page{
	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program'),
			ClassStudent : KG.get('EF-ClassStudent')
		};
	}

	getMeteorData(){
		this.module = this.getDepModule();
		let csID = FlowRouter.getParam('classstudentID'),
			x = Meteor.subscribe('EF-ClassStudent', {
				query : {
					_id : csID
				}
			});

		if(!x.ready()){
			return {ready : false};
		}

		let csData = this.module.ClassStudent.getAll()[0];

		let sx = Meteor.subscribe('EF-Student', {
			_id : csData.studentID
		});
		let cx = this.module.Class.subscribeClassByQuery({
			classID : csData.classID
		});


		return {
			ready : sx.ready() && cx.ready(),
			classData : cx.data,
			student : this.module.Student.getAll()[0]
		};
	}


	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>Change Class</h3>
				{this.renderClassTable()}
				<hr/>
				<FilterBox ref="filter" />
				<hr/>
				<ResultTable ref="result" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.trail.bind(this)} label="Trail Class"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	renderClassTable(){

		const titleArray = [
			{
				title : 'Class',
				key : 'nickName'
			},
			{
				title : 'Program',
				key : 'programName'
			},
			{
				title : 'Session',
				key : 'session.name'
			},
			{
				title : 'Weekday',
				key : 'schedule.day'
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={this.data.classData}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

	runOnceAfterDataReady(){
		util.message.register(MSG, (param)=>{
			console.log(param);
			this.refs.result.setState({
				query : param.query
			});
		});
	}

	trail(){
		let self = this;
		let m = this.getDepModule();
		let data = this.refs.result.getSelectValue();

		if(!data){
			util.toast.showError('You must select a class to trail');
			return false;
		}

		data.studentID = this.data.student._id;

		m.Class.callMeteorMethod('checkStudentCanBeTrailClass', [data], {
			context : this,
			success : function(json){
				KG.result.handle(json, {
					success : function(){
						self.insertTailData(data);
					},
					error : function(e){
						util.toast.showError(e.reason);
					}
				});
			}
		});
	}

	insertTailData(json){
		let data = {
			classID : json.classID,
			studentID : json.studentID,
			lessonDate : json.date,
			type : 'trail',
			status : 'checkouted'
		};

		console.log(data);
		let rs = this.module.ClassStudent.insert(data);
		console.log(rs);
		KG.result.handle(rs, {
			success : function(cid){
				//TODO how to pay?
				console.log(cid);
				util.toast.alert('Trail Class Success');
				util.goPath('/student/'+data.studentID);
			},
			error : function(e, error){
				console.log(e);
				util.toast.showError(error.statusText);
			}
		});
	}

};