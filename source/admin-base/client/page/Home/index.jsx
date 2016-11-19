let sy = {
    rd : {
        textAlign : 'right'
    },
    a : {

    }
};
let PendingBox = class extends RC.CSS{
    constructor(p){
        super(p);
        this.m = KG.DataHelper.getDepModule();

        this.state = {
            list : null
        };
    }

    getStateData(){
        let self = this;
        self.setState({list : 'loading'});

        this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{
            status : 'pending',
            pendingFlag : true
        }, {
            sort : {updateTime : -1},
            pageNum : 1,
            pageSize : 5
        }], {
            success : function(list){
                self.setState({
                    list : list
                });
            }
        });
    }

    removeById(id){
		let list = this.state.list||[];
        let self = this

		this.m.ClassStudent.callMeteorMethod('removeById', [id], {
			success : function(){
				let n = _.findIndex(list.list, {_id:id});

                list.list.splice(n, 1);
                list.count = list.list.length;
                self.setState({
                    list : _.clone(list)
                });
			}
		});
	}

    render() {
        if (!this.state.list) return null;
        if ('loading' === this.state.list) return util.renderLoading();

        let self = this;

        let titleArray = [
            {
                title : 'Class',
                reactDom(doc){
                    return doc.class[0].nickName;
                }
            },
            {
                title : 'Student',
                reactDom(doc){
                    return <RC.URL style={sy.a} href={`/student/${doc.student[0]._id}`}>{doc.student[0].name}</RC.URL>
                }
            },
            {
                title : 'Teacher',
                reactDom(doc){
                    return doc.class[0].teacher;
                }
            },
            {
                title : 'Type',
                key : 'type'
            },
            {
                title : 'Lesson Date',
                reactDom(doc){
                    if(doc.lessonDate){
                        return moment(doc.lessonDate).format(KG.const.dateFormat);
                    }
                    return '';
                }
            },

            {
                title : 'Status',
                key : 'status'
            },
            {
                title : 'Book Date',
                reactDom(doc){
                    return moment(doc.createTime).format(util.const.dateFormat);
                }
            },
            {
                title : 'Action',
                style : {
                    textAlign : 'center',
                    width : '178px'
                },
                reactDom(doc){
                    let sy = {
                        lineHeight : '24px',
                        height : '24px',
                        fontSize : '12px',
                        padding : '0 12px',
                        marginRight: '10px'
                    };

                    let del = function(){
                        swal({
                            title : 'Delete this registration?',
                            type : 'warning',
                            showCancelButton: true,
                            confirmButtonColor: "#1ab394",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, function(f){
                            if(f){
                                self.removeById(doc._id);
                            }
                        });
                    };


                    let goToPay = function(){
                        if(doc.type === 'register'){
                            util.goPath(`/registration/payment/${doc._id}`);
                        }
                        else if(doc.type === 'makeup'){
                            util.goPath('/payment/makeup?classstudentID='+doc._id);
                        }
                    };

                    return (
                        <RC.Div style={{textAlign:'center'}}>
                            <KUI.NoButton style={sy} onClick={goToPay}
                                          label="pay now"></KUI.NoButton>
                            <KUI.NoButton style={sy} onClick={del}
                                          label="Cancel"></KUI.NoButton>

                        </RC.Div>
                    );
                }
            }
        ];

        let list = this.state.list;
        console.log(list);
        return (
            <RC.Div>
                <KUI.Table
                    style={{}}
                    list={list.list}
                    title={titleArray}
                    ref="table"></KUI.Table>
                <p style={sy.rd}><RC.URL href={`/report/classstudent/pending`}>View More</RC.URL></p>
            </RC.Div>

        );
    }

    componentDidMount(){
        this.getStateData();

    }
};

let TrialOrMakeupBox = class extends RC.CSS{
    constructor(p){
        super(p);
        this.m = KG.DataHelper.getDepModule();

        this.state = {
            list : null
        };

        this.page = 1;
    }

    getStateData(){
        let self = this;
        self.setState({list : 'loading'});

        this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{
            status : 'checkouted',
            type : {$in : ['trial', 'makeup']},
            lessonDate : { '$gte' : moment(new Date()).toDate() }
        }, {
            sort : {updateTime : -1},
            pageNum : this.page,
            pageSize : 5
        }], {
            success : function(list){
                self.setState({
                    list : list
                });
            }
        });
    }

    render() {
        if (!this.state.list) return null;
        if ('loading' === this.state.list) return util.renderLoading();

        let titleArray = [
            {
                title : 'Class',
                reactDom(doc){
                    return doc.class[0].nickName;
                }
            },
            {
                title : 'Student',
                reactDom(doc){
                    return <RC.URL style={sy.a} href={`/student/${doc.student[0]._id}`}>{doc.student[0].name}</RC.URL>
                }
            },
            {
                title : 'Teacher',
                reactDom(doc){
                    return doc.class[0].teacher;
                }
            },
            {
                title : 'Type',
                key : 'type'
            },
            {
                title : 'Lesson Date',
                reactDom(doc){
                    if(doc.lessonDate){
                        return moment(doc.lessonDate).format(KG.const.dateFormat);
                    }
                    return '';
                }
            },

            {
                title : 'Book Date',
                reactDom(doc){
                    return moment(doc.updateTime).format(KG.const.dateFormat);
                }
            }
        ];

        let list = this.state.list;
        console.log(list);
        return (
            <RC.Div>
                <KUI.PageTable
                    style={{}}
                    list={list.list}
                    total={list.count}
                    pagesize={5}
                    onSelectPage={this.selectPage.bind(this)}
                    page={this.page}
                    title={titleArray}
                    ref="table"></KUI.PageTable>

            </RC.Div>

        );
    }
    selectPage(page){
        this.page = page;
        this.getStateData();
    }

    componentDidMount(){
        this.getStateData();
    }
};


let WaitingBox = class extends RC.CSS{
    constructor(p){
        super(p);
        this.m = KG.DataHelper.getDepModule();

        this.state = {
            list : null
        };

        this.page = 1;
    }

    getStateData(){
        let self = this;
        self.setState({list : 'loading'});

        this.m.ClassStudent.callMeteorMethod('getAllByQuery', [{
            status : 'checkouted',
            type : 'wait'
        }, {
            sort : {updateTime : -1},
            pageNum : this.page,
            pageSize : 5
        }], {
            success : function(list){
                self.setState({
                    list : list
                });
            }
        });
    }

    render() {
        if (!this.state.list) return null;
        if ('loading' === this.state.list) return util.renderLoading();
console.log(this.state.list.list)
        let titleArray = [
            {
                title : 'Class',
                reactDom(doc){
                    return doc.class[0].nickName;
                }
            },
            {
                title : 'Student',
                reactDom(doc){
                    return <RC.URL style={sy.a} href={`/student/${doc.student[0]._id}`}>{doc.student[0].name}</RC.URL>
                }
            },
            {
                title : 'Registrations',
                reactDom(doc){
                    return `${doc.class[0].numberOfRegistered}/${doc.class[0].numberOfClass}`
                }
            },
            {
                title : 'Teacher',
                reactDom(doc){
                    return doc.class[0].teacher;
                }
            },
            {
                title : 'Book Date',
                reactDom(doc){
                    return moment(doc.updateTime).format(KG.const.dateFormat);
                }
            }
        ];

        let list = this.state.list;
        console.log(list);
        return (
            <RC.Div>
                <KUI.PageTable
                    style={{}}
                    list={list.list}
                    total={list.count}
                    pagesize={5}
                    onSelectPage={this.selectPage.bind(this)}
                    page={this.page}
                    title={titleArray}
                    ref="table"></KUI.PageTable>

            </RC.Div>

        );
    }
    selectPage(page){
        this.page = page;
        this.getStateData();
    }

    componentDidMount(){
        this.getStateData();
    }
};

KUI.Home_index = class extends KUI.Page{

    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();
    }

    getMeteorData(){

        return {
            ready : true
        };
    }


    render(){

        return (
            <RC.Div>
                <h3>Pending Registration</h3>
                <PendingBox />
                <hr/>
                <h3>Trial / Makeup Class</h3>
                <TrialOrMakeupBox />
                <hr/>

                <h3>Waitlist</h3>
                <WaitingBox />
            </RC.Div>
        );
    }
};
