/**
 * Created on 10/13/15.
 */

Cal.SelectedClassInfoCard = React.createClass({

    //selectedClasses 是一个Immutable.Map 非纯对象 所以这里直接传入内容
    propTypes:{
        title:React.PropTypes.string,
        swimmer:React.PropTypes.object,
        selectedClasses:React.PropTypes.object
        //class1:React.PropTypes.object,
        //class2:React.PropTypes.object,
        //class3:React.PropTypes.object
    },

    render: function () {

        let title = this.props.title || 'Register for spring 2015'
        let swimmer = this.props.swimmer;

        let selectedClasses = this.props.selectedClasses
        let class1 = selectedClasses['class1']
        let class2 = selectedClasses['class2']
        let class3 = selectedClasses['class3']


        return <RC.Card  className="padding">
            <h4 className="brand">{title}</h4>

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
                        {class2 && class2.name}
                    </div>

                </div>:''
            }
            {
                class3?<div className="row">
                    <div className="col">
                        Preference 3
                    </div>
                    <div className="col ">
                        {class3 && class3.name}
                    </div>

                </div>:''
            }

        </RC.Card>
    }

});