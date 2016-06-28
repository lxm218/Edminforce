
KUI.ClassLevel_Add_Comp = class extends RC.CSS{

	render(){
		var p = {
			name : {
				//labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-12',
				ref : 'name',
				placeholder : 'Level Name'
			},
			desc : {
				//labelClassName : 'col-xs-3',
				wrapperClassName : 'col-xs-12',
				ref : 'desc',
				placeholder : 'Level Description'
			},
			sort : {
				wrapperClassName : 'col-xs-6',
				ref : 'sort',
				placeholder : 'Level Order'
			}
		};

		const style = {

		};

		return (
			<RC.Div style={style}>
				<RB.Row>
					<RB.Col md={12} mdOffset={0}>
						<form className="form-horizontal">

							<RB.Input type="text" {... p.name} />
							<RB.Input type="text" {... p.sort} />
							<RB.Input type="textarea" {... p.desc} >

							</RB.Input>

						</form>
					</RB.Col>
				</RB.Row>
			</RC.Div>
		);
	}

	getValue(){
		let data = {
			name : this.refs.name.getValue(),
			description : this.refs.desc.getValue() || '',
			order : parseInt(this.refs.sort.getValue(), 10) || 0
		};

		return data;
	}

	setDefaultValue(data){
		this.refs.name.getInputDOMNode().value = data.name;
		this.refs.desc.getInputDOMNode().value = data.description;
		this.refs.sort.getInputDOMNode().value = data.order;
	}
};

KUI.ClassLevel_Add = class extends RC.CSS{

	render(){
		return (
			<RC.Div>
				<h3>Add Class Level</h3>
				<hr/>
				<KUI.ClassLevel_Add_Comp ref="form" />
				<div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
				</div>
			</RC.Div>
		);
	}

	save(){
		let data = this.refs.form.getValue();

		let m = KG.DataHelper.getDepModule();

		m.ClassLevel.getDB().insert(data, function(error, rs){
			console.log(error, rs);
			if(error){
				util.toast.showError(error.toString());
				return;
			}

			util.goPath('/program/classlevel');
		});

	}
};

KUI.ClassLevel_Edit = class extends KUI.Page{
	getMeteorData(){
		this.m = KG.DataHelper.getDepModule();

		return {
			ready : true,
			id : FlowRouter.getParam('id')
		};

	}
	render(){
		return (
			<RC.Div>
				<h3>Edit Class Level</h3>
				<hr/>
				<KUI.ClassLevel_Add_Comp ref="form" />
				<div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
				</div>
			</RC.Div>
		);
	}

	runOnceAfterDataReady(){
		let self = this;
		self.m.ClassLevel.callMeteorMethod('getAllByQuery', [{_id:this.data.id}], {
			success : function(list){
				console.log(list);
				self.refs.form.setDefaultValue(list[0]);
			}
		});
	}

	save(){
		let data = this.refs.form.getValue();

		let m = KG.DataHelper.getDepModule();

		m.ClassLevel.getDB().update({_id : this.data.id}, {$set : data}, function(error, rs){
			console.log(error, rs);
			if(error){
				util.toast.showError(error.toString());
				return;
			}

			util.goPath('/program/classlevel');
		});
	}
};