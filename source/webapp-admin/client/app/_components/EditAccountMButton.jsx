/**
 * Created on 10/24/15.
 */

Cal.EditAccountMButton = React.createClass({
    propTypes:{

    },
    mixins: [ReactMeteorData],
    getMeteorData() {

        let accountId = this.props.accountId

        Meteor.subscribe("adminAccountById",accountId)

        return {
            account:Meteor.users.findOne({_id:accountId})
        }
    },


    //actions
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render: function () {
        var self= this;

        return <span>

            <RB.Button
                bsStyle="primary"
                bsSize="small"
                onClick={this.open}
                >
                Edit
            </RB.Button>


            <RB.Modal show={this.state.showModal} onHide={this.close}
                {...this.props} bsSize="large">

                <RB.Modal.Header closeButton>
                    <RB.Modal.Title id="contained-modal-title-lg">
                        Modal heading
                    </RB.Modal.Title>
                </RB.Modal.Header>
                <RB.Modal.Body>
                    <h4>Wrapped Text</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </p>

                </RB.Modal.Body>


                <RB.Modal.Footer>
                    <RB.Button onClick={this.close}>Cancel</RB.Button>
                    <RB.Button onClick={this.props.onHide}>Confirm</RB.Button>

                </RB.Modal.Footer>
            </RB.Modal>
            </span>




    }

});