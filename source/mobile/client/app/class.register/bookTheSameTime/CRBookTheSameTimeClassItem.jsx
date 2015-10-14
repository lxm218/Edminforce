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
            currentStep:1
        });
    },

    render() {

        return <RC.Item uiColor="brand1" className='item-text-wrap'>
            {
                this.props.classInfo ?

                    <div className="row">
                        <div className="col">

                            {this.props.classInfo.name}

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