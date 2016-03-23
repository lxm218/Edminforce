/**
 * Created  on 3/19/16.
 */


UI.PickerArea = React.createClass({

	render(){

		var height = this.props.height || 300

		let styles={
			area:{
				position:'fixed',
				left:0,
				bottom:0,
				width:"100%",
				height:{height},
				background: "#cfd5da",
				zIndex: 9999999
			}


		}





		return <div style={styles.area} >

			{this.props.children}

		</div>

	}
})