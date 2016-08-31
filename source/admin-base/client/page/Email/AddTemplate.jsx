KUI.Email_AddTemplate_comp = class extends RC.CSS{

    render(){

        let p = {
            name : {
                //labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-12',
                ref : 'name',
                placeholder : 'Email Template Name'
            },
            html : {
                ref : 'html'
            }
        };

        let sy = {
            b1 : {
                marginLeft:'10px'
            },
            bc : {
                fontSize:'16px',
                color : '#1ab394',
                position : 'relative',
                top : '2px'
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <RB.Input type="text" {... p.name} />

                        <label>
                            Email Variables
                            <RC.URL style={sy.b1} onClick={this.showEmailModal.bind(this)}><i style={sy.bc} className="fa fa-question-circle"></i></RC.URL>
                        </label>
                        <RB.Input groupClassName="no_margin_bottom" wrapperClassName="col-xs-12">
                            <div {... p.html}></div>
                        </RB.Input>

                    </RB.Col>
                </RB.Row>
                {this.renderEmailModal()}
            </form>
        );
    }

    showEmailModal(){
        this.refs.modal.show();
    }

    renderEmailModal(){
        let param = {
            title : 'Email Variables',
            YesFn : function(){

            },
            renderBody : function(){
                return (
                    <RC.Div>
                        <h4>Quick Help</h4>
                        <hr/>
                        <p>
                            Email Variables:<br/>
                            {`{user} : Account Name`}<br/>
                        </p>
                        <p>
                            {`To use email variables include the {} in the body or subject of your email when you send bulk emails.`}<br/>
                            {`For example, Dear {user}!`}
                        </p>
                    </RC.Div>
                );
            }
        };

        return util.dialog.render.call(this, 'modal', param);
    }

    componentDidMount(){
        super.componentDidMount();
        $(this.refs.html).summernote({
            height : 280,
            resize : false,
            placeholder : 'Email Template Content',
            //disableDragAndDrop : false,
            toolbar : [
                ['style', ['bold', 'italic', 'underline', 'hr']],
                ['font', ['strikethrough']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['view', ['codeview']],
                ['height', ['height']]
            ]
        });
    }

    getValue(){
        let name = this.refs.name.getValue(),
            html = $(this.refs.html).summernote('code');
        return {
            name,
            html
        };
    }

    setDefaultValue(data){
        let name = this.refs.name;
        let html = data.html ? decodeURIComponent(data.html) : '';

        name.getInputDOMNode().value = data.name;
        $(this.refs.html).summernote('code', html);
    }

    reset(){
        this.refs.name.getInputDOMNode().value = '';
        $(this.refs.html).summernote('reset');
    }

};

KUI.Email_AddTemplate = class extends RC.CSS{
    render(){
        return (
            <RC.Div>
                <h3>Add Email Template</h3>
                <hr/>
                <KUI.Email_AddTemplate_comp ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }


    save(){
        let self = this;
        let data = this.refs.form.getValue();
        data.schoolID = KG.DataHelper.getSchoolID();

        let rs = KG.get('EF-EmailTemplate').insert(data);
        console.log(rs);
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('insert success');
                self.refs.form.reset();
                util.goPath('/email');
            },
            error : function(e){
                util.toast.showError('Insert Email template error, Please check');
            }
        });
    }


};

KUI.Email_EditTemplate = class extends KUI.Page{

    getMeteorData(){
        this.m = KG.DataHelper.getDepModule();

        var id = FlowRouter.getParam('emailID');
        let x = Meteor.subscribe('EF-EmailTemplate', {
            _id : id
        });

        return {
            ready : x.ready(),
            id : id,
            data : KG.get('EF-EmailTemplate').getDB().findOne({_id:id})
        };
    }

    save(){
        let self = this;
        let data = this.refs.form.getValue();

        let rs = KG.get('EF-EmailTemplate').updateById(data, this.data.id);
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('update success');
                self.refs.form.reset();
                util.goPath('/email');
            },
            error : function(e){
                util.toast.showError('Insert Email template error, Please check');
            }
        });
    }

    render(){
        if(!this.data.ready){
            return util.renderLoading();
        }
        return (
            <RC.Div>
                <h3>Edit Email Template</h3>
                <hr/>
                <KUI.Email_AddTemplate_comp ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    {this.data.data.canNotDelete ? null : <KUI.NoButton style={{marginRight:'30px'}} onClick={this.delete.bind(this)} label="Delete"></KUI.NoButton> }
                    <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    delete(){
        let self = this;
        swal({
            type : 'warning',
            title : 'Delete this email template?',
            showCancelButton : true,
            closeOnCancel : true,
            closeOnConfirm : false,
            confirmButtonText : 'Confirm',
            confirmButtonColor : '#1ab394'
        }, function(f){
            if(f){
                self.m.EmailTemplate.getDB().remove({_id : self.data.id});
                swal.close();
                util.goPath('/email');
            }
        });
    }

    runOnceAfterDataReady(){
        this.refs.form.setDefaultValue(this.data.data);
    }
};