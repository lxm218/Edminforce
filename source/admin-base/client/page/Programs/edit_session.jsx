
KUI.Session_edit = class extends KUI.Page{

    constructor(p){
        super(p);

        this.state = {
            blockList : []
        };

    }

    getMeteorData(){
        let id = FlowRouter.current().params.id;
        let x = Meteor.subscribe('EF-Session');

        let data = KG.get('EF-Session').getDB().findOne({_id:id})



        return {
            data : data,
            ready : x.ready(),
            id : id
        };
    }

    render(){



        return (
            <RC.Div>
                {util.renderLoading({isReady:this.data.ready})}
                <h3>Session Edit</h3>
                <hr/>
                {this.getAddBox()}
            </RC.Div>
        );
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

                            <RC.Div style={{textAlign:'right'}}>
                                <KUI.NoButton onClick={this.goBack.bind(this)} label="Back"></KUI.NoButton>
                                <KUI.YesButton style={sy.ml} onClick={this.save.bind(this)} label="Save"></KUI.YesButton>
                            </RC.Div>
                        </form>
                    </RB.Col>
                </RB.Row>
            </RC.Div>
        );
    }

    goBack(){
        util.goPath('/program/session');
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

    setDefaultValue(){
        let data = this.data.data;
        if(!data) return;
        console.log(data);
        let {sd1, sd2, sname, ss} = this.getAddBoxRefs();

        $(sd1.getInputDOMNode()).datepicker('setDate', data.registrationStartDate);
        sname.getInputDOMNode().value = data.name;
        $(sd2).find('input').eq(0).datepicker('setDate', data.startDate);
        $(sd2).find('input').eq(1).datepicker('setDate', data.endDate);
        ss.getInputDOMNode().value = data.registrationStatus;

        let day = data.blockOutDay || [];
        this.setState({
            blockList : day
        });

    }

    setBlockOutDayListBox(){
        let list = this.state.blockList;

        const sy = {
            sp : {
                display : 'inline-block',
                margin : '0 20px 10px 0'
            }
        };

        let self = this;
        let del = function(index){
            return function(){
                let list = _.clone(self.state.blockList);
                list.splice(index, 1);
                self.setState({
                    blockList : list
                });
            }
        };

        return (
            <div className="form-group">
                <label className="control-label col-xs-3">
                </label>
                <div className="col-xs-9">
                    {
                        _.map(this.state.blockList, (item, n)=>{
                            return <span onClick={del(n)} style={sy.sp} className="label" key={n}>{moment(item).format('MM/DD/YYYY')}</span>;
                        })
                    }
                </div>
            </div>
        );
    }


    componentDidMount(){
        super.componentDidMount();

        let {sd1, sd2, blockDay} = this.getAddBoxRefs();
        $(sd1.getInputDOMNode()).datepicker({});

        $(blockDay.getInputDOMNode()).datepicker({});
        sd2 = $(sd2);
        sd2.find('.input-daterange').datepicker({});


    }

    runOnceAfterDataReady(){
        console.log(1111, this.data.ready);
        this.setDefaultValue();
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
            registrationStatus : ss.getValue()
        };

        data.startDate = moment(data.startDate, format).toDate();
        data.endDate = moment(data.endDate, format).toDate();
        data.registrationStartDate = moment(data.registrationStartDate, format).toDate();
        data.blockOutDay = this.state.blockList;

        console.log(data);

        let rs = KG.get('EF-Session').updateById(data, this.data.id);
        KG.result.handle(rs, {
            success : function(){
                alert('update success');
                util.goPath('/program/session');
            }
        });
    }

};