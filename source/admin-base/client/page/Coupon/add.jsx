
KUI.Coupon_comp_add = class extends RC.CSSMeteorData{

    getMeteorData(){
        Meteor.subscribe('EF-Program');

        return {
            program : KG.get('EF-Program').getDB().find({}).fetch()
        };
    }

    baseStyles(){
        return {

        };
    }

    render(){

        let style = this.css.get('styles');
        const sy = {
            td : {
                textAlign : 'left'
            },
            checkout : {
                position : 'relative',
                left : '8px',
                top : '-6px'
            }
        };

        let p = {
            discount : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'wrapper',
                label : 'Discount'
            },
            description : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'description',
                label : 'Description'
            },
            workover : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'workover',
                label : 'Works over'
            },
            forP : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'forP',
                label : 'For',
                multiple : true
            },
            weekday : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'weekday',
                label : 'On',
                multiple : true
            },
            times : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'times',
                label : 'Count'
            },
            validForNew : {
                ref : 'validForNew',
                onChange : function(){},
                label : 'valid for new customers who haven\'t booked bofore'
            }

        };

        let option = {
            program : this.data.program,
            weekday : ['all', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
        };


        return (
            <form className="form-horizontal">
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <RB.Input {... p.discount}>
                            <RB.Row>
                                <RB.Col xs={4}>
                                    <input ref="discount" type="text" className="form-control" />
                                </RB.Col>
                                <RB.Col xs={2}>
                                    <select ref="discount_unit" className="form-control">
                                        <option>%</option>
                                        <option>$</option>
                                    </select>
                                </RB.Col>
                            </RB.Row>
                        </RB.Input>


                        <RB.Input type="textarea" {... p.description} />
                        <RB.Input type="text" {... p.workover} />
                        <RB.Input type="select" {... p.forP}>
                            <option value="all">all</option>
                            {
                                _.map(option.program, (item, index)=>{
                                    return <option key={index} value={item._id}>{item.name}</option>;
                                })
                            }
                        </RB.Input>
                        <div ref="date" className="form-group">
                            <label className="control-label col-xs-3">
                                <span>Date</span>
                            </label>
                            <div className="col-xs-9">
                                <div className="input-daterange input-group" >
                                    <input style={sy.td} type="text" className="input-sm form-control" name="start" />
                                    <span className="input-group-addon">to</span>
                                    <input style={sy.td} type="text" className="input-sm form-control" name="end" />
                                </div>
                            </div>

                        </div>
                        <RB.Input type="select" {... p.weekday}>
                            {
                                _.map(option.weekday, (item, index)=>{
                                    return <option key={index} value={item}>{item}</option>;
                                })
                            }
                        </RB.Input>
                        <RB.Input type="text" {... p.times} />
                        <div style={sy.checkout} className="col-md-9 col-md-offset-3">
                            <RB.Input type="checkbox" {... p.validForNew} />
                        </div>

                    </RB.Col>
                </RB.Row>
            </form>
        );
    }

    getRefs(){
        let date = this.refs.date;

        return {
            discount : this.refs.discount,
            dis_unit : this.refs.discount_unit,
            description : this.refs.description,
            workover : this.refs.workover,
            forP : this.refs.forP,
            weekday : this.refs.weekday,
            count : this.refs.times,
            date : date,
            startDateJq : $(date).find('input').eq(0),
            endDateJq : $(date).find('input').eq(1),

            validForNew : this.refs.validForNew
        };
    }

    componentDidMount(){

        let {date} = this.getRefs();
        date = $(date);

        date.find('.input-daterange').datepicker({});
    }

    getValue(){
        let {
            discount, dis_unit, description, workover,
            forP, weekday, count, startDateJq, endDateJq,
            validForNew

            } = this.getRefs();

        return {
            discount : discount.value + dis_unit.value,
            description : description.getValue(),
            overRequire : workover.getValue(),
            weekdayRequire : weekday.getValue(),
            useFor : forP.getValue(),
            maxCount : count.getValue(),
            startDate : moment(startDateJq.val(), util.const.dateFormat).toDate(),
            endDate : moment(endDateJq.val(), util.const.dateFormat).toDate(),

            validForNoBooked : $(validForNew.getInputDOMNode()).prop('checked')
        };
    }
};

KUI.Coupon_add = class extends KUI.Page{

    getMeteorData(){
        return {};
    }

    render(){
        return (
            <RC.Div>
                <KUI.Coupon_comp_add ref="form" />
                <RC.Div style={{textAlign:'right'}}>

                    <KUI.NoButton onClick={this.back.bind(this)} label="Back"></KUI.NoButton>
                    <KUI.YesButton style={{marginLeft:'20px'}} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                </RC.Div>
            </RC.Div>
        );
    }

    back(){
        try{
            history.go(-1);
        }catch(e){}
    }

    save(){

        let data = this.refs.form.getValue();
        console.log(data);

        let rs = KG.get('EF-Coupon').save(data);
        KG.result.handle(rs, {
            success : function(){
                util.dialog.alert('insert success');
                util.goPath('/program/coupon');
            },
            error : function(e, error){
                util.toast.showError(error.statusText);
            }
        });
    }
};