

KUI.Registration_index = KUI.Class.define('ui.Registration-index', {



    getMeteorData : function(){
        let s = KG.get('EF-Student').getDB(),
            c = KG.get('EF-Class').getDB();

        let cs = KG.get('EF-ClassStudent').getDB();

        return {
            student : s.find().fetch(),
            'class' : c.find().fetch(),
            list : cs.find({}, {
                sort : {
                    createTime : -1
                }
            }).fetch()
        };
    },

    initStyle : function(){


        return {

        };
    },

    getStudentDropdown : function(){

        let options = _.map(this.data.student, (item, index)=>{
            return {
                text : item.name,
                value : index
            };
        });
        options.unshift({
            text : 'please select',
            value : '-1'
        });


        return <RC.Select ref="js_student" value="-1" options={options} label="Student" theme="right" labelColor="brand1"/>;


    },

    getClassDropdown : function(){
        let info = 'Select Class';

        let self = this;
        let select = function(e, key){
            let d = self.data.class[key];
            console.log(d);

            info = d.name;
            let elem = self.refs['dd-class'];
            var dom = $(ReactDOM.findDOMNode(elem));
            dom.html(d.name);

            self.cache.set('classObj', d);
        };


        return <RB.Dropdown id={Meteor.uuid()} onSelect={select} >
            <RB.Button ref="dd-class" bsRole="info">
                {info}
            </RB.Button>
            <RB.Dropdown.Toggle bsStyle="default"/>
            <RB.Dropdown.Menu>
            {
                _.map(this.data.class, (item, index)=>{
                    return <RB.MenuItem key={index} eventKey={index}>{item.name}</RB.MenuItem>
                })

            }
            </RB.Dropdown.Menu>
        </RB.Dropdown>;
    },

    save : function(){
        var c = this.cache.get('classObj');

        let ss = this.refs['js_student'].getValue();
        ss = this.data.student[ss];

        if(!c || !ss){
            alert('please select');
            return false;
        }

        let data = {
            classID : c._id,
            className : c.name,
            studentID : ss._id,
            studentName : ss.name
        };

        let obj = KG.get('EF-ClassStudent'),
            has = obj.checkHasPosition(c._id);

        if(!has){
            if(!confirm('此课程已经满员，可以加入waitlist，是否确认？')){
                return false;
            }
        }

        let rs = KG.get('EF-ClassStudent').save(data);
        KG.result.handle(rs, {
            success : function(data){
                console.log(data);
            }
        });
    },

    getEachTr : function(){
        return <tbody>
        {
            _.map(this.data.list, (item, index)=>{
                return <tr key={index}>
                    <td>
                        {item._id}
                    </td>
                    <td>
                        {item.className}
                    </td>
                    <td>
                        {item.studentName}
                    </td>
                    <td>
                        {item.status}
                    </td>
                    <td>
                        {h.time_format(item.createTime)}
                    </td>


                </tr>;
            })
        }
        </tbody>;

    },

    getTable : function(){
        let style = {
            marginTop : 50
        };

        return (
            <RB.Table style={style} striped bordered condensed hover>
                <thead>


                </thead>
                {
                    this.getEachTr()
                }
            </RB.Table>

        );

    },


    getRender : function(style){

        return (
            <div>
                <h4>Register Class</h4>

                {this.getStudentDropdown()}

                {this.getClassDropdown()}
                <br/>
                <KUI.YesButton label="Save and Continue" top="80" onClick={this.save} />
                <br />
                {this.getTable()}
            </div>
        );

    }

}, 'Base');