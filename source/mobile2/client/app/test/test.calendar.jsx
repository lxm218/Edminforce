/**
 * Created  on 4/17/16.
 */


DefaultRoutes.route('/test/calendar', {
	name: "home",
	action: function (p) {
		App.routeHandler(p, {
			pageTitle: "test",
			headerNav: null,
			bodyTmpl: <RC.CalendarTest/>
		})
	}
})

RC.CalendarTest = React.createClass({

	onChange(calendar, value ){

		console.log(calendar.name, value)

	},
	render(){

		return <div>

			<br/><br/><br/><br/><br/><br/>


			<RC.Calendar
				name="birthday"
				label="日历"
				value="2016-4-14"
				inputElementStyle={{color:'blue'}}
				onChange={(calender,value)=>{console.log(calender,value)}}
			/>

			<br/><br/>

			<RC.Calendar
				name="birthday"
				label="日历"
				onChange={this.onChange.bind('birthday')}
			/>


		</div>


	}
})