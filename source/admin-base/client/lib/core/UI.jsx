window.KUI = {};

var ALL_CLASS = {},
    ALL_REACT_CLASS = {};


var F = {
    define : function(name, opts, parent){
        if(ALL_CLASS[name]) return (name +' component is exist');

        var base = {

            getParent : function(pn){
                var p = ALL_CLASS[this._name]._parent;

                if(p && p.length > 0){
                    if(!pn){
                        return p[0];
                    }
                    else{
                        return _.find(p, function(item){
                            return item._name === pn;
                        });
                    }

                }
                else{
                    throw this._name + ' \' parent is not exist';
                }

            }
        };

        var setting = {};

        parent = parent || [];
        if(!_.isArray(parent)){
            parent = [parent];
        }
        parent = _.map(parent, function(one){
            var x = ALL_CLASS[one];
            if(!x) throw one +' is not defined';

            return x;
        });

        if(parent.length>0){
            var args = [{}].concat(parent).concat(opts);
            setting = _.extend.apply(_, args);

        }
        else{
            setting = _.extend({}, base, opts);
        }
        setting._parent = parent;
        setting._name = name;
        ALL_CLASS[name] = setting;

        var $obj = React.createClass(setting);
        ALL_REACT_CLASS[name] = $obj;

        return $obj;

    },

    getAllClass : function(){
        return ALL_CLASS;
    },

    get : function(name){
        var tmp = ALL_REACT_CLASS[name];

        return tmp || null;
    }

};

KUI.Class = F;


var noop = function(){};
KUI.Class.define('Base', {

    _data_ : {},

    mixins: [ReactMeteorData],
    getMeteorData : function(){
        return {};
    },

    initStart : noop,
    initStyle : function(){
        return {};
    },
    initView : noop,
    initEvent : noop,
    initEnd : noop,
    initProp : function(){
        return {};
    },


    render : function(){
        let self = this;
        this.cache = {
            set : function(key, value){
                self._data_[key] = value;
            },
            get : function(key){
                return self._data_[key];
            }
        };

        this.initStart();
        this.initView();
        this.initEvent();
        this.initEnd();

        var style = this.initStyle(),
            prop = this.initProp();

        var tagName = this.initTag(),
            vh = this.initHtml();

        return this.getRender(style, prop, {
            tag : tagName,
            html : vh
        });
    },

    initTag : function(){
        return <div />;
    },
    initHtml : function(){
        return '';
    },

    getRender : function(style, prop, opts){
        var X = opts.tag,
            html = opts.html;

        return <X style={style} {... prop}>{html}</X>;
    }


});

KUI.dom = {
    prop : function(prop) {

    }
};

KUI.Page = class extends RC.CSSMeteorData{
    constructor(p){
        super(p);

        this.m = KG.DataHelper.getDepModule();
    }

    componentDidMount(){
        super.componentDidMount();

        if(!_.isUndefined(this.data.ready)){
            let loop = ()=>{
                if(!this.data.ready){
                    _.delay(loop.bind(this), 100);
                }
                else{
                    this.runOnceAfterDataReady();
                }
            };

            _.delay(loop.bind(this), 100);
        }

    }
    runOnceAfterDataReady(){

    }
};