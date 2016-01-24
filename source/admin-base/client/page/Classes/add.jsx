
KUI.Classes_add = KUI.Class.define('ui.Classes_add', {

    initStyle : function(){


        return {
            h3 : {
                position : 'relative',
                top : '-10px',
                textAlign : 'center',
                marginBottom : '50px'
            },
            a : {
                marginTop : '50px'
            }
        };
    },

    add : function(){
        let className = this.refs.className,
            teacher = this.refs.teacher,
            schedule = this.refs.schedule;

        alert(className.getValue());
    },

    getRender : function(style){

        let p = {
            colxs : {
                labelClassName : 'col-xs-3',
                wrapperClassName : 'col-xs-9',
                type : 'text'
            }
        };

        return (
            <RB.Row>
                <RB.Col md={8} mdOffset={2}>
                    <form className="form-horizontal">
                        <h3 style={style.h3}>Add New Class</h3>
                        <RB.Input {... p.colxs} ref="className" label="Class Name" />

                        <RB.Input {... p.colxs} ref="teacher" label="Teacher" />
                        <RB.Input {... p.colxs} ref="schedule" label="Schedule" />

                        <RB.Input {... p.colxs} ref="tuition" label="Tuition" />

                        <RB.Input {... p.colxs} ref="minAge" label="Minimum Age" />
                        <RB.Input {... p.colxs} ref="maxAge" label="Maximum Age" />

                        <KUI.YesButton onClick={this.add} top="20px" float="right" label="Add" />

                    </form>
                </RB.Col>
            </RB.Row>
        );
    }
}, 'Base');