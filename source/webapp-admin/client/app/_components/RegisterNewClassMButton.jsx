/**
 * Created on 10/25/15.
 */

Cal.RegisterNewClassMButton = React.createClass({

    propTypes: {},
    mixins: [ReactMeteorData],
    getMeteorData() {

        return {}
    },

    render: function () {

        const swimmerFormInstance = (
            <form className="form-horizontal">

                <RB.Input type="text" label="Swimmer Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <RB.Input type="text" label="Level" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />


                <RB.Input type="text" label="Day" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

                <RB.Input type="text" label="Time" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />

                <RB.Input type="text" label="Class Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />


            </form>
        );

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
                            Register Class
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



        return <ButtonWithDialog />
    }

});