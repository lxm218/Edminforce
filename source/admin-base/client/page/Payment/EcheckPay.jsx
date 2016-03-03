KUI.Payment_ECheckPay = class extends KUI.Page{
    constructor(p){
        super(p);
        this.total = 0;
    }


    getMeteorData() {
        let orderID = FlowRouter.getParam('orderID');
        let x = Meteor.subscribe('EF-Order', {
            query : {
                _id : orderID
            }
        });
        let data = KG.get('EF-Order').getDB().findOne();
        return {
            ready : x.ready(),
            data : data,
            orderID : orderID
        };
    }

    renderForm(){
        let p = {
            routing : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                label : 'Routing Number',
                ref : 'routing'
            },
            account : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'account',
                label : 'Account Number'
            },
            name : {
                labelClassName : 'col-xs-4',
                wrapperClassName : 'col-xs-8',
                ref : 'name',
                label : 'Name'
            }
        };

        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <RB.Input type="text" {... p.routing} />
                        <RB.Input type="text" {... p.account} />
                        <RB.Input type="text" {... p.name} />

                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    render(){
        if(!this.data.ready){
            return util.renderLoading();
        }

        let data = this.data.data,
            poundage = parseFloat(data.poundage||0) || 0,
            total = data.paymentTotal.replace(/\$/g, '');
        this.total = total;

        return (
            <RC.Div>
                <h3 style={{textAlign:'right'}}>
                    Credit Card | Total : ${total}
                </h3>
                {poundage>0?
                    <p style={{textAlign:'right'}}>Poundage : {poundage*100}%</p>
                    :
                    null
                }
                <hr/>
                {this.renderForm()}
                <RC.Div style={{textAlign:'right'}}>
                    <KUI.YesButton ref="btn" onClick={this.pay.bind(this)} label="Pay Now"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    pay(){
        let json = this.data.data;
        let data = this.getFormValue();
        console.log(data);

        this.refs.btn.loading(true);
        Meteor.call('postPaymentByECheck', data, (error, rs)=>{
            this.refs.btn.loading(false);
            if(error){
                util.toast.showError(error.reason);
                return;
            }
            util.toast.alert('Pay Success');

            //update order db
            let nd = {
                status : 'success'
            };
            KG.get('EF-Order').updateById(nd, this.data.orderID);

            _.delay(function(){
                util.goPath('/registration/success/'+json.details[0]);
            }, 100);
        });
    }

    getFormValue(){
        let data = {
            routingNumber : this.refs.routing.getValue(),
            accountNumber : this.refs.account.getValue(),
            nameOnAccount : this.refs.name.getValue(),
            order : this.data.orderID,
            id : this.data.data.accountID,
            amount : this.total
        };
        return data;
    }
};