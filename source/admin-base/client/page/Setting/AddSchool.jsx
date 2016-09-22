

KUI.Setting_add_school_comp = class extends KUI.Page{

	constructor(p){
		super(p);

		this.tz = null;
	}

	getMeteorData(){
		return {ready : true};
	}

	getRefs(){
		return {
			sid : this.refs.sid,
			schoolName : this.refs.schoolName,
			schoolEmail : this.refs.schoolEmail,
			schoolPhone : this.refs.schoolPhone,
			schoolAddress : this.refs.schoolAddress,
			schoolCity : this.refs.schoolCity,
			schoolState : this.refs.schoolState,
			schoolZip : this.refs.schoolZip,
			timezone : this.refs.timezone

		};
	}

	render(){
		if(!this.data.ready){
			return util.renderLoading();
		}


		let p = {

			sid : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'sid',
				label : 'Unique ID'
			},


			s_name : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'schoolName',
				label : 'School Name'
			},
			s_email : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'schoolEmail',
				label : 'School Email'
			},
			s_phone : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'schoolPhone',
				label : 'School Phone'
			},
			s_address : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'wrapper',
				label : 'School Address'
			},

			timezone : {
				labelClassName : 'col-xs-2',
				wrapperClassName : 'col-xs-10',
				ref : 'timezone',
				label : 'Timezone'
			}

		};



		return (
			<form className="form-horizontal">

				<RB.Row>
					<RB.Col md={12}>


						<RB.Input type="text" {... p.sid} />
						<RB.Input type="text" {... p.s_name} />
						<RB.Input type="text" {... p.s_email} />
						<RB.Input type="text" {... p.s_phone} />

						<RB.Input {... p.s_address}>
							<RB.Row>
								<RB.Col xs={4}>
									<input ref="schoolAddress" placeholder="address" type="text" className="form-control" />
								</RB.Col>
								<RB.Col xs={2}>
									<input ref="schoolCity" placeholder="city" type="text" className="form-control" />
								</RB.Col>
								<RB.Col xs={2}>
									<input ref="schoolState" placeholder="state" type="text" className="form-control" />
								</RB.Col>
								<RB.Col xs={2}>
									<input ref="schoolZip" placeholder="zipcode" type="text" className="form-control" />
								</RB.Col>

							</RB.Row>
						</RB.Input>

						<RB.Input type="select" {... p.timezone}>

						</RB.Input>

					</RB.Col>
				</RB.Row>
			</form>
		);
	}


	getValue(){
		let {
			sid, schoolName, schoolEmail, schoolPhone,
			schoolAddress, schoolCity, schoolState, schoolZip, timezone
			} = this.getRefs();

		let data = {
			sid : sid.getValue(),
			name : schoolName.getValue(),
			email : schoolEmail.getValue(),
			phone : schoolPhone.getValue(),
			address : schoolAddress.value,
			city : schoolCity.value,
			state : schoolState.value,
			zipcode : schoolZip.value
		};


		let tz = util.getReactJQueryObject(timezone).find('select');

		data.timezone = parseInt(tz.find('option[value="'+tz.val()+'"]').data('offset'), 10);
		data.timezoneString = tz.val();

		return data;
	}

	setDefaultValue(data){

	}
	reset(){

	}

	runOnceAfterDataReady(){
		this.tz = util.getReactJQueryObject(this.refs.timezone).find('select').timezones();

	}
};

KUI.Setting_AddSchool = class extends RC.CSS{

	baseStyles(){
		return {
			ml : {
				marginLeft : '20px'
			}
		};
	}

	render(){
		let sy = this.css.get('styles');
		return (
			<RC.Div>
				<h3>Add New School</h3>
				<hr/>
				<KUI.Setting_add_school_comp ref="form" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.NoButton href="/setting" label="Cancel" />
					<KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
				</RC.Div>
			</RC.Div>
		);
	}

	save(){
		let self = this;
		let data = this.refs.form.getValue();

		data.sid = data.sid.replace(/ /g, '').toLowerCase();
		data._id = data.sid;

		console.log(data);

		KG.get(util.getModuleName('School')).callMeteorMethod('addSchool', [data], {
			success : function(){
				util.toast.alert('Insert Success');
				util.goPath('/setting');
			},
			error : function(err){
				console.error(err);
				util.toast.showError('Add New School Error');
			}
		})



	}
};