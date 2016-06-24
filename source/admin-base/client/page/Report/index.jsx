KUI.Report_Index = class extends RC.CSS{

	render(){
		if(!util.user.checkPermission('report', 'view')){
			util.render.stop(this);
			return util.renderNoViewPermission();
		}

		let nav = Session.get('OtherLeftNav');
		console.log(nav);

		let h = (
			<div>
				{_.map(nav, (item)=>{
					return <RC.URL key={item.name} href={item.href}><p>View {item.name}</p></RC.URL>;
				})}
			</div>
		);

		return (
			<RC.Div>
				<h3>Report</h3>
				<hr/>
				<RC.URL href="/report/finance"><p>View Finance Report</p></RC.URL>
				<RC.URL href="/report/student"><p>View Student Report</p></RC.URL>

				<RC.URL href="/report/classstudent/pending"><p>View Pending Registration Report</p></RC.URL>

				<RC.URL href="/report/customer/schoolcredit"><p>View School Credit Report</p></RC.URL>
				<RC.URL href="/report/coupon"><p>View Coupon Report</p></RC.URL>

				<RC.URL href="/report/classstudent/program_registration"><p>View Program Registration Report</p></RC.URL>
				<RC.URL href="/report/classstudent/trialormakeup"><p>View Trial/Makeup Class Report</p></RC.URL>

				{h}

			</RC.Div>
		);
	}
};