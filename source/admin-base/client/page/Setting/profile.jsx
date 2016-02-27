KUI.Setting_profile = class extends KUI.Page{


    getMeteorData(){
        let query = {_id:Meteor.userId()};
        let x = Meteor.subscribe('EF-AdminUser', query);
        let y = Meteor.subscribe('EF-School');

        let one = KG.get('EF-AdminUser').getAll(query)[0];

        return {
            ready : x.ready() && y.ready(),
            profile : one
        };
    }

    baseStyles(){
        return {
            ml : {
                marginLeft : '20px'
            }
        };
    }

    render(){
        if(!this.data.ready){
            return util.renderLoading();
        }

        let sy = this.css.get('styles');
        return (
            <RC.Div>
                <h3>Create New Account</h3>
                <hr/>
                <KUI.Setting_add_comp type="edit" ref="form" />
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.NoButton href="/setting" label="Cancel" />
                    <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    runOnceAfterDataReady(){
        let data = this.data.profile;
        data.school = KG.get('EF-School').getInfo();
        this.refs.form.setDefaultValue(data);

        if(this.data.profile.role === 'admin'){
            this.refs.form.showSchoolArea();
        }
    }

    save(){
        let self = this;
        let data = this.refs.form.getValue();
        console.log(data);

        let rs = KG.get('EF-AdminUser').updateById(data, Meteor.userId());
        KG.result.handle(rs, {
            success : function(){
                util.toast.alert('Update Success');
                util.goPath('/setting');
            },
            error : function(e){
                util.toast.showError(e.reason);
            }
        });


    }
};