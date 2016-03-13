


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
		KG.DataHelper.callMeteorMethod('getStudentReport', [{
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
				<KUI.Table
					style={{}}
					list={list}
					title={titleArray}
					ref=""></KUI.Table>
			</RC.Div>
		);
	}
};