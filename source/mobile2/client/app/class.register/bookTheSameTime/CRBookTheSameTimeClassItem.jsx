/**
 * Created on 10/1/15.
 */

Cal.CRBookTheSameTimeClassItem = React.createClass({
	propTypes: {
		classInfo: React.PropTypes.object //.isRequired
	},
	//mixins: [ReactMeteorData],
	//getMeteorData() {
	//    return {
	//    }
	//},
	//actions
	book(){

		Dispatcher.dispatch({
			actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
			selectedClass: this.props.classInfo,
			currentStep: 1
		});
	},

	render() {
		let bookItem =(
			<Cal.Grid
				flexWrap="nowrap"
				justifyContent="space-between"
			>
				<Cal.GridItem
					flexGrow="0"
					flexShrink="0"
					flexBasis="25%"
					maxWidth="25%"
				>
					{this.props.classInfo.name}
				</Cal.GridItem>

				<Cal.GridItem>
                <span onClick={this.book} className="button button-small">
                    BOOK
                </span>
				</Cal.GridItem>


			</Cal.Grid>
		)

		return <RC.Item uiColor="brand1" className='item-text-wrap'>
			{
				this.props.classInfo ?bookItem : ''
			}


		</RC.Item>

	}
})