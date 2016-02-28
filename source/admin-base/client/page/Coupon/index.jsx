
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
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center'
                },
                reactDom : function(item){
                    const sy = {
                        cursor : 'pointer',
                        position : 'relative',
                        top : '2px'
                    };
                    const ml = {
                        marginLeft : '10px',
                        cursor : 'pointer'
                    };

                    var del = function(){
                        util.dialog.confirm({
                            msg : 'delete this coupon?',
                            YesFn : function(){
                                KG.get('EF-Coupon').getDB().remove({
                                    _id : item._id
                                });
                            }
                        });
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/program/coupon/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            <KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                        </RC.Div>

                    );
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