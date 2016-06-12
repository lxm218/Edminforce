const sy = {
	td : {
		textAlign : 'left'
	}
};

let Filter = class extends KUI.Page{
	getMeteorData(){
		this.m = KG.DataHelper.getDepModule();

		return {
			ready : true,
		};
	}

	render(){
		let p = {

		};



		let option = {};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<div ref="date" className="form-group">
							<label className="control-label col-xs-2">
								<span>Select Date</span>
							</label>
							<div className="col-xs-10">
								<div className="input-daterange input-group" >
									<input style={sy.td} type="text" className="input-sm form-control" name="start" />
									<span className="input-group-addon">to</span>
									<input style={sy.td} type="text" className="input-sm form-control" name="end" />
								</div>
							</div>

						</div>


					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	getRefs(){
		let sd2 = this.refs.date;
		return {
			start : $(sd2).find('input').eq(0),
			end : $(sd2).find('input').eq(1),
			date : sd2
		};
	}

	componentDidMount(){
		super.componentDidMount();

		let {date} = this.getRefs();
		$(date).find('.input-daterange').datepicker({});
	}

	getValue(){
		let {start, end} = this.getRefs();

		let rs = {
			startDate : start.val(),
			endDate : end.val()
		};


		return rs;
	}
};

KUI.Report_ClassStudent_ProgramRegistration = class extends KUI.Page{

	constructor(p){
		super(p);

		this.m = KG.DataHelper.getDepModule();

		this.state = {
			result : null
		};

	}

	getMeteorData(){
		return {
			ready : true
		};
	}

	getStateData(){

		KG.DataHelper.callMeteorMethod('getProgramRegistrationDailyReport', [{}], {
			success : function(rs){
console.log(rs);
			}
		});
	}

	runOnceAfterDataReady(){
		this.getStateData();
	}

	render(){


		return (
			<RC.Div>
				<Filter ref="filter" />
				<hr/>
				{this.renderTable()}
			</RC.Div>
		);
	}

	renderTable(){
		if(!this.state.result){
			return null;
		}
		if('loading' === this.state.result){
			return util.renderLoading();
		}

		console.log(this.state.result);

		return (
			<RC.Div></RC.Div>
		);
	}

};