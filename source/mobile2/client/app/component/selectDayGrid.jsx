/**
 * Created  on 2/27/16.
 */
/**
 * Created on 10/1/15.
 */

var testData = [
	//{text: 'Mon', value: '1'},
	{text: 'Tue', value: '2'},
	{text: 'Wed', value: '3'},
	{text: 'Thur', value: '4'},
	//{text: 'Fri', value: '5'},
	//{text: 'Sat', value: '6'},
	//{text: 'Sun', value: '7'},

]

var DAYS_MAP={
	"monday":"MON",
	"tuesday":"TUE",
	"wednesday":"WED",
	"thursday":"THU",
	"saturday":"SAT",
	"sunday":"SUN",
}
function getDayName(day){
	return DAYS_MAP[day.toLowerCase()] || day
}

Cal.SelectDayGrid = class extends RC.CSS {

	constructor(props) {
		super(props)

	}

	dayChange(value) {

		//var value = e.target.value//this.refs.day.getValue()
		value = parseInt(value, 10)

		Dispatcher.dispatch({
			actionType: this.props.changeMessage, //"BookTheSameTime_DAY_CHANGE",
			day: value
		});

	}
	select(value){
		alert(value)
	}
	baseStyles(np,ns) {
		return {
			area:{
				display:'flex',
				justifyContent:'center' //  center space-around
			},
			label:{
				flex:'0 0 14.28%',
				//flexGrow:1
				//flexBasis:''
			},
			button:{
				//padding:5,
				//margin:5,
				textAlign:'center',
				padding:'5px 0 5px 0',
				color: '#000',
				cursor: "pointer",
				//backgroundColor: '#fff',
				border:'solid 1px grey'
			},


			default:{
				color:'#000',

			},
			disabled:{
				backgroundColor:'#fff',
				color:'#aaa'
			},
			active:{
				backgroundColor:'rgb(0, 130, 236)',
				color:'#fff'
			}
		}
	}


	render() {
		let self=this
		let styles = this.css.get("styles")


		var days = this.props.avaiableDays//.length > 0 ? this.props.avaiableDays : testData
		days = _.filter(days,function(item){
			return !!item.value
		})

		var currentDay= this.props.currentDay

		return <RC.Div style={styles.area}>
			{
				days.map((item, i)=>{
					let isSelected = currentDay == item.value

					let  labelStyle = styles.label

					let  buttonStyle = Object.assign({},styles.button)
					if(isSelected){
						buttonStyle = Object.assign(buttonStyle,styles.active)
					}


					return <label style={labelStyle} onClick={this.dayChange.bind(this,item.value)}>
							<input type="radio"
								   name={this.props.name}
								   checked={isSelected}
								   value={item.value} />

							<div style={buttonStyle} key={i}>
								{getDayName(item.text)}
							</div>
						</label>

				})
			}

		</RC.Div>
	}
}

Cal.SelectDayGrid.propTypes = {
	avaiableDays: React.PropTypes.array,
	currentDay: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	name:React.PropTypes.string,
	changeMessage: React.PropTypes.string,

	readyOnly: React.PropTypes.bool
}