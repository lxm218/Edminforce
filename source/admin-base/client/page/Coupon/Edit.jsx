KUI.Coupon_Edit = class extends KUI.Page{

    getMeteorData(){
        let id = FlowRouter.getParam('id');

        let x = Meteor.subscribe('EF-Coupon', {
            query : {_id : id}
        });

        return {
            ready : x.ready(),
            data : KG.get('EF-Coupon').getDB().findOne({_id:id}),
            id : id
        };
    }

    render(){
        if(!util.user.checkPermission('coupon', 'user')){
            util.render.stop(this);
            return util.renderNoViewPermission();
        }

        if(!this.data.ready){
            return util.renderLoading();
        }

        return (
            <RC.Div>
                <h3>Edit Coupon</h3>
                <hr/>
                <KUI.Coupon_comp_add ref="form" type="edit" />
                <RC.Div style={{textAlign:'right'}}>

                    <KUI.YesButton style={{marginLeft:'20px'}} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    runOnceAfterDataReady(){
        this.refs.form.setDefaultValue(this.data.data);
    }

    save(){
        let data = this.refs.form.getValue();
        delete data._id;

        let rs = KG.get('EF-Coupon').updateById(data, this.data.id);
        console.log(rs);
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('update success');
                util.goPath('/program/coupon');
            },
            error : function(error){
                util.toast.showError(error.reason);
            }
        });
    }
};