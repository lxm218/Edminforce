const sy = {
	td : {
		textAlign : 'left'
	}
};

let Filter = class extends KUI.Page{
	getMeteorData(){

		let sx = Meteor.subscribe(util.getModuleName('Session')),
			tx = Meteor.subscribe(util.getModuleName('AdminUser'), {
				query : {
					role : 'teacher'
				}
			});

		return {
			ready : sx.ready() && tx.ready()
		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}

		let p = {
			session : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-8',
				ref : 'session',
				label : 'Select Session'
			},
			teacher : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-8',
				ref : 'teacher',
				label : 'Select Teacher'
			}
		};



		let option = {
			session : this.m.Session.getDB().find().fetch(),
			teacher : this.m.AdminUser.getDB().find({role : 'teacher'}).fetch()
		};

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

						<RB.Input type="select" {... p.session}>
							<option value="-1">All</option>
							{
								_.map(option.session, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>

						<RB.Input type="select" {... p.teacher}>
							<option value="-1">All</option>
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
		let sd2 = this.refs.date;
		return {
			start : $(sd2).find('input').eq(0),
			end : $(sd2).find('input').eq(1),
			date : sd2
		};
	}

	runOnceAfterDataReady(){

		let {date} = this.getRefs();
		$(date).find('.input-daterange').datepicker({});
	}

	getValue(){
		let {start, end} = this.getRefs();

		let rs = {
			startDate : start.val(),
			endDate : end.val()
		};

		if(this.refs.session.getValue() !== '-1'){
			rs.session = this.refs.session.getValue();
		}
		if(this.refs.teacher.getValue() !== '-1'){
			rs.teacher = this.refs.teacher.getValue();
		}


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
		let x = Meteor.subscribe('EF-Program');

		return {
			ready : x.ready(),
			programList : this.m.Program.getDB().find({}, {sort : {displayOrder:1}}).fetch()
		};
	}

	getStateData(){

		let self = this;
		self.setState({result : 'loading'});

		let param = this.refs.filter.getValue();
		KG.DataHelper.callMeteorMethod('getProgramRegistrationDailyReport', [param], {
			success : function(rs){
console.log(rs);
				self.setState({
					result : rs
				});
			}
		});
	}

	runOnceAfterDataReady(){

	}

	showExportButton(){
		if(this.state.result != null) {
			return (<KUI.NoButton onClick={this.exportResult.bind(this)} style={{marginLeft : '15px'}} label="Export Report" ></KUI.NoButton>);
		}
	}

	exportResult(){
		let list = []
		for (var i = 0; i != this.state.result.length; i++) {
			var res = this.state.result[i]
			var item = {}
			item['Date'] = res['date']
			item['Art Exploration'] = res.data.ap_art.count
			item['Test'] = res.data.QPG6NDtGmFRDtzFpP.count
			item['Art Foundation'] = res.data.art_foundation.count
			item['Art Advancement'] = res.data.art_advancement.count
			item['Art AP'] = res.data.art_exploration.count
			item['Digital Art'] = res.data.digital_art.count
			item['Clay'] = res.data.clay.count
			item['Total'] = res.data.total
			list.push(item)
		}

		let csv = Papa.unparse(list)
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"})
		saveAs(blob, "FinancialReport.csv")

	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		return (
			<RC.Div>
				<h3>Program Registration Report</h3>
				<hr/>
				<Filter ref="filter" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)}
					              label="Search"></KUI.YesButton>
					{this.showExportButton()}
				</RC.Div>
				<hr/>
				{this.renderTable()}
			</RC.Div>
		);
	}

	search(){
		let param = this.refs.filter.getValue();
		if(!param.startDate || !param.endDate){
			util.toast.showError('Please select date');
			return false;
		}

		this.getStateData();
	}

	renderTable(){
		if(!this.state.result){
			return null;
		}
		if('loading' === this.state.result){
			return util.renderLoading();
		}

		let self = this;

		let list = this.state.result;

		let titleArray = [
			{
				title : 'Date',
				key : 'date'
			}
		];

		let tt = {
			total : 0
		};
		_.each(this.data.programList, (item)=>{
			titleArray.push({
				title : item.name,
				reactDom : function(doc){
					return doc.data[item._id].count;
				}
			});

			tt[item._id] = {
				count : 0
			};
		});
		titleArray.push({
			title : 'Total',
			reactDom : function(doc){
				return doc.data.total;
			}
		});

		_.each(list, (l)=>{
			_.each(self.data.programList, (p)=>{
				tt[p._id].count += l.data[p._id].count;
			});

			tt['total'] += l.data.total;
		});

		list.push({
			date : 'Total',
			data : tt
		});


		return (
			<KUI.Table
				style={{}}
				list={list}
				title={titleArray}
				ref="table"></KUI.Table>
		);
	}

};