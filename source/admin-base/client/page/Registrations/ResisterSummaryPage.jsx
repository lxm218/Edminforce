let sy = {
	rd : {
		textAlign : 'right'
	},
	ml : {
		marginLeft : '30px'
	}
};


KUI.Registration_SummaryPage = class extends KUI.Page{
	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			summaryList : null
		};
	}

	getMeteorData(){
		this.studentID = FlowRouter.getQueryParam('studentID');
		this.classID = FlowRouter.getQueryParam('classID');



		return {
			ready : true
		};
	}

	render(){

		return (
			<RC.Div>
				<h3>Registration Summary</h3>
				<hr/>
				{this.renderSummaryTable()}
				{this.renderButton()}
			</RC.Div>
		);

	}

	runOnceAfterDataReady(){
		this.getStateData();
	}

	getStateData(){
		let self = this;
		this.setState({
			summaryList : 'loading'
		});

		this.m.ClassStudent.callMeteorMethod('getPenddingTypeList', [{
			classID : self.classID,
			studentID : self.studentID
		}], {
			success : function(rs){
				console.log(rs);
				if(rs.flag){
					self.setState({
						summaryList : rs
					});
				}
			}
		});
	}

	renderSummaryTable() {
		if ('loading' === this.state.summaryList) {
			return util.renderLoading();
		}
		if (!this.state.summaryList) {
			return null;
		}

		let self = this;
		let list = this.state.summaryList.list;

		let titleArray = [
			{
				title : 'Student',
				key : 'student.name'
			},
			{
				title : 'Class',
				key : 'class.nickName'
			},
			{
				title : 'Amount ($)',
				key : 'amount'
			},
			{
				title : '',
				reactDom(doc){

					let del = ()=>{
						self.m.ClassStudent.callMeteorMethod('removeById', [doc._id], {
							success : function(){
								self.getStateData();
							}
						});
					};

					return (
						<RC.Div style={{textAlign:'center'}}>
							<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={{}}></KUI.Icon>
						</RC.Div>
					);
				}
			}
		];

		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="ss">
			</KUI.Table>
		);

	}

	renderButton(){
		if('loading' === this.state.summaryList){
			return null;
		}
		if(!this.state.summaryList){
			return null;
		}

		let one = {
			studentID : this.studentID,
			classID : this.classID
		}

		return (
			<RC.Div style={sy.rd}>
				<p>Total Amount : {this.state.summaryList.total}</p>

				<KUI.YesButton href={`/registration/register?studentID=${one.studentID}`} style={sy.ml} label="Register More Class"></KUI.YesButton>
				<KUI.YesButton href={`/registration/register?classID=${one.classID}`} style={sy.ml} label="Register More Student"></KUI.YesButton>
				<KUI.YesButton onClick={this.submit.bind(this)} style={sy.ml} label="Check Out"></KUI.YesButton>
			</RC.Div>
		);
	}

	submit(){

	}
};