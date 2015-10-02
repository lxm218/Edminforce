/**
 * Created on 9/26/15.
 */

{

    let accountStore;
    Dependency.autorun(function () {
        accountStore = Dependency.get('Account.AddSwimmer.store');
    });

    Cal.AccountAddSwimmer = React.createClass({

        mixins: [ReactMeteorData],

        getMeteorData() {
            return {
                evalLevel:accountStore.evalLevel.get()
            }
        },


        ////actions
        formSubmit(e){
            e.preventDefault()

            var fromData = this.refs.AddSwimmerForm.getFormData()

            fromData.level = accountStore.evalLevel.get()

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


                    <RC.Item>
                        <span class="input-label" >Level</span>

                        <b style={{'margin-left':'5px',color:'blue'}}>{this.data.evalLevel}</b>

                        <a href="/account/EvalLevel" style={{float:'right'}}> Evaluation Level</a>
                    </RC.Item>


                    <RC.Button name="level" theme="full"
                               onClick={this.formSubmit}
                               buttonColor="brand">
                        Add
                    </RC.Button>


                </RC.Form>

            </div>
        }
    })

}
