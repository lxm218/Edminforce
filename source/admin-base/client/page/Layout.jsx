KUI.Layout = KUI.Class.define('ui.Layout', {

    initStyle : function(){
        return {
            left : {

            },
            right : {

            },
            con : {
                position : 'relative'
            }
        };
    },


    getRender : function(style){

        return <div id="ui-layout">

            <KUI.Header />

            <div className="container" style={style.con}>
                <KUI.LeftNav />
                <div id="page-wrapper" style={{paddingRight:0}}>

                    <div style={
                        {
                            paddingTop : 0

                        }
                    } className="wrapper wrapper-content animated fadeInRight">
                        <div className="ibox">
                            <div className="ibox-content">
                                <KUI.Body tmpl={this.props.body} />
                            </div>
                        </div>

                    </div>

                    <div className="footer"></div>
                </div>
            </div>





        </div>
    }
}, 'Base');