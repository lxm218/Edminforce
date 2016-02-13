
KUI.Modal = class extends RC.CSS{

    constructor(p){
        super(p);

        this.state = {
            show : false
        };
    }

    baseStyles(){

        let so = this.state.show;

        return {
            modal : {
                display: so ? 'block' : 'none',
                paddingRight : '15px'
            }
        };
    }

    show(){
        this.setState({
            show : true
        });
    }
    hide(){
        this.setState({
            show : false
        });
    }

    renderBody(){
        return this.props.children;
    }

    render(){

        let sy = this.css.get('styles');

        let okFn = this.props.onYes ? this.props.onYes.bind(this) : function(){};


        return (
            <RC.Div className="modal fade in"
                 tabIndex="-1"
                 aria-hidden="true"
                 style={sy.modal}>
                <RB.Modal dialogClassName="inmodal"
                          show={this.state.show}
                          onHide={this.props.onHide}
                          bsSize="large"
                          aria-labelledby="contained-modal-title-lg">
                    <RB.Modal.Header closeButton>
                        <RB.Modal.Title id="contained-modal-title-lg">{this.props.title}</RB.Modal.Title>
                    </RB.Modal.Header>

                    <RB.Modal.Body>
                        {this.renderBody()}
                    </RB.Modal.Body>

                    <RB.Modal.Footer>
                        <button onClick={this.props.onHide} type="button"
                                className="btn btn-white" data-dismiss="modal">Close</button>
                        {this.props.YesText
                            ?
                            <button type="button"
                                    onClick={okFn}
                                    className="btn btn-primary">{this.props.YesText||'OK'}</button>
                            :
                            ''
                        }

                    </RB.Modal.Footer>
                </RB.Modal>
            </RC.Div>
        );

    }
};