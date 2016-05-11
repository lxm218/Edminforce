

KUI.Student_CancelClass = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();
		this.state = {
			changeResult : null
		};
	}

	getMeteorData(){
		this.module = this.m;
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
				<h3>Cancel Class</h3>
				{this.renderClassTable()}

				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.cancelClass.bind(this)} label="Cancel Class"></KUI.YesButton>
				</RC.Div>
				{this.renderCancelClass()}
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


	cancelClass(){
		let self = this;
		let m = this.module;

		self.calculateTuitionDifferent();

	}

	calculateTuitionDifferent(){
		var self = this;
		let data = {
			classID : this.data.classData._id,
			ClassStudentID : this.data.id
		};

		this.module.Class.callMeteorMethod('cancelClassForReady', [data], {
			success : function(rs){

				self.setState({
					changeResult : rs
				});
			}
		});

	}

	renderCancelClass() {
		if (!this.state.changeResult) {
			return null;
		}

		if(this.state.changeResult === 'loading'){
			return util.renderLoading();
		}

		let h,
			d = this.state.changeResult,
			tuition = d.tuition;

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


		h = (
			<RC.Div>
				<RB.Input onChange={function(){}} ref="cca" name="cacc" type="radio" label="Cash" />
				<RB.Input onChange={function(){}} ref="ccb" name="cacc" type="radio" label="School Credit" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.refundChangeClass.bind(this)} label="Refund"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);


		return (
			<RC.Div>
				<hr/>
				<p>{this.data.student.name} : Cancel Class "{d['class'].nickName}"</p>
				{table}
				{h}
			</RC.Div>
		);
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
		}, function(flag, json){
			util.goPath('/student/'+json.studentID);
		});
	}


	changeToNewClass(opts, callback){
		let data = {
			ClassStudentID : this.data.id,
			studentID : this.data.student._id,
			amount : this.state.changeResult.tuition,
			paymentType : opts.paymentType
		};
		this.module.Class.callMeteorMethod('cancelClass', [data], {
			success : function(rs){
				if(rs){
					callback(rs, data);
				}
			}
		});
	}

};