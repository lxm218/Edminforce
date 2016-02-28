

/**
 * Created  on 2/27/16.
 */
/**
 * Created on 10/1/15.
 */

var testData = [
	{text: '12:00-1:00', value: '5000'},
	{text: '13:00-1:00', value: '2'},
	{text: '15:00-1:00', value: '3'},
	{text: '17:00-1:00', value: '4'},
	{text: '1:00-1:00', value: '5'},
	{text: '12:00-1:00', value: '6'},
	{text: '12:00-1:00', value: '7'},

]

Cal.SelectTimeGrid = class extends RC.CSS {

	constructor(props) {
		super(props)

	}

	timeChange(value) {

		//var value = e.target.value//this.refs.day.getValue()
		value = parseInt(value, 10)

		Dispatcher.dispatch({
			actionType: this.props.changeMessage, //"BookTheSameTime_DAY_CHANGE",
			time: value
		});

	}
	select(value){
		alert(value)
	}
	baseStyles(np,ns) {
		return {
			area:{
				display:'flex',
				flexWrap:'wrap',
				justifyContent:'space-around', //  center
			},
			label:{
				//flex:'0 0 14.28%',
				//flexGrow:1
				//flexBasis:''
			},
			button:{
				//padding:5,
				//margin:5,
				textAlign:'center',
				padding:'5px 5px 5px 5px',
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
				backgroundColor:'blue',
				color:'#fff'
			}
		}
	}


	render() {
		let self=this
		let styles = this.css.get("styles")


		var days = this.props.avaiableTimes//.length > 0 ? this.props.avaiableTimes : testData
		days = _.filter(days,function(item){
			return !!item.value
		})

		var currentDay= this.props.currentTime

		return <RC.Div >
			Select Times:

			<RC.Div style={styles.area}>
			{
				days.map((item, i)=>{
					let isSelected = currentDay == item.value

					let  labelStyle = styles.label

					let  buttonStyle = Object.assign({},styles.button)
					if(isSelected){
						buttonStyle = Object.assign(buttonStyle,styles.active)
					}


					return <label style={labelStyle} onClick={this.timeChange.bind(this,item.value)}>

						<input type="radio"
							   name={this.props.name}
							   checked={isSelected}
							   value={item.value} />

						<div style={buttonStyle} key={i}>
							{item.text}
						</div>
					</label>

				})
			}
			</RC.Div>
		</RC.Div>
	}
}

Cal.SelectTimeGrid.propTypes = {
	avaiableTimes:React.PropTypes.array,
	currentTime:React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	changeMessage:React.PropTypes.string
}