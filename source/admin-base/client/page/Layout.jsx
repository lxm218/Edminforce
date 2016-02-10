KUI.Layout = class extends RC.CSS{

    constructor(p){
        super(p);

        this.state = {
            errorMessage : false
        };


        let self = this;
        util.message.register('KG:show-error-message', function(param){

            self.setState({
                errorMessage : param.error
            });
        });
    }

    baseStyles(){
        return {
            left : {

            },
            right : {

            },
            con : {
                position : 'relative'
            }
        };
    }

    hideErrorMsg(){
        this.setState({
            errorMessage : false
        });
    }

    renderErrorMsg(){
        //let error = Session.get('KG:show-error-message');
        let error = this.state.errorMessage;
        if(!error){
            return '';
        }


        return (
            <div className="alert alert-danger alert-dismissable">
                <button aria-hidden="true" data-dismiss="alert" onClick={this.hideErrorMsg.bind(this)} className="close" type="button">×</button>
                {error}
            </div>
        );
    }


    render(){
        let style = this.css.get('styles');


        return <div id="ui-layout">

            <KUI.Header />

            <div className="container" style={style.con}>
                {this.renderErrorMsg()}

                <KUI.LeftNav />
                <div id="page-wrapper" style={{paddingRight:0}}>

                    <div style={
                        {
                            paddingTop : 0

                        }
                    } className="wrapper wrapper-content animated fadeInRight">
                        <div className="ibox">
                            <div className="ibox-content">
                                <KUI.Body tmpl={this.props.body} />
                            </div>
                        </div>

                    </div>

                    <div className="footer"></div>
                </div>
            </div>



        </div>
    }
};