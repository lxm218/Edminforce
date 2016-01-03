
KUI.YesButton = KUI.Class.define('ui.YesButton', {
    initStyle : function(){
        var top = this.props.top || '10px';

        return {
            main : {
                color : '#fff',
                lineHeight : '36px',
                fontSize : '16px',
                fontWeight : '700',
                borderRadius : '5px',
                padding : '0 20px',
                display : 'inline-block',
                marginTop : top,
                float : this.props.float || 'auto'
            }
        };
    },

    click : function(){

        this.props.onClick.apply(this, arguments);
    },

    getRender : function(style){

        return (
            <RB.Button onClick={this.click} style={style.main} bsStyle="primary">{this.props.label}</RB.Button>
        );
    }
}, 'Base');