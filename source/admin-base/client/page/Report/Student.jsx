let Filter = class extends KUI.Page{

	getMeteorData(){
		let x = Meteor.subscribe('EF-AdminUser', {
			query : {
				role : 'teacher'
			}
		});

		return {
			ready : x.ready(),
			teacher : KG.get('EF-AdminUser').getDB().find().fetch()
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		let p = {
			date : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-4',
				ref : 'date',
				label : 'Select Date'
			},
			teacher : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-4',
				ref : 'teacher',
				label : 'Select Teacher'
			}
		};

		let option = {
			teacher : [{nickName:'All'}].concat(this.data.teacher)
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<RB.Input type="text" {... p.date} />

						<RB.Input type="select" {... p.teacher}>
							{
								_.map(option.teacher, (item, index)=>{
									return <option key={index} value={item.nickName}>{item.nickName}</option>;
								})
							}
						</RB.Input>
					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	getRefs(){
		return {
			date : this.refs.date,
			teacher : this.refs.teacher
		};
	}

	runOnceAfterDataReady(){

		let {date} = this.getRefs();
		$(date.getInputDOMNode()).datepicker({});
	}

	getValue(){
		let {date, teacher} = this.getRefs();


		let rs = {
			date : $(date.getInputDOMNode()).datepicker('getDate')
		};

		if(teacher.getValue() !== 'All'){
			rs.teacher = teacher.getValue();
		}

		return rs;
	}
};


KUI.Report_Student = class extends KUI.Page{
	constructor(p){
		super(p);

		this.state = {
			loadingResult : false,
			result : []
		};
	}

	getMeteorData(){
		return {
			ready : true
		};
	}

	runOnceAfterDataReady(){


	}

	render(){
		return (
			<RC.Div>
				<h3>Student Report</h3>
				<hr/>
				<Filter ref="filter" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Show Result"></KUI.YesButton>
				</RC.Div>
				<hr/>
				{this.renderResultTable()}
			</RC.Div>
		);
	}



	search(){
		let data = this.refs.filter.getValue();

		this.setState({
			loadingResult : true
		});
		KG.DataHelper.callMeteorMethod('getStudentReport', [data], {
			context : this,
			success : function(rs){
				console.log(rs);
				this.setState({
					loadingResult : false,
					result : rs
				});
			}
		});
	}

	renderResultTable(){
		if(this.state.loadingResult){
			return util.renderLoading();
		}

		if(_.keys(this.state.result).length < 1){
			return null;
		}



		return (
			<RC.Div>
			{
				_.map(_.values(this.state.result), (item, index)=>{
					return this.renderEachTable(item, index);
				})
			}
			</RC.Div>
		);
	}

	renderEachTable(item, index){
		let classData = item.classData,
			list = item.list;

		if(list.length < 1){
			return null;
		}

		const titleArray = [
			{
				title : 'Student',
				key : 'student.name'
			},
			{
				title : 'Age',
				key : 'student.age'
			},
			{
				title : 'Gender',
				key : 'student.profile.gender'
			},
			{
				title : 'Type',
				key : 'type'
			}
		];

		let sy = {
			marginBottom : '30px'
		};


		return (
			<RC.Div style={sy} key={index}>
				<h4>{classData.nickName}</h4>
				<p>Teacher : {classData.teacher}</p>
				<KUI.Table
					style={{}}
					list={list}
					title={titleArray}
					ref=""></KUI.Table>
			</RC.Div>
		);
	}
};