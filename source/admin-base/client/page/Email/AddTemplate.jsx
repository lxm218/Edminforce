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

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <RB.Input type="text" {... p.name} />
                        <RB.Input wrapperClassName="col-xs-12">
                            <div {... p.html}></div>
                        </RB.Input>
                    </RB.Col>
                </RB.Row>
            </form>
        );
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

        let rs = KG.get('EF-EmailTemplate').insert(data);
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('insert success');
                self.refs.form.reset();
                util.goPath('/email');
            },
            error : function(e){
                util.toast.showError(e.reason);
            }
        });
    }


};

KUI.Email_EditTemplate = class extends KUI.Page{

    getMeteorData(){
        var id = FlowRouter.getParam('emailID');
        let x = Meteor.subscribe('EF-EmailTemplate', {
            _id : id
        });

        return {
            ready : x.ready(),
            id : id,
            data : KG.get('EF-EmailTemplate').getDB().findOne()
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
                util.toast.showError(e.reason);
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
                    <KUI.YesButton onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    runOnceAfterDataReady(){
        this.refs.form.setDefaultValue(this.data.data);
    }
};