/**
 * Created on 10/1/15.
 */

Cal.CRClassBookItem = React.createClass({
    propTypes: {
        classId: React.PropTypes.string //.isRequired
    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        var classId = this.props.classId

        //上个session的class
        var oldClass = DB.Classes.findOne({
            _id: classId
        })
        console.log(oldClass,App.info)



        //相同class不存在时的判断逻辑
        var queryObj={
            sessionId:App.info && App.info.sessionRegister,
            day:oldClass && oldClass.day,
            startTime:oldClass && oldClass.startTime

        }
        console.log(queryObj)
        var similarClass = DB.Classes.findOne(queryObj)

        console.log('similarClass',similarClass)

        return {
            similarClass: similarClass
        }
    },
    //actions
    book(){

        //alert('onBook')

        Dispatcher.dispatch({
            actionType: "BookTheSameTime_CLASS_SELECT_FOR_CURRENT",
            selectedClass: this.data.similarClass,
            currentStep:1
        });
    },

    render() {

        return <RC.Item uiColor="brand1" className='item-text-wrap'>
            {
                this.data.similarClass ?

                    <div className="row">
                        <div className="col">

                            {this.data.similarClass && this.data.similarClass.name}

                        </div>

                        <div className="col col-20">
                            <span onClick={this.book} className="button button-small">
                            BOOK
                            </span>
                        </div>
                    </div>
                    : ''
            }


        </RC.Item>

    }
})