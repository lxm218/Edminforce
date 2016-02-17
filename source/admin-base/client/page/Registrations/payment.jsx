KUI.Registration_payment = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            step : 'step1'
        };
    }

    getMeteorData(){
        let id = FlowRouter.getParam('id');

        let s1 = Meteor.subscribe('EF-ClassStudent', {
            query : {
                _id : id
            }
        });

        let one = KG.get('EF-ClassStudent').getDB().findOne();

        if(!s1.ready()){
            return {
                ready : false
            };
        }


        let s2 = Meteor.subscribe('EF-Class', {
            query : {
                _id : one.classID
            }
        });
        let s3 = Meteor.subscribe('EF-Student', {
            query : {
                _id : one.studentID
            }
        });


        return {
            id : id,
            data : one,
            'class' : KG.get('EF-Class').getAll()[0],
            student : KG.get('EF-Student').getDB().findOne(),
            ready : s2.ready() && s3.ready()
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
        if(!this.data.ready || !this.data.class){
            return util.renderLoading();
        }

        let student = this.data.student,
            cls = this.data.class,
            one = this.data.data;
        let list = [
            {
                item : cls.nickName,
                amount : cls.tuition.type==='class'?cls.tuition.money*cls.numberOfClass : cls.tuition.money
            },
            {
                item : 'Credit',
                amount : '-$20'
            },
            {
                item : 'New student discount',
                amount : '$10'
            },
            {
                item : 'Total',
                amount : '1000'
            }
        ];

        return (
            <RC.Div>
                <h3>Register Class</h3>
                <hr/>
                <p>Student : {student.nickName}</p>
                <p>Class : {cls.nickName}</p>
                {this.renderTable(list)}
                {this.renderStep1()}
                {this.renderStep2()}
            </RC.Div>
        );
    }

    renderTable(list){
        const titleArray = [
            {
                title : 'Item',
                key : 'item'
            },
            {
                title : 'Amount',
                key : 'amount'
            }
        ];


        return (
            <KUI.Table
                style={{}}
                list={list}
                title={titleArray}
                ref="table"></KUI.Table>
        );
    }

    renderStep1(){
        let dsp = {
            display : 'block'
        };
        if(this.state.step !== 'step1'){
            dsp.display = 'none';
        }
        let sy = this.css.get('styles');
        return (
            <RC.Div style={dsp}>
                <RB.Input onChange={function(){}} ref="s11" type="checkbox" label="Apply Club Credit" />
                <RB.Input onChange={function(){}} ref="s12" type="checkbox" label="New Customer Coupon" />
                <RC.Div style={{textAlign:'right'}}>
                    {/*<KUI.NoButton onClick={} label="Cancel"></KUI.NoButton>*/}
                    <KUI.YesButton onClick={this.toStep2.bind(this)} style={sy.ml} label="Next"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    renderStep2(){
        let dsp = {
            display : 'block'
        };
        if(this.state.step !== 'step2'){
            dsp.display = 'none';
        }
        let sy = this.css.get('styles');
        return (
            <RC.Div style={dsp}>
                <RB.Input onChange={function(){}} ref="s21" type="checkbox" label="Credit Card/Debit Card" />
                <RB.Input onChange={function(){}} ref="s22" type="checkbox" label="Checking Account" />
                <RB.Input onChange={function(){}} ref="s23" type="checkbox" label="Cash" />
                <RB.Input onChange={function(){}} ref="s24" type="checkbox" label="Check" />
                <RB.Input onChange={function(){}} ref="s25" type="checkbox" label="Gift Card" />
                <RC.Div style={{textAlign:'right'}}>
                    {<KUI.NoButton onClick={this.toStep1.bind(this)} label="Cancel"></KUI.NoButton>}
                    <KUI.YesButton onClick={this.toPaymentPage.bind(this)} style={sy.ml} label="Next"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    toStep2(){
        this.setState({
            step : 'step2'
        });
    }
    toStep1(){
        this.setState({
            step : 'step1'
        });
    }

    toPaymentPage(){
        alert('to yifan page');
    }


};