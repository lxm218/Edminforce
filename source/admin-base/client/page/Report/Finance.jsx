KUI.Report_CommonFilter = class extends RC.CSS{
	render(){
		let p = {
			date : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-4',
				ref : 'date',
				label : 'Select Date'
			}
		};

		return (
			<form className="form-horizontal">
				<RB.Row>
					<RB.Col md={12}>
						<RB.Input type="text" {... p.date} />

					</RB.Col>
				</RB.Row>
			</form>
		);
	}

	getRefs(){
		return {
			date : this.refs.date
		};
	}

	componentDidMount(){
		super.componentDidMount();

		let {date} = this.getRefs();
		$(date.getInputDOMNode()).datepicker({});
	}

	getValue(){
		let {date} = this.getRefs();

		return {
			date : $(date.getInputDOMNode()).datepicker('getDate')
		}
	}
};


KUI.Report_Finance = class extends KUI.Page{
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
				<h3>Finance Report</h3>
				<hr/>
				<KUI.Report_CommonFilter ref="filter" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Show Result"></KUI.YesButton>
				</RC.Div>
				<hr/>
				{this.renderResultTable()}
			</RC.Div>
		);
	}



	search(){
		let date = this.refs.filter.getValue().date;

		this.setState({
			loadingResult : true
		});
		KG.DataHelper.callMeteorMethod('getFinanceReport', [{
			date : date
		}], {
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

		if(this.state.result.length < 1){
			return null;
		}

		const titleArray = [
			{
				title : 'Item',
				key : 'item'
			},
			{
				title : 'Value',
				key : 'value'
			}
		];

		let list = [
			{
				item : 'Date',
				value : moment(this.refs.filter.getValue().date).format(util.const.dateFormat)
			}
		];
		_.each(this.state.result[0], (item, key)=>{
			if(item > 0){
				item = '$'+item;
			}

			list.push({
				item : key,
				value : item
			});
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