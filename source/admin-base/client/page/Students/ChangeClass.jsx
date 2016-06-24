let MSG = 'EF-Student-ChangeClass-msg';

let FilterBox = class extends KUI.Page{

	getMeteorData(){
		this.module = KG.DataHelper.getDepModule();

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
				ref : 'week',
				label : 'Select Weekday'
			}
		};

		let week_option = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<RB.Input onChange={function(){}} type="select" {... p.program}>
							{
								_.map(this.data.programList, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
						<RB.Input onChange={function(){}} type="select" {... p.date}>
							{
								_.map(week_option, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>

						<RC.Div style={{textAlign:'right'}}>
							<KUI.YesButton onClick={this.search.bind(this)} label="Search"></KUI.YesButton>
						</RC.Div>
					</RB.Col>
				</RB.Row>
			</form>
		);
	}
	search(){
		let {program, week} = this.getRefs();
		let query = {
			programID : program.getValue(),
			dayOfClass : week.getValue()
		};
		console.log(query)
		util.message.publish(MSG, {
			query : query
		});

	}
	getRefs(){
		return {
			program : this.refs.program,
			week : this.refs.week
		};
	}
};

let ResultTable = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			query : null
		};
	}

	getMeteorData(){
		this.module = KG.DataHelper.getDepModule();

		if(!this.state.query){
			return {
				ready : true,
				classList : []
			};
		}

		let query = _.clone(this.state.query);


		let x2 = this.module.Class.subscribeClassByQuery(query, {
			pageSize : 1000
		});
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
				title : 'Teacher',
				key : 'teacher'
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
					return <RC.Div style={{textAlign:'center'}}><input value={index} type="radio" name="change_class" /></RC.Div>;
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
				classID : this.data.classList[i]._id
			};
		}

		return null;

	}
};


KUI.Student_ChangeClass = class extends KUI.Page{

	constructor(p){
		super(p);

		this.state = {
			changeResult : null
		};
	}

	getMeteorData(){
		this.module = KG.DataHelper.getDepModule();
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
			query : {
				_id : csData.studentID
			}
		});
		let cx = Meteor.subscribe('EF-Class', {
			query : {
				_id : csData.classID
			}
		});

		let cxData = this.module.Class.getAll({
			_id : csData.classID
		})[0];

		if(!cxData){
			return {ready : false};
		}

		return {
			ready : sx.ready() && cx.ready(),
			id : csID,
			classData : cxData,
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
					<KUI.YesButton onClick={this.changeClass.bind(this)} label="Change Class"></KUI.YesButton>
				</RC.Div>
				{this.renderChangeClass()}
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
				list={[this.data.classData]}
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
			this.setState({
				changeResult : null
			});
		});
	}

	changeClass(){
		let self = this;
		let m = this.module;
		let data = this.refs.result.getSelectValue();

		if(!data){
			util.toast.showError('You must select a class to change');
			return false;
		}

		//data.studentID = this.data.student._id;

		m.Class.callMeteorMethod('checkCanBeRegister', [data.classID], {
			success : function(flag){
				if(flag){
					self.calculateTuitionDifferent(data.classID);
				}
				else{
					util.toast.showError('This class can not be register');
				}
			}
		});
	}

	calculateTuitionDifferent(toClassID){
		var self = this;
		let data = {
			fromClassID : this.data.classData._id,
			toClassID : toClassID,
			studentID : this.data.student._id
		};

		this.module.Class.callMeteorMethod('changeClassForReady', [data], {
			success : function(rs){

				self.setState({
					changeResult : rs
				});
			}
		});
	}

	renderChangeClass() {
		if (!this.state.changeResult) {
			return null;
		}

		if(this.state.changeResult === 'loading'){
			return util.renderLoading();
		}

		let h,
			d = this.state.changeResult,
			tuition = d.tuitionDifferent;

		let titleArray = [
			{
				title : 'Item',
				key : 'key'
			},
			{
				title : 'Amount',
				reactDom(doc){
					return util.addDollerSign(doc.value);
				}
			}
		],
			list = [{key : 'Tuition Difference', value : tuition}];
		let table = <KUI.Table
			style={{}}
			list={list}
			title={titleArray}
			ref=""></KUI.Table>;

		if (tuition > 0) {
			h = (
				<RC.Div>
					<KUI.Comp.SelectPaymentWay ref="payway" />
					<RC.Div style={{textAlign:'right'}}>
						<KUI.YesButton onClick={this.payNow.bind(this)} label="Pay Now"></KUI.YesButton>
					</RC.Div>
				</RC.Div>
			);
		}
		else if(tuition === 0){
			h = (
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.confirmChangeClass.bind(this)} label="Confirm"></KUI.YesButton>
				</RC.Div>
			);
		}
		else{
			h = (
				<RC.Div>
					<RB.Input onChange={function(){}} ref="cca" name="cacc" type="radio" label="Cash" />
					<RB.Input onChange={function(){}} ref="ccb" name="cacc" type="radio" label="School Credit" />
					<RC.Div style={{textAlign:'right'}}>
						<KUI.YesButton onClick={this.refundChangeClass.bind(this)} label="Refund"></KUI.YesButton>
					</RC.Div>
				</RC.Div>
			);
		}

		return (
			<RC.Div>
				<hr/>
				<p>{this.data.student.name} : {d.fromClass.nickName} Change To {d.toClass.nickName}</p>
				{table}
				{h}
			</RC.Div>
		);
	}
	confirmChangeClass(){
		this.changeToNewClass({
			paymentType : 'cash'
		}, function(nid, json){
			util.goPath('/student/'+json.studentID);
		});
	}
	refundChangeClass(){
		let cca = $(this.refs.cca.getInputDOMNode()).prop('checked'),
			ccb = $(this.refs.ccb.getInputDOMNode()).prop('checked');
		let sc = 'cash';
		if(ccb){
			sc = 'school credit';
		}

		this.changeToNewClass({
			paymentType : sc
		}, function(nid, json){
			util.goPath('/student/'+json.studentID);
		});
	}

	payNow(){
		let way = this.refs.payway.getValue();
		console.log(way);
		if(way === 'cash' || way === 'check'){
			this.changeToNewClass({
				paymentType : way
			}, function(nid, json){
				util.goPath('/student/'+json.studentID);
			});
		}
		else{
			this.changeToNewClass({
				paymentType : way
			}, function(nid, json){
				//TODO go to payment page
				util.goPath('/student/changeclasspay/'+nid);
			});
		}

	}

	changeToNewClass(opts, callback){
		let data = {
			ClassStudentID : this.data.id,
			toClassID : this.state.changeResult.toClass._id,
			studentID : this.data.student._id,
			amount : this.state.changeResult.tuitionDifferent,
			paymentType : opts.paymentType
		};
		this.module.Class.callMeteorMethod('changeClass', [data], {
			success : function(rs){
				if(rs){
					console.log(rs);
					callback(rs, data);
				}
			},
			error : function(e){
				util.toast.showError(e.reason);
			}
		});
	}

};