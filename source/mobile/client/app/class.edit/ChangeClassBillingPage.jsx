/**
 * Created on 9/11/15.
 */
{

    let PageStore;
    Dependency.autorun(function () {
        PageStore = Dependency.get('classEdit.ChangeClass.store');
    });


    Cal.ChangeClassBillingPage = React.createClass({

        mixins: [ReactMeteorData],
        getMeteorData() {
            return {
                swimmer:PageStore.swimmer,
                class:PageStore.class.get(),
                newClass:PageStore.currentClass.get()
            }
        },

        render() {
            return <div>



                <div className="row">
                    <div className="col">
                        { this.data.swimmer && this.data.swimmer.name}
                    </div>

                    <div className="col">
                        <div className="row">
                            <div className="col">
                                {this.data.class && this.data.class.name}
                            </div>
                            <div className="col">
                                is changed to:
                            </div>
                            <div className="col">
                                {this.data.newClass && this.data.newClass.name}
                            </div>

                        </div>

                    </div>
                </div>




            </div>
        }
    })

}
