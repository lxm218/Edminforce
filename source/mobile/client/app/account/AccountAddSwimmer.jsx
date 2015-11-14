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

                    <RC.Input name="dob" label="Birthday"
                              placeholder="2005/01/01"
                              value={this.data.formData && this.data.formData.dob}/>


                    <RC.Select
                        options={this.data.locationOptions}
                        name="location"
                        label="Location"
                        value={this.data.formData && this.data.formData.location}

                        />

                    <label className="item item-input">
                        <span  className="input-label" style={{'float':'left'}}>
                            Level
                        </span>

                        <span style={{'font-size':'14px'}}>
                            {this.data.evalLevel}
                        </span>


                         <a className="button-clear"
                            onClick={this.goToEvaluation}
                            style={{position:'absolute','top':'14px',right:'2px'}}>
                             {this.data.evalLevel?
                                 'online Evaluation':
                                 'Evaluation Level'}
                         </a>


                    </label>


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
