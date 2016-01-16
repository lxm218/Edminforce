{

    let CRIntenseProgramRegisterStore;

    Dependency.autorun(function () {
        CRIntenseProgramRegisterStore = Dependency.get('classRegister.intenseProgramRegister.store');
    });


    Cal.CRIntenseProgramRegister = React.createClass({
        mixins: [ReactMeteorData],
        getMeteorData: function () {

            var data = {
                account: Meteor.users.find().fetch(),
                swimmers: CRIntenseProgramRegisterStore.swimmers.get(),
                currentSwimmer: CRIntenseProgramRegisterStore.currentSwimmer.get(),
                currentStep: CRIntenseProgramRegisterStore.currentStep.get(),
                avaiableIntenses: CRIntenseProgramRegisterStore.avaiableIntenseSessions.get(),
                currentIntense: CRIntenseProgramRegisterStore.currentIntenseSession.get(),
                avaialbeClasses: CRIntenseProgramRegisterStore.avaialbeClasses.get(),
                currentClass: CRIntenseProgramRegisterStore.currentClass.get(),
                selectedClasses: CRIntenseProgramRegisterStore.selectedClasses.get()
            };



            return data;
        },
        swimmerChange: function(){
            this.refs.swimmer.refs.select.getDOMNode().disabled = true;
            var value = this.refs.swimmer.getValue();
            var currentSwimmer = _.find(this.data.swimmers, function(item){
                return item._id === value;
            });

            Dispatcher.dispatch({
                subject: "CRIntenseProgramRegisterStore_Swimmer_Change",
                data: currentSwimmer
            });

        },
        intenseChange: function(){
            var value = this.refs.intense.getValue();
            var currentIntense = _.find(this.data.avaiableIntenses, function(item){
                return item._id === value;
            });

            Dispatcher.dispatch({
                subject: "CRIntenseProgramRegisterStore_Intense_Change",
                data: currentIntense
            });
        },
        timeChange: function(){
            console.log("[info][%s]: timeChange", new Date().getTime());
            var value = this.refs.time.getValue();
            console.log("))))timeChange: %o", value);
            var currentClass = _.find(this.data.avaialbeClasses, function(item){
                return item._id === value;
            });

            Dispatcher.dispatch({
                subject: "CRIntenseProgramRegisterStore_Time_Change",
                data: currentClass
            });
        },
        formSubmit: function(event){
            event.preventDefault();
            var formData = this.refs.myForm.getFormData()



            //todo validation info in ui
            if (!this.data.currentSwimmer || !this.data.currentIntense || !this.data.currentClass) {
                alert('please select a class')
                return;
            }


            //check duplicate
            var selectedClasses =this.data.selectedClasses;
            var currentClass =this.data.currentClass;
            if(App.currentClass_in_selectedClasses(currentClass,selectedClasses)){
                alert('class duplicated');
                return;
            }

            Dispatcher.dispatch({
                subject: "CRIntenseProgramRegisterStore_Class_Selected",
                data: {
                    currentStep: this.data.currentStep,
                    selectedClass: formData
                }
            });


        },
        componentDidUpdate: function(){
            if(this.data.currentStep == 2 ||this.data.currentStep == 3){
                this.refs.swimmer.refs.select.getDOMNode().disabled = true;
                this.refs.intense.refs.select.getDOMNode().disabled = true;
            }
        },
        render: function () {

            let class1 = this.data.selectedClasses.get('class1');
            let class2 = this.data.selectedClasses.get('class2');
            let class3 = this.data.selectedClasses.get('class3');

            //this.refs.swimmer.refs.select.getDOMNode().disabled = true;

            return (
                <div>
                    <RC.Card key={Math.random()} className="padding">
                        <h4 className="brand">Intense Program</h4>

                        {/*swimmer && swimmer.name*/}

                        {
                            class1?<div className="row">
                                <div className="col">
                                    Preference 1
                                </div>
                                <div className="col">
                                    {class1.name}
                                </div>

                            </div>:''

                        }

                        {
                            class2?<div className="row">
                                <div className="col">
                                    Preference 2
                                </div>
                                <div className="col">
                                    { class2.name}
                                </div>

                            </div>:''
                        }
                        {
                            class3?<div className="row">
                                <div className="col">
                                    Preference 3
                                </div>
                                <div className="col ">
                                    {class3.name}
                                </div>

                            </div>:''
                        }

                    </RC.Card>

                    <RC.Form ref="myForm" key={Math.random()} onSubmit={this.formSubmit}>
                        <RC.List theme="inset">

                            <RC.Select2
                                ref="swimmer"
                                options={this.data.swimmers || []}
                                value= {this.data.currentSwimmer&&this.data.currentSwimmer._id}
                                name="swimmer"
                                changeHandler={this.swimmerChange}
                                label="Swimmer"
                                />

                            <RC.Item uiColor="brand1">
                                Level: {this.data.currentSwimmer&&this.data.currentSwimmer.level}
                            </RC.Item>

                            <RC.Select2
                                ref="intense"
                                options={this.data.avaiableIntenses || []}
                                value={this.data.currentIntense&&this.data.currentIntense._id}
                                name="intense"
                                changeHandler={this.intenseChange}
                                label="Intense Session"
                                />

                            <RC.Select2
                                ref="time"
                                options={this.data.avaialbeClasses || []}
                                value={this.data.currentClass&&this.data.currentClass._id}
                                name="time"
                                changeHandler={this.timeChange}
                                label="Time"
                                />
                            <RC.Button name="button" type="submit"
                                       onClick={this.formSubmit}
                                       theme="full" buttonColor="brand">
                                {this.data.currentStep == 1 ? 'Book':'Select'}
                            </RC.Button>


                        </RC.List>
                    </RC.Form>
                </div>
            );
        }
    });
}