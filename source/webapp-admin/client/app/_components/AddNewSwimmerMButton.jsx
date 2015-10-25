/**
 * Created on 10/24/15.
 */

Cal.AddNewSwimmerMButton = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            formData:{}
            //evalLevel:accountStore.evalLevel.get(),  //单独页面设置
            //locationOptions:accountStore.locationOptions.get()
        }
    },

    render: function () {


        const swimmerFormInstance = (
            <form className="form-horizontal">
                <RB.Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <RB.Input type="text" label="Gender" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

                <div class="form-group" >
                    <label class="control-label col-xs-2" >
                        <span >BirthDay</span></label>
                    <div class="col-xs-10" >
                        <RW.DateTimePicker time={false}/>
                    </div>
                </div>


                <RB.Input type="text" label="Location" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

                <RB.Input type="text" label="Level" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

            </form>
        );


        const swimmerFormInstance2=(
            <form className="form-horizontal">


                <RC.Input
                    theme="label-inside"
                    name="username" value=''
                    label="Username" />


                <RC.Input
                    theme="label-inside"
                    name="username"
                    value={'ppppppp'} placeholder="Username" />

                <RC.Input
                    theme="label-inside"
                    name="name" label="Name"
                          ref="name"
                          value={this.data.formData && this.data.formData.name}/>

                <RC.Select
                    theme="label-inside"
                    options={[{text:"Male",value:'male'},{text:'Female',value:'female'}]}
                    name="gender"
                    label="Gender"
                    value="{this.data.formData && this.data.formData.gender}"
                    />





            </form>


        )


        const ButtonWithDialog = React.createClass({

            getInitialState() {
                return { showModal: false };
            },

            close() {
                this.setState({ showModal: false });
            },

            open() {
                this.setState({ showModal: true });
            },

            render() {
                let popover = <RB.Popover title="popover">very popover. such engagement</RB.Popover>;
                let tooltip = <RB.Tooltip>wow.</RB.Tooltip>;

                return (
                    <span>

                        <RB.Button
                            bsStyle="primary"
                            bsSize="small"
                            onClick={this.open}
                            >
                            Add Swimmer
                        </RB.Button>

                        <RB.Modal show={this.state.showModal} onHide={this.close}
                            {...this.props} bsSize="large">
                            <RB.Modal.Header closeButton>
                                <RB.Modal.Title id="contained-modal-title-lg">Modal heading</RB.Modal.Title>
                            </RB.Modal.Header>
                            <RB.Modal.Body>

                                {swimmerFormInstance}

                            </RB.Modal.Body>
                            <RB.Modal.Footer>

                                <RB.Button onClick={this.close}>Cancel</RB.Button>
                                <RB.Button onClick={this.props.onHide}>Confirm</RB.Button>

                            </RB.Modal.Footer>
                        </RB.Modal>
                    </span>
                );
            }
        });







        return <ButtonWithDialog />;
    }

});