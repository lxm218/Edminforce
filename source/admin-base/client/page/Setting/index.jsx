KUI.Setting_index = class extends KUI.Page{

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
                {this.renderTable()}
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton style={sy.ml} href="/setting/permission/edit" label="Edit Permission"></KUI.YesButton>

                    <KUI.YesButton style={sy.ml} href="/setting/account/list" label="Staff List"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} href="/setting/changepassword" label="Change Password"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} href="/setting/account/edit" label="Edit"></KUI.YesButton>
                    <KUI.YesButton style={sy.ml} href="/setting/account/add" label="Add"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    };

    renderTable(){
        const titleArray = [
            {
                title : 'Item',
                key : 'item'
            },
            {
                title : 'Value',
                key : 'value'
            }
        ];

        let school = KG.get('EF-School').getInfo();
        const keyList = [
            {title : 'Name', key : 'nickName'},
            {title : 'Email', key : 'email'},
            {title : 'Role', key : 'role'},
            {title : 'Phone', key : 'phone'},
            {title : 'School Name', key : function(data){return school.name;}},
            {title : 'School Email', key : function(data){return school.email;}},
            {title : 'School Domain', key : function(data){return school.domain;}},
            {title : 'School Phone', key : function(data){return school.phone;}},
            {title : 'School Address', key : function(data){return school.allAddress;}},
            {title : 'School Timezone', key : function(data){return school.timezoneString||''}},
            {title : 'School Registration Fee', key : function(data){return school.registrationFee||0}},
            {title : 'School Surcharge', key : function(data){return school.surcharge||0}}
        ];

        let profile = this.data.profile,
            list = _.map(keyList, (item)=>{
                return {
                    item : item.title,
                    value : _.isFunction(item.key)?item.key(profile):profile[item.key]
                };
            });

        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }
};