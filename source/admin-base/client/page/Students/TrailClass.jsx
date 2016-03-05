let MSG = 'EF-Student-TrailClass-msg';

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
				wrapperClassName : 'col-xs-4',
				ref : 'program',
				label : 'Select Program'
			},
			date : {
				labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-4',
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
				reactDom(doc){
					return <RC.Div style={{textAlign:'center'}}><input type="checkbox" /></RC.Div>;
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
};


KUI.Student_TrailClass = class extends KUI.Page{
	getDepModule(){
		return {
			Student : KG.get('EF-Student'),
			Class : KG.get('EF-Class'),
			Program : KG.get('EF-Program')
		};
	}

	getMeteorData(){
		this.module = this.getDepModule();
		let studentID = FlowRouter.getParam('studentID'),
			x = Meteor.subscribe('EF-Student', {
				query : {_id : studentID}
			});
		return {
			ready : x.ready(),
			student : this.module.Student.getAll()[0]
		};
	}


	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		return (
			<RC.Div>
				<h3>Trail Class for {this.data.student.name}</h3>
				<hr/>
				<FilterBox ref="filter" />
				<hr/>
				<ResultTable ref="result" />
			</RC.Div>
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

};