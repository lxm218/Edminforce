KUI.Layout = KUI.Class.define('ui.Layout', {

    initStyle : function(){
        return {
            left : {
                minHeight : '200px',
                paddingRight : '20px'
            },
            right : {
                paddingLeft : '20px',
                borderLeft : '1px solid #cdcdcd',
                minHeight : '500px'
            }
        };
    },

    getRender : function(style){

        return <div id="ui-layout">

            <KUI.Header />

            <RB.Grid className="container">
               <RB.Row className="">
                    <RB.Col md={3} style={style.left}>
                        <KUI.LeftNav />
                    </RB.Col>
                   <RB.Col md={9} style={style.right}>

                       <KUI.Body tmpl={this.props.body} />

                   </RB.Col>
               </RB.Row>
            </RB.Grid>





        </div>
    }
}, 'Base');