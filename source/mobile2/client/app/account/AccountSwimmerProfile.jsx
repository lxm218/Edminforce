/**
 * Created on 9/28/15.
 */
{

	//'read'  'edit' mode
	//let mode = new ReactiveVar('read')


	Cal.AccountSwimmerProfile = React.createClass({

		mixins: [ReactMeteorData],
		getMeteorData() {


			Meteor.subscribe('swimmer', this.props.swimmerId)
			return {

				swimmer: DB.Swimmers.findOne({
					_id: this.props.swimmerId
				})
			}
		},

		render() {

			return <div>

				{
					this.data.swimmer ?
						<RC.Form ref="myForm" onSubmit={this.formSubmit}>


							<RC.Item className="item-text-wrap">
								<Cal.Grid
									flexWrap="nowrap"
									justifyContent="space-between">
									<Cal.GridItem>Name</Cal.GridItem>

									<Cal.GridItem>
										{this.data.swimmer.name}
									</Cal.GridItem>

								</Cal.Grid>
							</RC.Item>


								<RC.Select
									style={{paddingLeft:'14px',color:'black'}}
									theme="right"
										   options={['male','female']}
										   name="gender"
										   label="Gender"
										   value={this.data.swimmer.gender}
								/>

							<RC.Select
								style={{paddingLeft:'14px',color:'black'}}

								theme="right"
									   options={['male','female']}
									   name="gender"
									   label="Gender"
									   value={this.data.swimmer.gender}
							/>

							<RC.Input
								style={{paddingLeft:'14px',color:'black'}}

								name="dob" label="DOB" value=""/>




							<RC.Select theme="right"
									   style={{paddingLeft:'14px',color:'black'}}

									   options={['place1','place2']}
									   name="location"
									   label="Location"
									   value={this.data.swimmer.location}
							/>

							{
								//<RC.Select
								//    options={App.Config.classLevelsNUM}
								//    name="level"
								//    readOnly
								//    label="Level"
								//    value={this.data.swimmer.level}
								//
								///>
							}

							<RC.Item className="item-text-wrap">
								<Cal.Grid
									flexWrap="nowrap"
									justifyContent="space-between">
									<Cal.GridItem>Level</Cal.GridItem>

									<Cal.GridItem>
										{this.data.swimmer.level}
									</Cal.GridItem>

								</Cal.Grid>
							</RC.Item>


						</RC.Form>
						: <RC.Card title="No such swimmer"></RC.Card>
				}
			</div>
		}
	})
}
