
KUI.Program_session = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            showAddBox : false,
            blockList : []
        };

    }

    getMeteorData(){

        let x = Meteor.subscribe('EF-Session');

        let list = this.getSessionModule().getDB().find({}, {
            sort : {
                createTime : -1
            }
        }).fetch();

        return {
            ready : x.ready(),
            list : list
        };
    }

    render(){

        let style = this.css.get('styles');

        const titleArray = [
            {
                title : 'Sessions',
                key : 'name'
            },
            {
                title : 'Start Date',
                reactDom(doc){
                    return doc.recurring?'':doc.startDate;
                }
            },
            {
                title : 'End Date',
                reactDom(doc){
                    return doc.recurring?'':doc.endDate;
                }
            },
            {
                title : 'Registration Start Date',
                key : 'registrationStartDate'
            },
            {
                title : 'Registration Status',
                key : 'registrationStatus'
            },
            {
                title : 'isRecurring',
                reactDom(doc){
                    return doc.recurring ? 'Yes' : 'No';
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
                            msg : 'Delete this Session?',
                            YesFn : function(){
                                let rs = KG.get('EF-Session').removeById(item._id, function(flag, err){
                                    if(!flag){
                                        alert(err);
                                    }

                                });

                            }
                        });
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <RC.URL href={`/program/session/edit/${item._id}`}><KUI.Icon icon="edit" font="18px" color="#1ab394" style={sy}></KUI.Icon></RC.URL>
                            {/*<KUI.Icon onClick={del} icon="trash-o" font="18px" color="#cdcdcd" style={ml}></KUI.Icon>
                            */}
                        </RC.Div>

                    );
                }
            }
        ];

        let format = 'YYYY-MM-DD';
        var list = _.map(this.data.list, (item)=>{
            item.startDate = moment(item.startDate).format(format);
            item.endDate = moment(item.endDate).format(format);
            item.registrationStartDate = moment(item.registrationStartDate).format(format);
            return item;
        });


        return (
            <RC.Div>
                <KUI.ProgramTopTab select={1} />

                <KUI.Table
                    style={style.table}
                    list={list}
                    title={titleArray}
                    ref="table"></KUI.Table>

                <RC.Div style={style.rd}>
                    <KUI.YesButton onClick={this.showAddBox.bind(this)} label="Add"></KUI.YesButton>
                </RC.Div>

                {this.getAddBox()}
            </RC.Div>
        );
    }

    baseStyles(){
        return {
            table : {
                marginTop : '20px'
            },

            rd : {
                textAlign : 'right'
            }
        };
    }

    runOnceAfterDataReady(){

        let {sd1, sd2, blockDay} = this.getAddBoxRefs();
        $(sd1.getInputDOMNode()).datepicker({});

        $(blockDay.getInputDOMNode()).datepicker({});
        sd2 = $(sd2);
        sd2.find('.input-daterange').datepicker({});
    }

    addBlockDayToList(){
        var m = this.refs['blockDay'];
        let v = m.getValue();

        if(!v){
            alert('please select blockout day');
            return;
        }

        //注意这里，如果this.state赋值的时候指向同一个引用，则不会引起重绘。
        //可以去掉_.clone看效果
        let list = _.clone(this.state.blockList);
        list.push(moment(v, util.const.dateFormat).toDate());

        this.setState({
            blockList : list
        });

        $(m.getInputDOMNode()).datepicker('clearDates');

    }

    getAddBox(){

        var p = {
            name : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                ref : 'sname',
                label : 'Session Name'
            },
            sd1 : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'sd1',
                label : 'Registration Start Date'
            },

            ss : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-4',
                ref : 'ss',
                label : 'Registration Status'
            },
            blockDay : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-5',
                ref : 'blockDay',
                label : 'Blockout Day'
            }
        };

        const style = {
            marginTop : '40px',
            display : this.state.showAddBox ? 'block' : 'none'
        };

        const sy = {
            td : {
                textAlign : 'left'
            },
            ml : {
                marginLeft : '20px'
            },
            btn : {
                color : '#1ab394',
                cursor : 'pointer'
            }
        };

        let option = ['Yes', 'No'];



        let blockDayButton = <b onClick={this.addBlockDayToList.bind(this)} style={sy.btn}>Add</b>;


        return (
            <RC.Div style={style}>
                <hr />
                <RB.Row>
                    <RB.Col md={12} mdOffset={0}>
                        <form className="form-horizontal">

                            <RB.Input type="text" {... p.name} />

                            <div ref="sd2" className="form-group">
                                <label className="control-label col-xs-3">
                                    <span>Session Schedule</span>
                                </label>
                                <div className="col-xs-9">
                                    <div className="input-daterange input-group" >
                                        <input style={sy.td} type="text" className="input-sm form-control" name="start" />
                                        <span className="input-group-addon">to</span>
                                        <input style={sy.td} type="text" className="input-sm form-control" name="end" />
                                    </div>


                                    <RB.Input wrapperClassName="col-xs-9 col-xs-offset-3 kg-TR" onChange={this.changeRecurring.bind(this)} ref="recurring" type="checkbox" label="Recurring" />
                                </div>


                            </div>



                            <RB.Input type="text" {... p.sd1} />

                            <RB.Input type="text" {... p.blockDay} addonAfter={blockDayButton} />
                            {this.setBlockOutDayListBox()}


                            <RB.Input type="select" {... p.ss}>
                                {
                                    _.map(option, (item, index)=>{
                                        return <option key={index} value={item}>{item}</option>;
                                    })
                                }
                            </RB.Input>

                            <RC.Div style={this.css.get('styles').rd}>
                                <KUI.NoButton onClick={this.resetAddBox.bind(this)} label="Cancel"></KUI.NoButton>
                                <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    showAddBox(){
        if(!util.user.checkPermission('session', 'view')){
            return swal(util.const.NoOperatorPermission, '', 'error');
        }

        this.setState({
            showAddBox : true
        });
    }

    changeRecurring(e){
        let {sd2} = this.getAddBoxRefs();
        let jq = $(e.target);
        //console.log(jq.prop('checked'));


        $(sd2).find('input').eq(0).attr('disabled', jq.prop('checked'));
        $(sd2).find('input').eq(1).attr('disabled', jq.prop('checked'));

    }

    getAddBoxRefs(){
        let arr = ['sd1', 'sd2', 'sname', 'ss', 'blockDay'];
        arr = _.map(arr, (item)=>{
            return this.refs[item];
        });

        return {
            sname : arr[2],
            sd1 : arr[0],
            'sd2' : arr[1],
            ss : arr[3],
            blockDay : arr[4]
        };

    }

    save(){
        let self = this;
        let {sd1, sd2, sname, ss, blockDay} = this.getAddBoxRefs();

        let format = util.const.dateFormat;

        let data = {
            name : sname.getValue(),
            startDate : $(sd2).find('input').eq(0).val(),
            endDate : $(sd2).find('input').eq(1).val(),
            registrationStartDate : sd1.getValue(),
            registrationStatus : ss.getValue(),
            schoolID : self.loginUser.schoolID
        };

        data.startDate = moment(data.startDate, format).toDate();
        data.endDate = moment(data.endDate, format).toDate();
        data.registrationStartDate = moment(data.registrationStartDate, format).toDate();
        data.blockOutDay = this.state.blockList;

        if(util.getReactJQueryObject(this.refs.recurring.getInputDOMNode()).prop('checked')){
            data.recurring = true;
            data.startDate = new Date();
            data.endDate = new Date();
        }

        console.log(data);

        let rs = this.getSessionModule().insert(data);
        KG.result.handle(rs, {
            success : function(){
                alert('insert success');
                self.resetAddBox();
            }
        });
    }

    resetAddBox(){
        let {sd1, sd2, sname, ss} = this.getAddBoxRefs();
        sname.getInputDOMNode().value = '';
        $(sd1.getInputDOMNode()).datepicker('clearDates');
        $(sd2).find('input').eq(0).datepicker('clearDates');
        $(sd2).find('input').eq(1).datepicker('clearDates');
        ss.getInputDOMNode().value = 'Yes';

        this.setState({
            showAddBox : false
        });
    }

    getSessionModule(){
        return KG.get('EF-Session');
    }

    setBlockOutDayListBox(){
        let list = this.state.blockList;

        const sy = {
            sp : {
                display : 'inline-block',
                margin : '0 20px 10px 0'
            }
        };

        return (
            <div className="form-group">
                <label className="control-label col-xs-3">
                </label>
                <div className="col-xs-9">
                    {
                        _.map(this.state.blockList, (item, n)=>{
                            return <span style={sy.sp} className="label" key={n}>{moment(item).format('MM/DD/YYYY')}</span>;
                        })
                    }
                </div>
            </div>
        );
    }

};