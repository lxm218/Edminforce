const Filter = class extends KUI.Page{
    getMeteorData(){
        const teacherX = Meteor.subscribe(util.getModuleName('AdminUser'), {
			query : {
				role : 'teacher'
			}
		});

		const programX = Meteor.subscribe(util.getModuleName('Program'), {});
        const sessionX = Meteor.subscribe(util.getModuleName('Session'), {});


		return {
			ready : teacherX.ready() && programX.ready() && sessionX.ready(),
			teacherList : this.m.AdminUser.getDB().find().fetch(),
			programList : this.m.Program.getDB().find().fetch(),
            sessionList : this.m.Session.getDB().find().fetch()
		};
    }
    render(){
        if(!this.data.ready){
            return util.renderLoading()
        }

        const p = {
			session : {
				labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'session',
				label : 'Select Session'
			},
			program : {
                labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'program',
				label : 'Select Program'
			},
			teacher : {
                labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
				ref : 'teacher',
				label : 'Select Teacher'
			},
            day : {
                labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
                ref : 'day',
                label : 'Select Day'
            },
            status : {
                labelClassName : 'col-xs-4',
				wrapperClassName : 'col-xs-8',
                ref : 'status',
                label : 'Status'
            }
		};
        const option = {
            status : ['Active', 'Inactive'],
            day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }

        return (
            <form className="form-horizontal">
				<RB.Row>
					<RB.Col md={6} mdOffset={0}>
						<RB.Input type="select" {... p.program}>
							<option value="-1">All</option>
							{
								_.map(this.data.programList, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>

						<RB.Input type="select" {... p.teacher}>
                            <option value="-1">All</option>
							{
								_.map(this.data.teacherList, (item, index)=>{
									return <option key={index} value={item.nickName}>{item.nickName}</option>;
								})
							}
						</RB.Input>

                        <RB.Input type="select" {... p.status}>
							<option value="-1">All</option>
							{
								_.map(option.status, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>
					</RB.Col>
                    <RB.Col md={6} mdOffset={0}>
                        <RB.Input type="select" {... p.session}>
							<option value="-1">All</option>
							{
								_.map(this.data.sessionList, (item, index)=>{
									return <option key={index} value={item._id}>{item.name}</option>;
								})
							}
						</RB.Input>
                        <RB.Input type="select" {... p.day}>
							<option value="-1">All</option>
							{
								_.map(option.day, (item, index)=>{
									return <option key={index} value={item}>{item}</option>;
								})
							}
						</RB.Input>


                    </RB.Col>
				</RB.Row>
			</form>
        )
    }

    getValue(){
        const rs = {
            day : this.refs.day.getValue(),
            status : this.refs.status.getValue(),
            program : this.refs.program.getValue(),
            session : this.refs.session.getValue(),
            teacher : this.refs.teacher.getValue()
        }
        _.each(rs, (v, k)=>{
            if(v==='-1'){
                delete rs[k]
            }
        })

        return rs
    }
}

KUI.StudentEmail_Report = class extends KUI.Page{
    constructor(p){
        super(p)

        this.state = {
            list : null
        }
    }
    getMeteorData(){
        return {
            ready : true
        }
    }
    render(){
		return (
			<RC.Div>
				<h3>Student Email Report</h3>
				<hr/>
				<Filter ref="filter" />
				<RC.Div style={{textAlign:'right'}}>
					<KUI.YesButton onClick={this.search.bind(this)} label="Show Result"></KUI.YesButton>
                    {this.showExportButton()}
				</RC.Div>
				<hr/>
				{this.renderResultTable()}
			</RC.Div>
		);
	}

    showExportButton(){
		if(_.isArray(this.state.list) && this.state.list.length > 0) {
			return (
                <KUI.YesButton onClick={this.exportToExcel.bind(this)} style={{marginLeft : '15px'}} label="Export Report" ></KUI.YesButton>
            );
		}
	}

    renderResultTable(){
        if(!this.state.list) return null
        if(this.state.list === 'loading') return util.renderLoading()

        let titleArray = [
            {
                title : 'ID',
                reactDom(doc){
                    return doc.customer[0]._id
                }
            },
			{
				title : 'Name',
                reactDom(doc){
                    return doc.customer[0].name
                }
			},
            {
                title : 'Student Name',
                reactDom(doc){
                    return doc.student[0].name
                }
            },
			{
                title : 'Email',
                reactDom(doc){
                    return doc.customer[0].email
                }
            },
            {
                title : 'Phone',
                reactDom(doc){
                    return doc.customer[0].phone
                }
            }
		];

		return (
			<KUI.Table
				style={{}}
				list={this.state.list}
				title={titleArray}
				total={this.state.list.length}
				ref="table">
			</KUI.Table>
		);
    }

    search(){
        const v = this.refs.filter.getValue()
        console.log(v)

        this.getStateData(v)
    }

    getStateData(v){
		let self = this;


		self.setState({
			list : 'loading'
		});
		KG.DataHelper.callMeteorMethod('getStudentEmailList', [v], {
			success : function(list){
                console.log(list.length)
				self.setState({
					list : list
				});
			}
		});
	}

    exportToExcel(){
		let list = []
        _.each(this.state.list, (item)=>{
            let res = {
                ID : item.customer[0]._id,
                Name : item.customer[0].name,
                StudentName : item.student[0].name,
                Email : item.customer[0].email,
                Phone : item.customer[0].phone
            }
            list.push(res)

        })
		let csv = Papa.unparse(list)
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "EmailList.csv");
	}
}
