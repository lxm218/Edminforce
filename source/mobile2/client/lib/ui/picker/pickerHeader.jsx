/**
 * Created  on 3/19/16.
 */


UI.PickerHeader = React.createClass({


	close(){
		this.props.close()
	},
	confirm(){
		this.props.confirm()
	},

	render(){
		let height = this.props.height

		return <header style={{
							position: "relative",
    						top: 0,
    						left:0,
    						right:0,
    						height: height,

							paddingRight: "0.5rem",
							paddingLeft: "0.5rem",
							backgroundColor: "#f7f7f8",

						}}>



			<button
				onClick={this.confirm}

				style={{
				float: "right",
				fontSize: "0.8rem",
				lineHeight: height+'px',
				height: height,
				border:0,
				background:"none",
				margin:0,

				position:"relative",
				zIndex:1


							}}>
				确定
			</button>

			<button
				onClick={this.props.close}

				style={{
				float: "left",
				fontSize: "0.8rem",
				lineHeight: height+'px',
				height: height,
				border:0,
				background:"none",
				margin:0,

				position:"relative",
				zIndex:1


							}}>
				取消
			</button>


			<h1 style={{
						display: "block",
						position: "absolute",
						width:"100%",
						textAlign:"center",
						fontSize: "0.85rem",
						lineHeight: height+'px',
						height: height,
						padding:0,
						left:0,
						right:0,
						zIndex:0



			}}>请选择称呼</h1>






		</header>

	}
})