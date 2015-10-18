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
                formData:accountStore.addSwimmerFormData.get(),
                evalLevel:accountStore.evalLevel.get(),  //单独页面设置
                locationOptions:accountStore.locationOptions.get()
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
        goToEvaluation(){

            var fromData = this.refs.AddSwimmerForm.getFormData()

            //保存当前页面表单数据
            Dispatcher.dispatch({
                actionType: "ACCOUNT_ADD_SWIMMER_GO_TO_EVAL",
                fromData: fromData
            });

            var href="/account/EvalLevel"
            FlowRouter.go(href)


        },
        render() {
            return <div>
                <RC.Form ref="AddSwimmerForm" onSubmit={this.formSubmit}>

                    <RC.Input name="name" label="Name"
                              ref="name"
                              value={this.data.formData && this.data.formData.name}/>

                    <RC.Select
                        options={[{text:"Male",value:'male'},{text:'Female',value:'female'}]}
                        name="gender"
                        label="Gender"
                        value="{this.data.formData && this.data.formData.gender}"
                        />

                    <RC.Input name="dob" label="DOB"
                              value={this.data.formData && this.data.formData.dob}/>


                    <RC.Select
                        options={this.data.locationOptions}
                        name="location"
                        label="Location"
                        value={this.data.formData && this.data.formData.location}

                        />

                    <RC.Item>
                        <span  >Level</span>

                        <b style={{'marginLeft':'5px',color:'blue'}}>
                            {this.data.evalLevel}
                        </b>


                         <a className="button-clear"
                            onClick={this.goToEvaluation}
                            style={{float:'right'}}> Evaluation Level</a>


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
