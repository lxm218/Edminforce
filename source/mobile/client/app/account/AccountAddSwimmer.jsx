/**
 * Created on 9/26/15.
 */

Cal.AccountAddSwimmer = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {}
    },


    ////actions
    formSubmit(e){
        e.preventDefault()

        var fromData = this.refs.AddSwimmerForm.getFormData()

        if(!fromData.name || !fromData.level|| !fromData.location){
            alert('please complete the form ')
            return;
        }

        fromData.accountId= Meteor.userId()


        Dispatcher.dispatch({
            actionType: "ACCOUNT_ADD_SWIMMER_SUBMIT",
            fromData: fromData
        });

    },

    render() {
        return <div>
            <RC.Form ref="AddSwimmerForm" onSubmit={this.formSubmit}>

                <RC.Input name="name" label="Name" value="" />

                <RC.Select
                    options={['male','female']}
                    name="gender"
                    label="Gender"
                    />

                <RC.Input name="dob" label="DOB" value="" />


                <RC.Select
                    options={['place1','place2']}
                    name="location"
                    label="Location"
                    />

                <RC.Select
                    options={App.Config.classLevels}
                     name="level"
                     label="Level"
                    />


                <RC.Button name="button" theme="full"
                           onClick={this.formSubmit}
                           buttonColor="brand">
                    Add
                </RC.Button>



            </RC.Form>

        </div>
    }
})