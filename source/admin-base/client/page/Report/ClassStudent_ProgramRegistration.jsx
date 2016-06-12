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
		let x = Meteor.subscribe('EF-Program');

		return {
			ready : x.ready(),
			programList : this.m.Program.getDB().find().fetch()
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

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}
		return (
			<RC.Div>
				<Filter ref="filter" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)}
					              label="Search"></KUI.YesButton>
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