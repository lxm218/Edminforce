
KUI.Class_detail = class extends RC.CSSMeteorData{
    constructor(p){
        super(p);

        this.state = {

        };
    }

    getClassId(){
        return FlowRouter.current().params.id;
    }

    getMeteorData(){
        Meteor.subscribe('EF-Class');

        let id = this.getClassId();
        let data = KG.get('EF-Class').getAll({
            _id : id
        })[0];

        return {
            data : data
        };
    }

    baseStyles(){
        return {

        };
    }

    render(){
        let data = this.data.data;

        return (
            <RC.Div>
                <h3>{data.nickName}</h3>
                <hr/>
                <KUI.Class_comp_add init-data={data} ref="form"></KUI.Class_comp_add>
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.update.bind(this)} label="Save Change"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }


    update(){
        let self = this;
        let data = this.refs.form.getValue();
        console.log(data);

        let rs = KG.get('EF-Class').updateById(data, this.getClassId());
        KG.result.handle(rs, {
            success : function(json){
                console.log(json);
                alert('update success');

            }
        });
    }
};