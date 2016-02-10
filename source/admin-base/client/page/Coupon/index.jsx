
KUI.Coupon_index = class extends KUI.Page{

    getMeteorData(){

        let x = Meteor.subscribe('EF-Coupon');

        return {
            ready : x.ready(),
            list : KG.get('EF-Coupon').getDB().find({}, {sort:{updateTime:-1}}).fetch()
        };
    }

    renderTable(){

        if(!this.data.ready){
            return util.renderLoading();
        }

        let titleArray = [
            {
                title : 'Code',
                key : '_id'
            },
            {
                title : 'Coupon',
                key : 'discount'
            },
            {
                title : 'Description',
                key : 'description'
            },
            {
                title : 'Start Date',
                key : 'startDate',
                reactDom : function(doc){
                    let date = doc.startDate;
                    return moment(date).format(util.const.dateFormat);
                }
            },
            {
                title : 'End Date',
                key : 'endDate',
                reactDom : function(doc){
                    let date = doc.endDate;
                    return moment(date).format(util.const.dateFormat);
                }
            }
        ];

        return (
            <KUI.Table
                style={{}}
                list={this.data.list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    toAdd(){
        util.goPath('/program/coupon/add');
    }

    render(){

        return (
            <RC.Div>
                <KUI.ProgramTopTab select={3} />
                <hr/>
                {this.renderTable()}
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton onClick={this.toAdd} label="Add"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

};