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


                            <RC.Input name="name" label="Name" value={this.data.swimmer.name}/>


                            <RC.Select
                                options={['male','female']}
                                name="gender"
                                label="Gender"
                                value={this.data.swimmer.gender}
                                />

                            <RC.Input name="dob" label="DOB" value=""/>


                            <RC.Select
                                options={['place1','place2']}
                                name="location"
                                label="Location"
                                value={this.data.swimmer.location}
                                />

                            <RC.Select
                                options={App.Config.classLevelsNUM}
                                name="level"
                                readOnly
                                label="Level"
                                value={this.data.swimmer.level}

                                />


                        </RC.Form>
                        : <RC.Card title="No such swimmer"></RC.Card>
                }
            </div>
        }
    })
}
