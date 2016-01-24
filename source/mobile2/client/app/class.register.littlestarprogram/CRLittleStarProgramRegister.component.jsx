{
    let PageStore;

    /**
     * Get all swimmers for currently user
     * @returns [{swimmerObj}]
     */
    function getSwimmers(){
        var swimmers = DB.Swimmers.find({accountId: Meteor.userId()}).fetch();

        //var registered = new ReactiveVar();
        //registered.set([]);
        var registered = {};

        for(var i = 0; i<swimmers.length; i++){
            var registerClass = DB.Classes.find({
                "programId": "littleStar",
                "students":{
                    "$elemMatch":{
                        "swimmerId" : swimmers[i]["_id"]
                    }
                }
            }).fetch();

            if(registerClass&&registerClass.length){
                registered[swimmers[i]["_id"].toString()]=registerClass;
            }
        }

        var allowLevels = ["SPR1", "SPR2", "SPR3", "RCR1", "RCR2", "RCR3", "CHL1", "CHL2", "CHL3", "MST1", "MST2", "MST3", "ELT1", "ELT2", "ELT3"];

        function getAge(dateStr){
            var birth = new Date(dateStr);
            var today = new Date();
            var birthYear = birth.getFullYear();
            var birthMonth = birth.getMonth();
            var birthDay = birth.getDate();

            var currentYear = today.getFullYear();
            var currentMonth = today.getMonth();
            var currentDay = today.getDate();

            var year = currentYear - birthYear;
            var month = currentMonth - birthMonth;
            var day = currentDay - birthDay;

            if(day<0){
                month--;
                day = 30+day;
            }

            if(month<0){
                year--;
                month = 12+month;
            }

            return {
                year: year,
                month: month,
                day: day
            };
        }

        // `swimmers` need to used on select component, need to add `text` and `value` property
        var transferSwimmers = [];
        for(var i=0;i < swimmers.length; i++){
            var swimmer = swimmers[i];
            var age = getAge(swimmer.birthday);
            var isLevelOK = _.find(allowLevels, function (level) {
                return (level.toLowerCase() == swimmer.level.toLowerCase());
            });

            if(age.year<=8&&isLevelOK&&!registered[swimmers[i]["_id"].toString()]){
                swimmer['text'] = swimmer['name'];
                swimmer['value'] = swimmer['_id'];
                transferSwimmers.push(swimmer);
            }
        }

        //console.log("getSwimmers - swimmers: %o", swimmers);
        return transferSwimmers;
    }

    Cal.CRLittleStartProgramRegister = React.createClass({
        mixins: [ReactMeteorData],
        getInitialState:function(){
          return {
              currentSwimmer: null,
              comments: null
          };
        },
        getMeteorData: function () {

            Meteor.subscribe('classes')
            var appInfo = DB.App.findOne()


            var data = {
                account: Meteor.users.find().fetch(),
                swimmers: getSwimmers(),
                currentClass:DB.Classes.findOne({//todo需要根据level去查询相应课程？
                    //sessionId:appInfo && appInfo.sessionRegister,
                    programId:'littleStar'
                })
            };

            //console.log("*************Little Star Program - currentClass: %o", data.currentClass);

            if(!this.state.currentSwimmer){
                this.state.currentSwimmer = data.swimmers[0];
            }

            return data;
        },
        swimmerChange: function(event){
            var currentSwimmer = _.find(this.data.swimmers, function(item){
                //console.log(item._id);
                //console.log(this.swimmerSelect.getValue());
                return item._id === this.swimmerSelect.getValue();
            });
            this.setState({
                currentSwimmer: currentSwimmer
            });
            console.log(this.state.currentSwimmer);
        },
        submitForm: function (event) {
            event.preventDefault();

            let formData = this.refs.form.getFormData()


            console.log("Submit Form");
            console.log('data: %o', formData);
            if(!this.state.currentSwimmer){
                alert("Please select a swimmer");
                return
            }
            if(!this.data.currentClass){
                console.error('currentClass not exist')
                return
            }

            //TODO Need to do add to cart


            Meteor.call('add_class_to_cart', {
                swimmerId: this.state.currentSwimmer._id,
                classId: this.data.currentClass._id,

                quantity: 1,
                swimmer: this.state.currentSwimmer,
                class1: this.data.currentClass,
                type:'register-littleStar',

                accountId:Meteor.userId(),

                comment:formData.comments

                //标记购物项是否是第一次注册 用于判断 waiver form
                //isFistTime:isFistTime
            }, function (err, result) {

                if (err) {
                    alert(err.error)
                    console.error(err)
                    return; //todo  prompt
                }

                //Then go to next page
                FlowRouter.go('littlestar_confirm');
            })






        },
        render: function () {
            console.log(this.state);
            let comments = this.state.comments;
            console.log(comments);

            console.log("currentClass: %o", this.data.currentClass);

            return (
                <div className="littlestar-register">
                    <RC.Card title="Little Star Program">
                        <RC.Item theme="divider">Normal Labels</RC.Item>
                    </RC.Card>
                    <RC.Form ref="form" onSubmit={this.submitForm}>
                        <RC.Select2
                            ref={function(ref){this.swimmerSelect = ref;}}
                            options={this.data.swimmers}
                            value= {this.state.currentSwimmer&&this.state.currentSwimmer._id}
                            name="swimmer"
                            changeHandler={this.swimmerChange}
                            label="Swimmer"
                            />
                        <RC.Item uiColor="brand1">
                            Level: {this.state.currentSwimmer&&this.state.currentSwimmer.level}
                        </RC.Item>
                        <RC.Item>
                            <p>
                                {this.data.currentClass&&this.data.currentClass.name}
                            </p>

                            <p>
                                Price: ${this.data.currentClass&&this.data.currentClass.price}

                            </p>

                            <div>
                                <RC.Textarea
                                    placeholder="Add a comment(optional)"
                                    name="comments"
                                    >
                                    {comments}
                                </RC.Textarea>
                            </div>
                        </RC.Item>

                        <RC.Button name="button" type="submit" bgColor="brand1"
                                   onClick={this.selectMore}
                                   theme="full" buttonColor="brand">
                            Book
                        </RC.Button>

                    </RC.Form>
                </div>
            );
        }
    });
}