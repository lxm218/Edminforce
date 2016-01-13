

KUI.Registration_index = KUI.Class.define('ui.Registration-index', {



    getMeteorData : function(){
        let s = KG.get('EF-Student').getDB(),
            c = KG.get('EF-Class').getDB();

        return {
            student : s.find().fetch(),
            'class' : c.find().fetch()
        };
    },

    initStyle : function(){


        return {

        };
    },

    getStudentDropdown : function(){

        return <RB.DropdownButton title="select student" id="bg-nested-dropdown">
            {
                _.map(this.data.student, (item, index)=>{
                    return <RB.MenuItem key={index} eventKey={index}>{item.name}</RB.MenuItem>
                })

            }
        </RB.DropdownButton>;

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
        console.log(c);
    },
    addWaitList : function(){

    },

    getRender : function(style){

        return (
            <div>
                <h4>Register Class</h4>

                {this.getStudentDropdown()}
                <br/>
                {this.getClassDropdown()}

                <KUI.YesButton label="Save and Continue" top="80" onClick={this.save} />
                <KUI.YesButton label="Add Waitlist" top="80" onClick={this.addWaitList} />
            </div>
        );

    }

}, 'Base');