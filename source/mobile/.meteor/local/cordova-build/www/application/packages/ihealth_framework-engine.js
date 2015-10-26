//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var moment = Package['momentjs:moment'].moment;
var DefaultRoutes = Package['ihealth:utils'].DefaultRoutes;
var h = Package['ihealth:utils'].h;
var IH = Package['ihealth:utils'].IH;
var React = Package['react-runtime'].React;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var Roles = Package['alanning:roles'].Roles;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var check = Package.check.check;
var Match = Package.check.Match;
var FastRender = Package['meteorhacks:fast-render'].FastRender;
var __init_fast_render = Package['meteorhacks:fast-render'].__init_fast_render;
var FastClick = Package.fastclick.FastClick;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var RC, fw;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/framework.jsx                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC = {};                                                                                                              // 2
                                                                                                                      //
RC.NotFound = React.createClass({                                                                                     // 4
  displayName: "NotFound",                                                                                            //
                                                                                                                      //
  render: function () {                                                                                               // 5
    return React.createElement(                                                                                       // 6
      "div",                                                                                                          //
      { className: "table bg-brand-light" },                                                                          //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "inside center" },                                                                               //
        React.createElement(                                                                                          //
          "h4",                                                                                                       //
          null,                                                                                                       //
          "Component Not Found"                                                                                       //
        )                                                                                                             //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
RC.Avatar = React.createClass({                                                                                       // 14
  displayName: "Avatar",                                                                                              //
                                                                                                                      //
  render: function () {                                                                                               // 15
    if (!this.props.src && !this.props.uiClass) return null;                                                          // 16
                                                                                                                      //
    return React.createElement(                                                                                       // 18
      "figure",                                                                                                       //
      { className: "avatar background round overflow" + (this.props.src ? "" : " none"), style: this.props.src ? { backgroundImage: "url(" + this.props.src + ")" } : {} },
      !this.props.src ? React.createElement(RC.uiIcon, { theme: this.props.theme, uiClass: this.props.uiClass, uiColor: this.props.uiColor, uiSize: this.props.uiSize }) : null
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
RC.uiIcon = React.createClass({                                                                                       // 24
  displayName: "uiIcon",                                                                                              //
                                                                                                                      //
  propTypes: {                                                                                                        // 25
    uiClass: React.PropTypes.string,                                                                                  // 26
    // uiSize: THIS IS FLEXIBLE                                                                                       //
    // uiBrand: THIS IS FLEXIBLE                                                                                      //
    uiColor: React.PropTypes.string                                                                                   // 29
  },                                                                                                                  //
  render: function () {                                                                                               // 31
    if (!this.props.uiClass) return null;                                                                             // 32
                                                                                                                      //
    // Round to closest 5 decimals                                                                                    //
    // let uiOpacity = !this.props.uiOpacity ? 75 : Number(this.props.uiOpacity)*100                                  //
    // uiOpacity = 5 * Math.round(uiOpacity/5)                                                                        //
                                                                                                                      //
    var styles = {};                                                                                                  // 38
    var brandNum = _.isNumber(this.props.uiBrand) ? this.props.uiBrand : this.props.uiBrand || -1;                    // 39
    var sizeList = ["", "fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"];                                                 // 40
    var brandList = ["bg-brand", "bg-brand2", "bg-brand3"];                                                           // 41
                                                                                                                      //
    // Brand                                                                                                          //
    if (_.isString(brandNum) && _.contains(["brand", "brand1", "brand2", "brand3"], brandNum)) brandNum = ({          // 44
      brand: 0,                                                                                                       // 46
      brand1: 0,                                                                                                      // 47
      brand2: 1,                                                                                                      // 48
      brand3: 2                                                                                                       // 49
    })[brandNum];                                                                                                     //
                                                                                                                      //
    var classList = ["fa", "fa-" + this.props.uiClass.trim(), this.props.className || ""];                            // 52
                                                                                                                      //
    // Color                                                                                                          //
    if (h.checkColorClass(this.props.uiColor)) classList.push(this.props.uiColor);else if (this.props.uiColor) styles.color = this.props.uiColor;
                                                                                                                      //
    // Size                                                                                                           //
    if (_.isNumber(this.props.uiSize) && this.props.uiSize % 1 == 0) classList.push(sizeList[this.props.uiSize] || sizeList[1]);else if (_.contains(sizeList, this.props.uiSize)) classList.push(this.props.uiSize);else if (this.props.uiSize) styles.fontSize = this.props.uiSize;
                                                                                                                      //
    var ui = React.createElement("i", { className: classList.join(" "), style: styles });                             // 72
    return brandNum >= 0 ? React.createElement(                                                                       // 73
      "span",                                                                                                         //
      { className: "fa-wrap " + (brandList[brandNum] || brandList[0]) },                                              //
      ui                                                                                                              //
    ) : ui;                                                                                                           //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
RC.VerticalAlign = React.createClass({                                                                                // 77
  displayName: "VerticalAlign",                                                                                       //
                                                                                                                      //
  render: function () {                                                                                               // 78
    if (!this.props.children) return null;                                                                            // 79
    var style = this.props.height ? { height: this.props.height } : {};                                               // 80
                                                                                                                      //
    return React.createElement(                                                                                       // 82
      "div",                                                                                                          //
      { className: "table" },                                                                                         //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "inside " + (this.props.className || "") + (this.props.center ? " center" : ""), style: style },
        this.props.children                                                                                           //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
RC.URL = React.createClass({                                                                                          // 90
  displayName: "URL",                                                                                                 //
                                                                                                                      //
  render: function () {                                                                                               // 91
                                                                                                                      //
    var props = _.omit(this.props, ["tagName"]);                                                                      // 93
                                                                                                                      //
    if (props.href) return React.createElement(                                                                       // 95
      "a",                                                                                                            //
      props,                                                                                                          //
      props.children                                                                                                  //
    );else {                                                                                                          //
      var keys = _.keys(props);                                                                                       // 98
      if (_.intersection(keys, ["onClick", "onTouchTap", "onTouch"]).length) props.className = (props.className || "") + " cursor";
                                                                                                                      //
      if (_.isString(props.tagName)) return React.createElement(this.props.tagName, props, props.children);           // 102
                                                                                                                      //
      return React.createElement(                                                                                     // 105
        "span",                                                                                                       //
        props,                                                                                                        //
        props.children                                                                                                //
      );                                                                                                              //
    }                                                                                                                 //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
RC.Animate = React.addons.CSSTransitionGroup;                                                                         // 110
                                                                                                                      //
RC.Mixins = {                                                                                                         // 112
  // @@@@@                                                                                                            //
  // Theme Mixins                                                                                                     //
  Theme: {                                                                                                            // 115
    getTheme: function (t) {                                                                                          // 116
      var classList = [];                                                                                             // 117
      var self = this;                                                                                                // 118
      var themeList = h.strToArray(t || this.props.theme || this.themeDefault || "regular");                          // 119
                                                                                                                      //
      if (_.isString(this.themeGroup)) classList.push(this.themeGroup);                                               // 121
                                                                                                                      //
      if (_.isArray(this.themes) || t) {                                                                              // 124
        _.map(_.intersection(self.themes, themeList), function (t) {                                                  // 125
          classList.push(_.isString(self.themeGroup) ? self.themeGroup + "-" + t : t);                                // 126
        });                                                                                                           //
      }                                                                                                               //
                                                                                                                      //
      if (_.isString(this.props.className)) classList.push(this.props.className);                                     // 132
                                                                                                                      //
      return classList.join(" ");                                                                                     // 135
    }                                                                                                                 //
  },                                                                                                                  //
  // @@@@@                                                                                                            //
  // Premade Mixins                                                                                                   //
  Premade: {                                                                                                          // 140
    makeAvatarItem: function (props) {                                                                                // 141
                                                                                                                      //
      if (_.isUndefined(props)) props = this.props;                                                                   // 143
      var keys = _.keys(props);                                                                                       // 144
                                                                                                                      //
      if (_.intersection(keys, ["title", "subtitle", "avatar", "uiClass"]).length) {                                  // 146
        var uiKeys = ["uiClass", "uiSize", "uiBrand", "uiColor"];                                                     // 147
                                                                                                                      //
        if (props.avatar) var avatar = React.createElement("img", { src: props.avatar });else if (_.intersection(keys, uiKeys).length) {
          var uiProps = fw.pickProps(props, uiKeys);                                                                  // 152
          var avatar = React.createElement(RC.uiIcon, uiProps);                                                       // 153
        }                                                                                                             //
                                                                                                                      //
        return React.createElement(                                                                                   // 156
          RC.Item,                                                                                                    // 156
          { theme: props.avatar || props.uiClass ? "avatar" : null },                                                 //
          avatar,                                                                                                     //
          props.title ? React.createElement(                                                                          //
            "h2",                                                                                                     //
            null,                                                                                                     //
            props.title                                                                                               //
          ) : null,                                                                                                   //
          props.subtitle ? React.createElement(                                                                       //
            "p",                                                                                                      //
            null,                                                                                                     //
            props.subtitle                                                                                            //
          ) : null                                                                                                    //
        );                                                                                                            //
      }                                                                                                               //
      return null;                                                                                                    // 162
    }                                                                                                                 //
  }                                                                                                                   //
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/framework_helpers.jsx                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
fw = {                                                                                                                // 2
  getDateFromProps: function (date, format, defaultFormat) {                                                          // 3
    if (!_.isDate(date)) return date;                                                                                 // 4
                                                                                                                      //
    var dateFormat = format || defaultFormat || "MM/DD/YY";                                                           // 6
                                                                                                                      //
    if (_.isDate(date)) {                                                                                             // 8
      date = moment(date);                                                                                            // 9
      date = dateFormat == "ago" ? date.fromNow(true) : date.format(dateFormat);                                      // 10
    }                                                                                                                 //
                                                                                                                      //
    return date;                                                                                                      // 13
  },                                                                                                                  //
  uniformChildren: function (unfilteredChildren, filter) {                                                            // 15
    if (!unfilteredChildren) return [];                                                                               // 16
    var children = !unfilteredChildren.map ? [unfilteredChildren] : unfilteredChildren;                               // 17
                                                                                                                      //
    children = children.map(function (c) {                                                                            // 19
      if (c.type != "div" && _.isString(c)) c = React.createElement(                                                  // 20
        "div",                                                                                                        //
        null,                                                                                                         //
        c                                                                                                             //
      );                                                                                                              //
      return c;                                                                                                       // 22
    });                                                                                                               //
                                                                                                                      //
    return _.filter(children.map(function (c, n) {                                                                    // 25
                                                                                                                      //
      if (_.isString(c.type)) {                                                                                       // 27
        return c;                                                                                                     // 28
      } else if (c.type.displayName) {                                                                                //
        if (filter && filter != c.type.displayName) {                                                                 // 30
          console.warn("Child was rejected because it did not pass the name filter (" + filter + ").");               // 31
          return undefined;                                                                                           // 32
        }                                                                                                             //
      } else {                                                                                                        //
        return c;                                                                                                     // 36
      }                                                                                                               //
    }), function (c) {                                                                                                //
      return !_.isUndefined(c);                                                                                       // 39
    });                                                                                                               //
  },                                                                                                                  //
  uiKeys: ["uiClass", "uiSize", "uiColor"],                                                                           // 42
  uiKeysCircle: ["uiClass", "uiSize", "uiColor", "uiBrand"],                                                          // 43
  omitProps: function (props, filterList) {                                                                           // 44
    if (!_.isArray(filterList) || !filterList.length) return props;                                                   // 45
    return _.omit(props, filterList);                                                                                 // 47
  },                                                                                                                  //
  pickProps: function (props, filterList) {                                                                           // 49
    if (!_.isArray(filterList) || !filterList.length) return props;                                                   // 50
    return _.pick(props, filterList);                                                                                 // 52
  }                                                                                                                   //
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/card/card.jsx                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
// let themes = ["regular","no-edges"]                                                                                //
var themes = [];                                                                                                      // 3
                                                                                                                      //
RC.Card = React.createClass({                                                                                         // 5
  displayName: "Card",                                                                                                //
                                                                                                                      //
  mixins: [RC.Mixins.Theme, RC.Mixins.Premade],                                                                       // 6
  themeGroup: "card",                                                                                                 // 7
  themes: themes,                                                                                                     // 8
  propTypes: {                                                                                                        // 9
    title: React.PropTypes.string,                                                                                    // 10
    subtitle: React.PropTypes.string,                                                                                 // 11
    avatar: React.PropTypes.string,                                                                                   // 12
    uiClass: React.PropTypes.string,                                                                                  // 13
                                                                                                                      //
    theme: React.PropTypes.string,                                                                                    // 15
    id: React.PropTypes.string,                                                                                       // 16
    className: React.PropTypes.string,                                                                                // 17
    style: React.PropTypes.object                                                                                     // 18
  },                                                                                                                  //
                                                                                                                      //
  render: function () {                                                                                               // 21
    var header = this.makeAvatarItem();                                                                               // 22
    var children = fw.uniformChildren(this.props.children, "Item");                                                   // 23
    if (!children.length && !header) return null;                                                                     // 24
                                                                                                                      //
    return React.createElement(                                                                                       // 26
      "div",                                                                                                          //
      { className: this.getTheme() },                                                                                 //
      header,                                                                                                         //
      children                                                                                                        //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.Card.Help = {                                                   // 33
  Type: "Canvas",                                                                                                     // 35
  Themes: themes,                                                                                                     // 36
  PropTypes: {                                                                                                        // 37
    theme: "String",                                                                                                  // 38
    avatar: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',                               // 39
    title: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',                                // 40
    subtitle: 'String (Use "Item", "Avatar", "Subtitle" props to auto-create a header.)',                             // 41
    uiClass: "String (FontAwesome)",                                                                                  // 42
    uiColor: "String or HEX",                                                                                         // 43
    uiBrand: "Flexible",                                                                                              // 44
    uiSize: "Flexible"                                                                                                // 45
  },                                                                                                                  //
  Description: "Creates a card component. Similar to cards found in many Social Networking apps such as Facebook, Instagram, Twitter, or Pinterest, etc."
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/item/item.jsx                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
var themes = ["icon-left item-text-wrap", "text-wrap", "body", "divider", "avatar", "image", "tabs", "icon-left", "icon-right", "thumbnail-left", "thumbnail-right"];
RC.Item = React.createClass({                                                                                         // 3
  displayName: "Item",                                                                                                //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 4
  themeGroup: "item",                                                                                                 // 5
  themes: themes,                                                                                                     // 6
                                                                                                                      //
  propTypes: {                                                                                                        // 8
    uiClass: React.PropTypes.string,                                                                                  // 9
    uiColor: React.PropTypes.string,                                                                                  // 10
    uiBrand: React.PropTypes.number,                                                                                  // 11
    // uiSize: IS FLEXIBLE                                                                                            //
                                                                                                                      //
    avatar: React.PropTypes.string,                                                                                   // 14
    title: React.PropTypes.string,                                                                                    // 15
    subtitle: React.PropTypes.string,                                                                                 // 16
    iconAlign: React.PropTypes.string,                                                                                // 17
    note: React.PropTypes.string,                                                                                     // 18
                                                                                                                      //
    theme: React.PropTypes.string,                                                                                    // 20
    id: React.PropTypes.string,                                                                                       // 21
    className: React.PropTypes.string,                                                                                // 22
    style: React.PropTypes.object                                                                                     // 23
  },                                                                                                                  //
  render: function () {                                                                                               // 25
    var _this = this;                                                                                                 //
                                                                                                                      //
    var self = this;                                                                                                  // 27
    var uiKeys = ["uiClass", "uiSize", "uiColor"];                                                                    // 28
    var themeList = h.strToArray(this.props.theme);                                                                   // 29
                                                                                                                      //
    if (_.contains(themeList, "tabs")) {                                                                              // 31
      var _ret = (function () {                                                                                       //
        var list = _.isArray(_this.props.list) ? _this.props.list : [];                                               // 32
        var iconAlign = _.contains(["left", "right"], _this.props.iconAlign) ? _this.props.iconAlign : "left";        // 33
                                                                                                                      //
        // @@@@@                                                                                                      //
        // Tabs @@                                                                                                    //
        return {                                                                                                      // 37
          v: React.createElement(                                                                                     //
            "div",                                                                                                    //
            { className: "item tabs tabs-icon-" + iconAlign },                                                        //
            list.map(function (t, n) {                                                                                //
              var aProps = fw.omitProps(t, uiKeys);                                                                   // 39
              var ui = null;                                                                                          // 40
                                                                                                                      //
              if (_.intersection(_.keys(t), uiKeys).length) {                                                         // 42
                if (_.isUndefined(t.uiSize)) t.uiSize = "1.75em";                                                     // 43
                var _uiProps = _.pick(t, uiKeys);                                                                     // 44
                ui = React.createElement(RC.uiIcon, _uiProps);                                                        // 45
              }                                                                                                       //
                                                                                                                      //
              return React.createElement(                                                                             // 48
                RC.URL,                                                                                               // 48
                babelHelpers._extends({}, aProps, { className: "tab-item", key: n }),                                 //
                ui && iconAlign == "left" ? ui : null,                                                                //
                t.label,                                                                                              //
                ui && iconAlign == "right" ? ui : null                                                                //
              );                                                                                                      //
            })                                                                                                        //
          )                                                                                                           //
        };                                                                                                            //
      })();                                                                                                           //
                                                                                                                      //
      if (typeof _ret === "object") return _ret.v;                                                                    //
    }                                                                                                                 //
                                                                                                                      //
    // @@@@@                                                                                                          //
    // Default @                                                                                                      //
    var avatar = [];                                                                                                  // 59
    var title = null;                                                                                                 // 60
    var subtitle = null;                                                                                              // 61
    var custTheme = null;                                                                                             // 62
                                                                                                                      //
    var keys = _.keys(this.props);                                                                                    // 64
    var uiKeysAvatar = ["uiClass", "uiSize", "uiBrand", "uiColor"];                                                   // 65
                                                                                                                      //
    var aProps = _.omit(this.props, uiKeys.concat(["label", "uiBrand"]));                                             // 67
                                                                                                                      //
    if (_.intersection(["avatar", "icon-left", "icon-right", "thumbnail-left", "thumbnail-right"], themeList).length) {
                                                                                                                      //
      if (_.intersection(["avatar", "thumbnail-left", "thumbnail-right"], themeList).length) {                        // 71
        // @@@@@                                                                                                      //
        // Avatar & Thumbnail                                                                                         //
        // @@@@@                                                                                                      //
        if (_.intersection(keys, ["title", "subtitle", "avatar", "uiClass"]).length) {                                // 75
          if (this.props.avatar) {                                                                                    // 76
            avatar.push(React.createElement("img", { src: this.props.avatar }));                                      // 77
            if (this.props.uiClass) {                                                                                 // 78
              custTheme = this.props.theme + " icon-right";                                                           // 79
              avatar.push(React.createElement(RC.uiIcon, fw.pickProps(this.props, uiKeys)));                          // 80
            }                                                                                                         //
          } else if (this.props.uiClass) {                                                                            //
            var uiProps = fw.pickProps(this.props, uiKeys.concat("uiBrand"));                                         // 83
            if (_.isUndefined(uiProps.uiBrand)) uiProps.uiBrand = 0;                                                  // 84
            avatar.push(React.createElement(RC.uiIcon, uiProps));                                                     // 86
          }                                                                                                           //
                                                                                                                      //
          if (this.props.title) title = React.createElement(                                                          // 89
            "h2",                                                                                                     //
            null,                                                                                                     //
            this.props.title                                                                                          //
          );                                                                                                          //
          if (this.props.subtitle) subtitle = React.createElement(                                                    // 90
            "p",                                                                                                      //
            null,                                                                                                     //
            this.props.subtitle                                                                                       //
          );                                                                                                          //
        }                                                                                                             //
      } else {                                                                                                        //
        // @@@@@                                                                                                      //
        // Icon Left, Right or Both                                                                                   //
        // @@@@@                                                                                                      //
        if (_.intersection(_.keys(this.props), uiKeys).length) {                                                      // 96
          (function () {                                                                                              //
            uiKeys.push("tagName");                                                                                   // 97
            var uiLoop = _.object(uiKeys, _.map(uiKeys, function (u) {                                                // 98
              if (_.isString(self.props[u])) return self.props[u].split(",");else return [];                          // 99
            }));                                                                                                      //
                                                                                                                      //
            _.map(uiLoop.uiClass, function (thisClass, n) {                                                           // 105
              avatar.push(React.createElement(RC.uiIcon, {                                                            // 106
                uiClass: thisClass.trim(),                                                                            // 107
                uiSize: _.isUndefined(uiLoop.uiSize[n]) ? "1.75em" : uiLoop.uiSize[n],                                // 108
                uiColor: uiLoop.uiColor[n] || "",                                                                     // 109
                tagName: uiLoop.tagName[n] || "div"                                                                   // 110
              }));                                                                                                    //
            });                                                                                                       //
          })();                                                                                                       //
        }                                                                                                             //
                                                                                                                      //
        title = this.props.label || "";                                                                               // 115
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    if (avatar[1]) var trail = avatar[1];else if (this.props.note) var trail = React.createElement(                   // 119
      "span",                                                                                                         //
      { className: "item-note" },                                                                                     //
      this.props.note                                                                                                 //
    );else var trail = null;                                                                                          //
                                                                                                                      //
    return React.createElement(                                                                                       // 126
      RC.URL,                                                                                                         // 126
      babelHelpers._extends({}, aProps, { tagName: aProps.tagName || "div", className: this.getTheme(custTheme) }),   //
      avatar[0],                                                                                                      //
      title || subtitle ? React.createElement(                                                                        //
        "div",                                                                                                        //
        null,                                                                                                         //
        title,                                                                                                        //
        subtitle                                                                                                      //
      ) : null,                                                                                                       //
      this.props.children,                                                                                            //
      trail                                                                                                           //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.Item.Help = {                                                   // 136
  Type: "Item",                                                                                                       // 138
  Themes: themes,                                                                                                     // 139
  PropTypes: {                                                                                                        // 140
    theme: "String",                                                                                                  // 141
    uiClass: "String",                                                                                                // 142
    uiColor: "String",                                                                                                // 143
    uiSize: "Flexible",                                                                                               // 144
    uiBrand: "Flexible",                                                                                              // 145
                                                                                                                      //
    avatar: "String (Used to auto-create Avatar Head Design)",                                                        // 147
    title: "String (Used to auto-create Avatar Head Design)",                                                         // 148
    subtitle: "String (Used to auto-create Avatar Head Design)",                                                      // 149
                                                                                                                      //
    iconAlign: "String (Used for \"tabs\" theme only)",                                                               // 151
    note: "String (Small text to the right)"                                                                          // 152
  },                                                                                                                  //
  Description: "Use this component inside RC.Card or RC.List. This is a very versatile inner component with many themes and options."
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/chat/chatBubble.jsx                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC.ChatBubble = React.createClass({                                                                                   // 2
  displayName: "ChatBubble",                                                                                          //
                                                                                                                      //
  // getInitialState(){                                                                                               //
  //   return {                                                                                                       //
  //     selected: null                                                                                               //
  //   }                                                                                                              //
  // },                                                                                                               //
  getTheme: function (name) {                                                                                         // 8
    var theme = _.contains(["regular"], name) ? name : "regular";                                                     // 9
    return theme;                                                                                                     // 11
  },                                                                                                                  //
  render: function () {                                                                                               // 13
    // let curState = this.state.selected // Currently unused                                                         //
    var classList = ["chat-bubble", this.props.className || "", this.props.isUser ? "to" : "from", this.props.firstOfGroup ? "first" : "", this.getTheme(this.props.theme)];
    var date = _.isDate(this.props.date) ? this.props.date : false;                                                   // 22
                                                                                                                      //
    return React.createElement(                                                                                       // 24
      "div",                                                                                                          //
      { className: classList.join(" "), id: this.props.id },                                                          //
      this.props.showDateBreak && date ? React.createElement(                                                         //
        "div",                                                                                                        //
        { className: "date-break" },                                                                                  //
        React.createElement(                                                                                          //
          "span",                                                                                                     //
          { className: "inline-block" },                                                                              //
          moment(date).format("dddd, MMM D, YYYY")                                                                    //
        )                                                                                                             //
      ) : null,                                                                                                       //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "inner normal", "data-time": date ? moment(date).format("h:mm a") : "" },                        //
        !this.props.firstOfGroup || this.props.isUser ? null : React.createElement(                                   //
          "div",                                                                                                      //
          { className: "author alt-thick" },                                                                          //
          React.createElement(RC.Avatar, { src: this.props.avatar, uiClass: _.contains(["male", "female"], this.props.gender) ? this.props.gender : "male" }),
          this.props.name                                                                                             //
        ),                                                                                                            //
        React.createElement(                                                                                          //
          "p",                                                                                                        //
          null,                                                                                                       //
          this.props.message                                                                                          //
        )                                                                                                             //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/chat/chatTextarea.jsx                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC.ChatTextArea = React.createClass({                                                                                 // 2
  displayName: "ChatTextArea",                                                                                        //
                                                                                                                      //
  getTheme: function (name) {                                                                                         // 3
    var theme = _.contains(["regular", "opacity", "flat"], name) ? name : "regular";                                  // 4
    return theme;                                                                                                     // 6
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 8
    return {                                                                                                          // 9
      selected: null                                                                                                  // 10
    };                                                                                                                //
  },                                                                                                                  //
  clickHandler: function (e) {                                                                                        // 13
    if (_.isFunction(this.props.onSubmit)) {                                                                          // 14
      e.preventDefault();                                                                                             // 15
      this.props.onSubmit(this.refs.msg.getDOMNode().value);                                                          // 16
      this.refs.msg.getDOMNode().value = "";                                                                          // 17
    }                                                                                                                 //
  },                                                                                                                  //
  keyHandler: function (e) {                                                                                          // 20
    if (e.which == 13) this.clickHandler(e);                                                                          // 21
  },                                                                                                                  //
  // getTheme(name){                                                                                                  //
  //   let theme = _.contains(["regular","chat"], name)                                                               //
  //     ? name : "regular"                                                                                           //
  //   return theme                                                                                                   //
  // },                                                                                                               //
  render: function () {                                                                                               // 28
                                                                                                                      //
    var classList = ["chat-textarea", this.getTheme(this.props.theme), this.props.className || ""];                   // 30
                                                                                                                      //
    return React.createElement(                                                                                       // 36
      "div",                                                                                                          //
      { id: this.props.id },                                                                                          //
      React.createElement("div", { className: "chat-textarea-spacer" }),                                              //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: classList.join(" ") },                                                                           //
        React.createElement("textarea", { ref: "msg", value: this.props.value, name: this.props.name, placeholder: this.props.placeholder, onKeyDown: this.keyHandler }),
        React.createElement(                                                                                          //
          "button",                                                                                                   //
          { onClick: this.clickHandler },                                                                             //
          React.createElement(RC.uiIcon, { uiClass: this.props.uiClass || "paper-plane", uiColor: "white" })          //
        )                                                                                                             //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/globalNav/globalNav.jsx                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
var themes = ["regular", "opacity", "flat"];                                                                          // 2
RC.GlobalNav = React.createClass({                                                                                    // 3
  displayName: "GlobalNav",                                                                                           //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 4
  themeGroup: "",                                                                                                     // 5
  themes: themes,                                                                                                     // 6
                                                                                                                      //
  propTypes: {                                                                                                        // 8
    id: React.PropTypes.string,                                                                                       // 9
    className: React.PropTypes.string,                                                                                // 10
    theme: React.PropTypes.string,                                                                                    // 11
                                                                                                                      //
    animate: React.PropTypes.bool,                                                                                    // 13
    isVisible: React.PropTypes.bool,                                                                                  // 14
    allowLongLabels: React.PropTypes.bool,                                                                            // 15
    list: React.PropTypes.array                                                                                       // 16
  },                                                                                                                  //
                                                                                                                      //
  getInitialState: function () {                                                                                      // 19
    return {                                                                                                          // 20
      selected: null                                                                                                  // 21
    };                                                                                                                //
  },                                                                                                                  //
  clickHandler: function (n, onClick) {                                                                               // 24
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick) this.setState({ selected: n });              // 25
                                                                                                                      //
    if (_.isFunction(onClick)) onClick();                                                                             // 28
  },                                                                                                                  //
  render: function () {                                                                                               // 31
    if (!_.isArray(this.props.list) || !this.props.list.length) return null;                                          // 32
                                                                                                                      //
    var self = this;                                                                                                  // 34
    var curState = this.state.selected;                                                                               // 35
    var curPath = FlowRouter.current().path;                                                                          // 36
                                                                                                                      //
    _.every(this.props.list, function (link) {                                                                        // 38
      var test = link.href == curPath;                                                                                // 39
      if (test) curState = null;                                                                                      // 40
      return !test;                                                                                                   // 42
    });                                                                                                               //
                                                                                                                      //
    var location = _.contains(["auto", "top", "bottom"], this.props.location) ? this.props.location : "auto";         // 45
    var isTop = location == "top" || location == "auto" && h.getPlatform("android"); // This will match Web too       // 46
                                                                                                                      //
    var classList = ["global-nav", "center", "list-length-" + Math.min(this.props.list.length, 5), isTop ? "gnav-top" : "gnav-bottom", this.props.animate ? "animate" : "", this.props.isVisible ? "isVisible" : "isHidden", this.props.allowLongLabels ? "" : "even", this.getTheme(), this.props.className || ""];
                                                                                                                      //
    return React.createElement(                                                                                       // 58
      "div",                                                                                                          //
      { className: "gnav-spacer " + (isTop && this.props.isVisible ? "on" : "off") },                                 //
      React.createElement(                                                                                            //
        "nav",                                                                                                        //
        { className: classList.join(" "), id: this.props.id },                                                        //
        this.props.list.map(function (item, n) {                                                                      //
                                                                                                                      //
          var isCur = n == curState || item.href == curPath;                                                          // 63
          var itemClasses = ["transition", "inline-block", "cursor", "menuItem"];                                     // 64
                                                                                                                      //
          if (isCur) itemClasses.push("cur");                                                                         // 66
          if (item.uiClass) itemClasses.push("with-icon");                                                            // 67
          if (item.label) itemClasses.push("with-label");                                                             // 68
                                                                                                                      //
          return React.createElement(                                                                                 // 70
            RC.URL,                                                                                                   // 70
            babelHelpers._extends({}, _.omit(item, ["className", "onClick"]), { className: itemClasses.join(" "), onClick: self.clickHandler.bind(null, n, item.onClick), key: n }),
            item.uiClass ? React.createElement(RC.uiIcon, { uiClass: isCur && item.uiClassCur ? item.uiClassCur : item.uiClass, uiColor: isCur && item.uiColorCur ? item.uiColorCur : item.uiColor, uiSize: item.uiSize }) : null,
            item.label ? React.createElement(                                                                         //
              "span",                                                                                                 //
              { className: "fn-label ellipsis" },                                                                     //
              item.label                                                                                              //
            ) : null                                                                                                  //
          );                                                                                                          //
        })                                                                                                            //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.GlobalNav.Help = {                                              // 81
  Type: "Unique/Canvas",                                                                                              // 83
  Themes: themes,                                                                                                     // 84
  PropTypes: {                                                                                                        // 85
    animate: "Boolean",                                                                                               // 86
    isVisible: "Boolean",                                                                                             // 87
    allowLongLabels: "Boolean",                                                                                       // 88
    list: "Array"                                                                                                     // 89
  },                                                                                                                  //
  Description: "Automatic navigation based on the device type (IOS or Android). Top for Android and bottom for IOS."  // 91
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/form/formElements.jsx                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
var themes_form = [];                                                                                                 // 2
RC.Form = React.createClass({                                                                                         // 3
  displayName: "Form",                                                                                                //
                                                                                                                      //
  getFormData: function () {                                                                                          // 4
    var formEl = React.findDOMNode(this.refs.rcForm);                                                                 // 5
    var form = h.serializeForm(formEl);                                                                               // 6
    return form;                                                                                                      // 7
  },                                                                                                                  //
  render: function () {                                                                                               // 9
    return React.createElement(                                                                                       // 10
      "form",                                                                                                         //
      babelHelpers._extends({}, this.props, { ref: "rcForm" }),                                                       //
      this.props.children                                                                                             //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// <Input/> Form Element                                                                                              //
// @@@@@                                                                                                              //
                                                                                                                      //
var themes_input = ["stacked-label", "small-label", "overlay-light", "overlay-dark"];                                 // 20
RC.Input = React.createClass({                                                                                        // 21
  displayName: "Input",                                                                                               //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 22
  themeGroup: "item",                                                                                                 // 23
  themes: themes_input,                                                                                               // 24
                                                                                                                      //
  propTypes: {                                                                                                        // 26
    id: React.PropTypes.string,                                                                                       // 27
    theme: React.PropTypes.string,                                                                                    // 28
    value: React.PropTypes.string,                                                                                    // 29
    name: React.PropTypes.string,                                                                                     // 30
    placeholder: React.PropTypes.string,                                                                              // 31
    className: React.PropTypes.string,                                                                                // 32
    changeHandler: React.PropTypes.func,                                                                              // 33
    label: React.PropTypes.string,                                                                                    // 34
    labelColor: React.PropTypes.string,                                                                               // 35
    error: React.PropTypes.bool,                                                                                      // 36
    style: React.PropTypes.object,                                                                                    // 37
    disabled: React.PropTypes.bool                                                                                    // 38
  },                                                                                                                  //
  reset: function () {                                                                                                // 40
    this.setState({ value: this.props.value || false });                                                              // 41
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 43
    return {                                                                                                          // 44
      value: false                                                                                                    // 45
    };                                                                                                                //
  },                                                                                                                  //
  getValue: function () {                                                                                             // 48
    var val = (this.state.value !== false ? this.state.value : this.props.value) || "";                               // 49
    return h.ltrim(val);                                                                                              // 50
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 52
    this.setState({ value: e.target.value });                                                                         // 53
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(e);                                          // 54
  },                                                                                                                  //
  render: function () {                                                                                               // 57
                                                                                                                      //
    var inputProps = _.omit(this.props, ["changeHandler", "value", "type", "labelColor"]);                            // 59
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input";                           // 60
                                                                                                                      //
    return React.createElement(                                                                                       // 62
      "label",                                                                                                        //
      { className: classes },                                                                                         //
      this.props.label ? React.createElement(                                                                         //
        "span",                                                                                                       //
        { className: "input-label" + (h.checkColorClass(this.props.labelColor) ? " colored " + this.props.labelColor : "") },
        this.props.label                                                                                              //
      ) : null,                                                                                                       //
      React.createElement("input", babelHelpers._extends({}, inputProps, { type: this.props.type || "text", value: this.getValue(), onChange: this.changeHandler }))
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// <Input range/> Form Element                                                                                        //
// @@@@@                                                                                                              //
                                                                                                                      //
RC.Range = React.createClass({                                                                                        // 73
  displayName: "Range",                                                                                               //
                                                                                                                      //
  propTypes: {                                                                                                        // 74
    id: React.PropTypes.string,                                                                                       // 75
    name: React.PropTypes.string,                                                                                     // 76
    className: React.PropTypes.string,                                                                                // 77
    changeHandler: React.PropTypes.func,                                                                              // 78
                                                                                                                      //
    value: React.PropTypes.number,                                                                                    // 80
    min: React.PropTypes.number,                                                                                      // 81
    max: React.PropTypes.number,                                                                                      // 82
                                                                                                                      //
    error: React.PropTypes.bool,                                                                                      // 84
    style: React.PropTypes.object,                                                                                    // 85
    disabled: React.PropTypes.bool                                                                                    // 86
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 88
    return {                                                                                                          // 89
      value: false                                                                                                    // 90
    };                                                                                                                //
  },                                                                                                                  //
  reset: function () {                                                                                                // 93
    this.setState({ value: this.props.value || false });                                                              // 94
  },                                                                                                                  //
  getValue: function () {                                                                                             // 96
    return (this.state.value !== false ? this.state.value : this.props.value) || null;                                // 97
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 99
    this.setState({ value: e.target.value });                                                                         // 100
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(e);                                          // 101
  },                                                                                                                  //
  render: function () {                                                                                               // 104
    var _this = this;                                                                                                 //
                                                                                                                      //
    var ui = {};                                                                                                      // 106
    if (this.props.uiClass) {                                                                                         // 107
      (function () {                                                                                                  //
        var self = _this;                                                                                             // 108
        var uiKeys = ["uiClass", "uiSize", "uiColor"];                                                                // 109
        ui = _.object(uiKeys, _.map(uiKeys, function (u) {                                                            // 110
          if (_.isString(self.props[u])) return self.props[u].split(",");else return [];                              // 111
        }));                                                                                                          //
      })();                                                                                                           //
    }                                                                                                                 //
                                                                                                                      //
    var classes = "item range" + (this.props.error ? " has-error" : "") + (h.checkColorClass(this.props.rangeColor) ? " range-" + this.props.rangeColor : "");
                                                                                                                      //
    return React.createElement(                                                                                       // 120
      "div",                                                                                                          //
      { className: classes },                                                                                         //
      ui.uiClass && ui.uiClass[0] ? React.createElement(RC.uiIcon, { uiClass: ui.uiClass[0], uiSize: ui.uiSize[0], uiColor: ui.uiColor[0] }) : null,
      React.createElement("input", babelHelpers._extends({                                                            //
        type: "range", onChange: this.changeHandler                                                                   // 123
      }, _.omit(this.props, ["changeHandler", "value", "type"]), {                                                    //
        value: this.getValue(),                                                                                       // 125
        min: _.isNumber(this.props.min) ? this.props.min : 0,                                                         // 126
        max: _.isNumber(this.props.max) ? this.props.max : 100                                                        // 127
      })),                                                                                                            //
      ui.uiClass && ui.uiClass[1] ? React.createElement(RC.uiIcon, { uiClass: ui.uiClass[1], uiSize: ui.uiSize[1], uiColor: ui.uiColor[1] }) : null
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// <Input checkbox/> Form Element                                                                                     //
// @@@@@                                                                                                              //
                                                                                                                      //
var themes_checkbox = ["toggle"];                                                                                     // 138
RC.Checkbox = React.createClass({                                                                                     // 139
  displayName: "Checkbox",                                                                                            //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 140
  themeGroup: "item",                                                                                                 // 141
  themes: themes_checkbox,                                                                                            // 142
                                                                                                                      //
  propTypes: {                                                                                                        // 144
    id: React.PropTypes.string,                                                                                       // 145
    theme: React.PropTypes.string,                                                                                    // 146
    value: React.PropTypes.bool,                                                                                      // 147
    name: React.PropTypes.string,                                                                                     // 148
    className: React.PropTypes.string,                                                                                // 149
                                                                                                                      //
    error: React.PropTypes.bool,                                                                                      // 151
    style: React.PropTypes.object,                                                                                    // 152
    disabled: React.PropTypes.bool                                                                                    // 153
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 155
    return {                                                                                                          // 156
      value: this.props.value || false // Must be Boolean                                                             // 157
    };                                                                                                                //
  },                                                                                                                  //
  reset: function () {                                                                                                // 160
    this.setState({ value: this.props.value || false });                                                              // 161
  },                                                                                                                  //
  getValue: function () {                                                                                             // 163
    return _.isBoolean(this.state.value) ? this.state.value : this.props.value;                                       // 164
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 166
    this.setState({ value: !this.state.value });                                                                      // 167
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(e);                                          // 168
  },                                                                                                                  //
  render: function () {                                                                                               // 171
    var classes = this.getTheme() + (this.props.theme ? "" : " item-checkbox");                                       // 172
    var input = React.createElement("input", babelHelpers._extends({}, _.omit(this.props, ["value", "checked", "type"]), { type: "checkbox", onChange: function () {}, checked: this.getValue() }));
    /**                                                                                                               //
     * NOTE                                                                                                           //
     * <div> is used instead of <label> to overcome Web/Mobile issues                                                 //
     */                                                                                                               //
    switch (this.props.theme) {                                                                                       // 178
      case "toggle":                                                                                                  // 179
        var checkbox = React.createElement(                                                                           // 180
          "div",                                                                                                      //
          { className: "toggle" + (h.checkColorClass(this.props.uiColor) ? " toggle-" + this.props.uiColor : "") },   //
          input,                                                                                                      //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            { className: "track" },                                                                                   //
            React.createElement("div", { className: "handle" })                                                       //
          )                                                                                                           //
        );                                                                                                            //
        break;                                                                                                        // 184
      default:                                                                                                        // 184
        var checkbox = React.createElement(                                                                           // 186
          "span",                                                                                                     //
          { className: "checkbox" },                                                                                  //
          input                                                                                                       //
        );                                                                                                            //
    }                                                                                                                 // 186
                                                                                                                      //
    return React.createElement(                                                                                       // 189
      "div",                                                                                                          //
      { className: classes, onClick: this.changeHandler },                                                            //
      this.props.label,                                                                                               //
      checkbox                                                                                                        //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// <Input checkbox/> with Toggle, Form Element                                                                        //
// @@@@@                                                                                                              //
//                                                                                                                    //
// RC.Checkbox = React.createClass({                                                                                  //
//   propTypes: {                                                                                                     //
//     id: React.PropTypes.string,                                                                                    //
//     theme: React.PropTypes.string,                                                                                 //
//     value: React.PropTypes.bool,                                                                                   //
//     name: React.PropTypes.string,                                                                                  //
//     className: React.PropTypes.string,                                                                             //
//                                                                                                                    //
//     error: React.PropTypes.bool,                                                                                   //
//     style: React.PropTypes.object,                                                                                 //
//     disabled: React.PropTypes.bool,                                                                                //
//   },                                                                                                               //
//   getInitialState(){                                                                                               //
//     return {                                                                                                       //
//       value: this.props.value || false // Must be Boolean                                                          //
//     }                                                                                                              //
//   },                                                                                                               //
//   getValue(){                                                                                                      //
//     return _.isBoolean(this.state.value) ? this.state.value : this.props.value                                     //
//   },                                                                                                               //
//   changeHandler: function(e) {                                                                                     //
//     this.setState({value: !this.state.value})                                                                      //
//     if (_.isFunction(this.props.changeHandler))                                                                    //
//       this.props.changeHandler(e)                                                                                  //
//   },                                                                                                               //
//   render() {                                                                                                       //
//     let inputProps = _.omit(this.props, ["value","checked","type"])                                                //
//     var classes = "item-checkbox "+(this.props.className || "")                                                    //
//     /**                                                                                                            //
//      * NOTE                                                                                                        //
//      * <div> is used instead of <label> to overcome Web/Mobile issues                                              //
//      */                                                                                                            //
//     return <div className={classes} onClick={this.changeHandler}>                                                  //
//       <span className="checkbox">                                                                                  //
//         <input {... inputProps} type="checkbox" onChange={function(){}} checked={this.getValue()} />               //
//       </span>                                                                                                      //
//       {this.props.label}                                                                                           //
//     </div>                                                                                                         //
//   }                                                                                                                //
// })                                                                                                                 //
                                                                                                                      //
// @@@@@                                                                                                              //
// <Input radio/> Form Element                                                                                        //
// @@@@@                                                                                                              //
                                                                                                                      //
RC.RadioGroup = React.createClass({                                                                                   // 245
  displayName: "RadioGroup",                                                                                          //
                                                                                                                      //
  propTypes: {                                                                                                        // 246
    id: React.PropTypes.string,                                                                                       // 247
    theme: React.PropTypes.string,                                                                                    // 248
                                                                                                                      //
    list: React.PropTypes.array,                                                                                      // 250
    label: React.PropTypes.string,                                                                                    // 251
    name: React.PropTypes.string,                                                                                     // 252
    className: React.PropTypes.string,                                                                                // 253
                                                                                                                      //
    error: React.PropTypes.bool,                                                                                      // 255
    style: React.PropTypes.object,                                                                                    // 256
    disabled: React.PropTypes.bool                                                                                    // 257
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 259
    var list = _.isArray(this.props.list) ? this.props.list : [];                                                     // 260
    var self = this;                                                                                                  // 261
                                                                                                                      //
    return {                                                                                                          // 263
      checked: list.map(function (c) {                                                                                // 264
        return c.value && c.value == self.props.value ? true : false;                                                 // 265
      })                                                                                                              //
    };                                                                                                                //
  },                                                                                                                  //
  reset: function () {                                                                                                // 269
    var list = _.isArray(this.props.list) ? this.props.list : [];                                                     // 270
    var self = this;                                                                                                  // 271
    var checked = list.map(function (c) {                                                                             // 272
      return c.value && c.value == self.props.value ? true : false;                                                   // 273
    });                                                                                                               //
    this.setState({ checked: checked });                                                                              // 275
  },                                                                                                                  //
  getValue: function (n) {                                                                                            // 277
    var _this2 = this;                                                                                                //
                                                                                                                      //
    if (_.isUndefined(n)) {                                                                                           // 278
      var realVal;                                                                                                    //
                                                                                                                      //
      var _ret2 = (function () {                                                                                      //
        realVal = null;                                                                                               // 279
                                                                                                                      //
        var self = _this2;                                                                                            // 280
        _.every(_this2.state.checked, function (c, nn) {                                                              // 281
          if (c) realVal = self.props.list[nn].value;                                                                 // 282
          return !c;                                                                                                  // 284
        });                                                                                                           //
        return {                                                                                                      // 286
          v: realVal                                                                                                  //
        }; //calphin                                                                                                  //
      })();                                                                                                           //
                                                                                                                      //
      if (typeof _ret2 === "object") return _ret2.v;                                                                  //
    }                                                                                                                 //
    return this.state.checked[n];                                                                                     // 288
  },                                                                                                                  //
  changeHandler: function (n) {                                                                                       // 290
    var checked = this.state.checked;                                                                                 // 291
    this.setState({ checked: checked.map(function (c, nn) {                                                           // 292
        return nn == n;                                                                                               // 293
      }) });                                                                                                          //
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler();                                           // 295
  },                                                                                                                  //
  makeRadio: function (radio, n) {                                                                                    // 298
    var checked = this.getValue(n);                                                                                   // 299
    var classes = "item item-radio " + (radio.className || "");                                                       // 300
    /**                                                                                                               //
     * NOTE                                                                                                           //
     * <div> is used instead of <label> to overcome Web/Mobile issues                                                 //
     */                                                                                                               //
    return React.createElement(                                                                                       // 305
      "div",                                                                                                          //
      { className: classes, key: n, onClick: this.changeHandler.bind(null, n) },                                      //
      React.createElement("input", babelHelpers._extends({}, _.omit(radio, ["checked", "type", "label"]), { type: "radio", onChange: function () {}, checked: checked })),
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "item-content" },                                                                                //
        radio.label                                                                                                   //
      ),                                                                                                              //
      React.createElement(RC.uiIcon, { uiClass: this.props.uiClass || "check", uiColor: this.props.uiColor, uiSize: this.props.uiSize, className: "radio-fa" })
    );                                                                                                                //
  },                                                                                                                  //
  render: function () {                                                                                               // 311
                                                                                                                      //
    if (!this.props.list.length) return null;                                                                         // 313
                                                                                                                      //
    var self = this;                                                                                                  // 315
    var radioGroup = this.props.name || h.random_string();                                                            // 316
                                                                                                                      //
    return React.createElement(                                                                                       // 318
      "div",                                                                                                          //
      null,                                                                                                           //
      this.props.list.map(function (g, n) {                                                                           //
        g.name = radioGroup;                                                                                          // 321
        return self.makeRadio(g, n);                                                                                  // 322
      })                                                                                                              //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// <textarea/> Form Element                                                                                           //
// @@@@@                                                                                                              //
                                                                                                                      //
var themes_textarea = ["stacked-label", "small-label"];                                                               // 333
RC.Textarea = React.createClass({                                                                                     // 334
  displayName: "Textarea",                                                                                            //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 335
  themeGroup: "item",                                                                                                 // 336
  themeDefault: "stacked-label",                                                                                      // 337
  themes: themes_textarea,                                                                                            // 338
                                                                                                                      //
  propTypes: {                                                                                                        // 340
    id: React.PropTypes.string,                                                                                       // 341
    theme: React.PropTypes.string,                                                                                    // 342
    value: React.PropTypes.string,                                                                                    // 343
    name: React.PropTypes.string,                                                                                     // 344
    placeholder: React.PropTypes.string,                                                                              // 345
    className: React.PropTypes.string,                                                                                // 346
    changeHandler: React.PropTypes.func,                                                                              // 347
    label: React.PropTypes.string,                                                                                    // 348
    labelColor: React.PropTypes.string,                                                                               // 349
    error: React.PropTypes.bool,                                                                                      // 350
    style: React.PropTypes.object,                                                                                    // 351
    disabled: React.PropTypes.bool                                                                                    // 352
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 354
    return {                                                                                                          // 355
      value: false                                                                                                    // 356
    };                                                                                                                //
  },                                                                                                                  //
  reset: function () {                                                                                                // 359
    this.setState({ value: false });                                                                                  // 360
  },                                                                                                                  //
  getValue: function () {                                                                                             // 362
    return (this.state.value !== false ? this.state.value : this.props.children) || "";                               // 363
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 365
    this.setState({ value: e.target.value });                                                                         // 366
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(e);                                          // 367
  },                                                                                                                  //
  render: function () {                                                                                               // 370
                                                                                                                      //
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input";                           // 372
                                                                                                                      //
    return React.createElement(                                                                                       // 374
      "label",                                                                                                        //
      { className: classes },                                                                                         //
      this.props.label ? React.createElement(                                                                         //
        "span",                                                                                                       //
        { className: "input-label" + (h.checkColorClass(this.props.labelColor) ? " colored " + this.props.labelColor : "") },
        this.props.label                                                                                              //
      ) : null,                                                                                                       //
      React.createElement("textarea", babelHelpers._extends({}, _.omit(this.props, ["changeHandler", "value", "type", "children", "labelColor"]), { type: this.props.type || "text", value: this.getValue(), onChange: this.changeHandler }))
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
var themes_button = ["full", "overlay-light", "overlay-dark", "circle"];                                              // 381
RC.Button = React.createClass({                                                                                       // 382
  displayName: "Button",                                                                                              //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 383
  themeGroup: "button",                                                                                               // 384
  themes: themes_button,                                                                                              // 385
                                                                                                                      //
  propTypes: {                                                                                                        // 387
    id: React.PropTypes.string,                                                                                       // 388
    theme: React.PropTypes.string,                                                                                    // 389
    type: React.PropTypes.string,                                                                                     // 390
    form: React.PropTypes.string,                                                                                     // 391
    name: React.PropTypes.string,                                                                                     // 392
    className: React.PropTypes.string,                                                                                // 393
    href: React.PropTypes.string                                                                                      // 394
                                                                                                                      //
  },                                                                                                                  //
  render: function () {                                                                                               // 397
                                                                                                                      //
    var classes = this.getTheme() + (this.props.buttonColor ? " button-" + this.props.buttonColor : "");              // 399
    var themes = h.strToArray(this.props.theme);                                                                      // 400
    var intersection = _.intersection(["overlay-light", "overlay-dark"], themes);                                     // 401
    var button = React.createElement(                                                                                 // 402
      "button",                                                                                                       //
      babelHelpers._extends({}, this.props, { className: classes }),                                                  //
      this.props.children                                                                                             //
    );                                                                                                                //
                                                                                                                      //
    if (this.props.href) {                                                                                            // 407
                                                                                                                      //
      return React.createElement(                                                                                     // 409
        "a",                                                                                                          //
        babelHelpers._extends({}, this.props, { className: classes }),                                                //
        this.props.children                                                                                           //
      );                                                                                                              //
    }                                                                                                                 //
                                                                                                                      //
    return intersection.length ? React.createElement(                                                                 // 415
      "div",                                                                                                          //
      { className: "wrap-" + intersection[0] + (this.props.active ? " active" : "") },                                //
      button                                                                                                          //
    ) : button;                                                                                                       //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
var themes_select = [];                                                                                               // 421
RC.Select = React.createClass({                                                                                       // 422
  displayName: "Select",                                                                                              //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 423
  themeGroup: "item",                                                                                                 // 424
  themes: themes_select,                                                                                              // 425
                                                                                                                      //
  propTypes: {                                                                                                        // 427
    theme: React.PropTypes.string,                                                                                    // 428
    value: React.PropTypes.string,                                                                                    // 429
    name: React.PropTypes.string,                                                                                     // 430
    error: React.PropTypes.bool,                                                                                      // 431
    label: React.PropTypes.string,                                                                                    // 432
    labelColor: React.PropTypes.string                                                                                // 433
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 435
    return {                                                                                                          // 436
      value: false                                                                                                    // 437
    };                                                                                                                //
  },                                                                                                                  //
  reset: function () {                                                                                                // 440
    this.setState({ value: false });                                                                                  // 441
  },                                                                                                                  //
  getValue: function () {                                                                                             // 443
    return (this.state.value !== false ? this.state.value : this.props.value) || "";                                  // 444
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 446
    this.setState({ value: e.target.value });                                                                         // 447
    if (_.isFunction(this.props.changeHandler)) {                                                                     // 448
      this.state.value = e.target.value; // This may seem unnecessary, but it's needed. Consult me if you need to know why.
      this.props.changeHandler(e);                                                                                    // 450
    }                                                                                                                 //
  },                                                                                                                  //
  render: function () {                                                                                               // 453
                                                                                                                      //
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input item-select";               // 455
                                                                                                                      //
    return React.createElement(                                                                                       // 457
      "label",                                                                                                        //
      { className: classes },                                                                                         //
      this.props.label ? React.createElement(                                                                         //
        "span",                                                                                                       //
        { className: "input-label" + (h.checkColorClass(this.props.labelColor) ? " colored " + this.props.labelColor : "") },
        this.props.label                                                                                              //
      ) : null,                                                                                                       //
      React.createElement(                                                                                            //
        "select",                                                                                                     //
        babelHelpers._extends({}, _.omit(this.props, ["changeHandler", "value", "type", "labelColor"]), { onChange: this.changeHandler, value: this.getValue(), ref: "select" }),
        this.props.options.map(function (o, n) {                                                                      //
          if (_.isString(o)) o = { value: o };                                                                        // 462
          o = _.isObject(o) && o.value ? o : { value: undefined };                                                    // 463
          return React.createElement(                                                                                 // 464
            "option",                                                                                                 //
            { value: o.value, key: n },                                                                               //
            o.text || o.value                                                                                         //
          );                                                                                                          //
        })                                                                                                            //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") {                                                                  // 473
  RC.Form.Help = {                                                                                                    // 474
    Type: "Canvas",                                                                                                   // 475
    Themes: themes_form,                                                                                              // 476
    PropTypes: "TODO",                                                                                                // 477
    Description: "Creates a <form> canvas with a useful getFormData() function. *Note: In order for getFormData() to work, all form items must have a \"name\" value.",
    Example: "http://localhost:3000/forms/Form_Index"                                                                 // 479
  };                                                                                                                  //
                                                                                                                      //
  RC.Input.Help = {                                                                                                   // 482
    Type: "Item",                                                                                                     // 483
    Themes: themes_input,                                                                                             // 484
    PropTypes: "TODO",                                                                                                // 485
    Description: "React helper for <input>.",                                                                         // 486
    Example: "http://localhost:3000/forms/Form_Index"                                                                 // 487
  };                                                                                                                  //
                                                                                                                      //
  RC.Textarea.Help = {                                                                                                // 490
    Type: "Item",                                                                                                     // 491
    Themes: themes_textarea,                                                                                          // 492
    PropTypes: "TODO",                                                                                                // 493
    Description: "React helper for <textarea>.",                                                                      // 494
    Example: "http://localhost:3000/forms/Form_Index",                                                                // 495
    TODO: "Add auto-resize"                                                                                           // 496
  };                                                                                                                  //
}                                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/form/formElements2.jsx                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   //
 * Created on 9/16/15.                                                                                                //
 */                                                                                                                   //
{                                                                                                                     // 4
                                                                                                                      //
    var themes_select = [];                                                                                           // 6
    RC.Select2 = React.createClass({                                                                                  // 7
        displayName: "Select2",                                                                                       //
                                                                                                                      //
        mixins: [RC.Mixins.Theme],                                                                                    // 8
        themeGroup: "item",                                                                                           // 9
        themes: themes_select,                                                                                        // 10
                                                                                                                      //
        propTypes: {                                                                                                  // 12
            theme: React.PropTypes.string,                                                                            // 13
            value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),                       // 14
            name: React.PropTypes.string,                                                                             // 18
            error: React.PropTypes.bool,                                                                              // 19
            label: React.PropTypes.string,                                                                            // 20
            labelColor: React.PropTypes.string                                                                        // 21
        },                                                                                                            //
        getInitialState: function () {                                                                                // 23
            return {                                                                                                  // 24
                value: false                                                                                          // 25
            };                                                                                                        //
        },                                                                                                            //
                                                                                                                      //
        //提供通过属性 render组件的接口                                                                                          //
        componentWillReceiveProps: function (nextProps) {                                                             // 30
            if (nextProps.value != this.state.value) {                                                                // 31
                this.setState({ value: nextProps.value });                                                            // 32
            }                                                                                                         //
        },                                                                                                            //
        reset: function () {                                                                                          // 35
            this.setState({ value: false });                                                                          // 36
        },                                                                                                            //
        getValue: function () {                                                                                       // 38
            return (this.state.value !== false ? this.state.value : this.props.value) || "";                          // 39
        },                                                                                                            //
        changeHandler: function (e) {                                                                                 // 41
            this.setState({ value: e.target.value });                                                                 // 42
            if (_.isFunction(this.props.changeHandler)) {                                                             // 43
                this.state.value = e.target.value; // This may seem unnecessary, but it's needed. Consult me if you need to know why.
                this.props.changeHandler(e);                                                                          // 45
            }                                                                                                         //
        },                                                                                                            //
        render: function () {                                                                                         // 48
                                                                                                                      //
            var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input item-select";       // 50
                                                                                                                      //
            return React.createElement(                                                                               // 52
                "label",                                                                                              //
                { className: classes },                                                                               //
                this.props.label ? React.createElement(                                                               //
                    "span",                                                                                           //
                    { className: "input-label" + (h.checkColorClass(this.props.labelColor) ? " colored " + this.props.labelColor : "") },
                    this.props.label                                                                                  //
                ) : null,                                                                                             //
                React.createElement(                                                                                  //
                    "select",                                                                                         //
                    babelHelpers._extends({}, _.omit(this.props, ["changeHandler", "value", "type", "labelColor"]), { onChange: this.changeHandler, value: this.getValue(), ref: "select" }),
                    this.props.options.map(function (o, n) {                                                          //
                        if (_.isString(o)) o = { value: o };                                                          // 57
                        o = _.isObject(o) && o.value ? o : { value: undefined };                                      // 58
                        return React.createElement(                                                                   // 59
                            "option",                                                                                 //
                            { value: o.value, key: n },                                                               //
                            o.text || o.value                                                                         //
                        );                                                                                            //
                    })                                                                                                //
                )                                                                                                     //
            );                                                                                                        //
        }                                                                                                             //
    });                                                                                                               //
                                                                                                                      //
    //////                                                                                                            //
    RC.RadioGroup2 = React.createClass({                                                                              // 70
        displayName: "RadioGroup2",                                                                                   //
                                                                                                                      //
        propTypes: {                                                                                                  // 71
            id: React.PropTypes.string,                                                                               // 72
            theme: React.PropTypes.string,                                                                            // 73
                                                                                                                      //
            list: React.PropTypes.array,                                                                              // 75
            label: React.PropTypes.string,                                                                            // 76
            name: React.PropTypes.string,                                                                             // 77
            className: React.PropTypes.string,                                                                        // 78
                                                                                                                      //
            error: React.PropTypes.bool,                                                                              // 80
            style: React.PropTypes.object,                                                                            // 81
            disabled: React.PropTypes.bool                                                                            // 82
        },                                                                                                            //
        getInitialState: function () {                                                                                // 84
            var list = _.isArray(this.props.list) ? this.props.list : [];                                             // 85
            var self = this;                                                                                          // 86
                                                                                                                      //
            return {                                                                                                  // 88
                checked: list.map(function (c) {                                                                      // 89
                    return c.value && c.value == self.props.value ? true : false;                                     // 90
                })                                                                                                    //
            };                                                                                                        //
        },                                                                                                            //
        reset: function () {                                                                                          // 94
            var list = _.isArray(this.props.list) ? this.props.list : [];                                             // 95
            var self = this;                                                                                          // 96
            var checked = list.map(function (c) {                                                                     // 97
                return c.value && c.value == self.props.value ? true : false;                                         // 98
            });                                                                                                       //
            this.setState({ checked: checked });                                                                      // 100
        },                                                                                                            //
        getValue: function (n) {                                                                                      // 102
            var _this = this;                                                                                         //
                                                                                                                      //
            if (_.isUndefined(n)) {                                                                                   // 103
                var realVal;                                                                                          //
                                                                                                                      //
                (function () {                                                                                        //
                    realVal = null;                                                                                   // 104
                                                                                                                      //
                    var self = _this;                                                                                 // 105
                    _.every(_this.state.checked, function (c, nn) {                                                   // 106
                        if (c) realVal = self.props.list[nn].value;                                                   // 107
                        return !c;                                                                                    // 109
                    });                                                                                               //
                })();                                                                                                 //
            }                                                                                                         //
            return this.state.checked[n];                                                                             // 112
        },                                                                                                            //
        changeHandler: function (n) {                                                                                 // 114
            var checked = this.state.checked;                                                                         // 115
            this.setState({ checked: checked.map(function (c, nn) {                                                   // 116
                    return nn == n;                                                                                   // 117
                }) });                                                                                                //
            if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(this.props.list[n]);                 // 119
        },                                                                                                            //
        makeRadio: function (radio, n) {                                                                              // 122
            var checked = this.getValue(n);                                                                           // 123
            var classes = "item item-radio " + (radio.className || "");                                               // 124
            /**                                                                                                       //
             * NOTE                                                                                                   //
             * <div> is used instead of <label> to overcome Web/Mobile issues                                         //
             */                                                                                                       //
            return React.createElement(                                                                               // 129
                "div",                                                                                                //
                { className: classes, key: n, onClick: this.changeHandler.bind(null, n) },                            //
                React.createElement("input", babelHelpers._extends({}, _.omit(radio, ["checked", "type", "label"]), { type: "radio", onChange: function () {}, checked: checked })),
                React.createElement(                                                                                  //
                    "div",                                                                                            //
                    { className: "item-content" },                                                                    //
                    radio.label                                                                                       //
                ),                                                                                                    //
                React.createElement(RC.uiIcon, { uiClass: this.props.uiClass || "check", uiColor: this.props.uiColor, uiSize: this.props.uiSize, className: "radio-fa" })
            );                                                                                                        //
        },                                                                                                            //
        render: function () {                                                                                         // 135
                                                                                                                      //
            if (!this.props.list.length) return null;                                                                 // 137
                                                                                                                      //
            var self = this;                                                                                          // 139
            var radioGroup = this.props.name || h.random_string();                                                    // 140
                                                                                                                      //
            return React.createElement(                                                                               // 142
                "div",                                                                                                //
                null,                                                                                                 //
                this.props.list.map(function (g, n) {                                                                 //
                    g.name = radioGroup;                                                                              // 145
                    return self.makeRadio(g, n);                                                                      // 146
                })                                                                                                    //
            );                                                                                                        //
        }                                                                                                             //
    });                                                                                                               //
}                                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/form/passwordInput.jsx                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var themes_input = ["stacked-label", "small-label", "overlay-light", "overlay-dark"];                                 // 1
RC.PasswordInput = React.createClass({                                                                                // 2
  displayName: "PasswordInput",                                                                                       //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 3
  themeGroup: "item",                                                                                                 // 4
  themes: themes_input,                                                                                               // 5
                                                                                                                      //
  propTypes: {                                                                                                        // 7
    id: React.PropTypes.string,                                                                                       // 8
    theme: React.PropTypes.string,                                                                                    // 9
    value: React.PropTypes.string,                                                                                    // 10
    name: React.PropTypes.string,                                                                                     // 11
    placeholder: React.PropTypes.string,                                                                              // 12
    className: React.PropTypes.string,                                                                                // 13
    changeHandler: React.PropTypes.func,                                                                              // 14
    label: React.PropTypes.string,                                                                                    // 15
    labelColor: React.PropTypes.string,                                                                               // 16
    error: React.PropTypes.bool,                                                                                      // 17
    style: React.PropTypes.object,                                                                                    // 18
    disabled: React.PropTypes.bool                                                                                    // 19
  },                                                                                                                  //
  reset: function () {                                                                                                // 21
    this.setState({                                                                                                   // 22
      value: this.props.value || false,                                                                               // 23
      showPWGuide: false                                                                                              // 24
    });                                                                                                               //
  },                                                                                                                  //
                                                                                                                      //
  getInitialState: function () {                                                                                      // 28
    return {                                                                                                          // 29
      showPWGuide: false,                                                                                             // 30
      value: false                                                                                                    // 31
    };                                                                                                                //
  },                                                                                                                  //
                                                                                                                      //
  getValue: function () {                                                                                             // 35
    var val = (this.state.value !== false ? this.state.value : this.props.value) || "";                               // 36
    return h.ltrim(val);                                                                                              // 37
  },                                                                                                                  //
  changeHandler: function (e) {                                                                                       // 39
    this.setState({ value: e.target.value });                                                                         // 40
    if (_.isFunction(this.props.changeHandler)) this.props.changeHandler(e);                                          // 41
  },                                                                                                                  //
  showPasswordGuide: function (e) {                                                                                   // 44
    e.preventDefault();                                                                                               // 45
    this.setState({ showPWGuide: true });                                                                             // 46
  },                                                                                                                  //
  showQuestionMark: function (e) {                                                                                    // 48
    e.preventDefault();                                                                                               // 49
    this.setState({ showPWGuide: false });                                                                            // 50
  },                                                                                                                  //
                                                                                                                      //
  passwordGuide: function () {                                                                                        // 53
    //if (this.state.showPWGuide) {                                                                                   //
    //                                                                                                                //
    //  return 'Password shoud have at least 8 characters, containing Capital Letters AND Numbers.'                   //
    //                                                                                                                //
    //                                                                                                                //
    //} else                                                                                                          //
    {                                                                                                                 // 60
                                                                                                                      //
      return React.createElement(                                                                                     // 62
        "span",                                                                                                       //
        { className: "password-guide-wrap" },                                                                         //
        React.createElement("img", { style: { margin: 0 },                                                            //
          border: "0", src: "/assets/help.png", align: "middle", width: "16", height: "16" }),                        // 64
        "this.state.showPWGuide?",                                                                                    //
        React.createElement(                                                                                          //
          "span",                                                                                                     //
          { className: "password-guide cal-text-wrap" },                                                              //
          "Password shoud have at least 8 characters, containing Capital Letters AND Numbers."                        //
        ),                                                                                                            //
        ":''"                                                                                                         //
      );                                                                                                              //
    }                                                                                                                 //
  },                                                                                                                  //
                                                                                                                      //
  render: function () {                                                                                               // 70
                                                                                                                      //
    // var passwordGuide = 'FORMAT?'                                                                                  //
    // if (this.state.showPWGuide)                                                                                    //
    //   passwordGuide = 'Password shoud have at least 8 characters, containing Capital Letters AND Numbers.'         //
                                                                                                                      //
    var inputProps = _.omit(this.props, ["changeHandler", "value", "type", "labelColor"]);                            // 76
    var classes = this.getTheme() + (this.props.error ? " has-error" : "") + " item-input";                           // 77
                                                                                                                      //
    return React.createElement(                                                                                       // 79
      "label",                                                                                                        //
      { className: classes },                                                                                         //
      this.props.label ? React.createElement(                                                                         //
        "span",                                                                                                       //
        { onMouseOver: this.showPasswordGuide,                                                                        //
          onMouseOut: this.showQuestionMark,                                                                          // 81
          className: "input-label inline-block" + (h.checkColorClass(this.props.labelColor) ? " colored " + this.props.labelColor : "") },
        this.props.label,                                                                                             //
        this.passwordGuide()                                                                                          //
      ) : null,                                                                                                       //
      React.createElement("input", babelHelpers._extends({}, inputProps, { type: this.props.type || "text", value: this.getValue(), onChange: this.changeHandler }))
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/headerNav/headerNav.jsx                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var themes = ["regular", "opacity", "flat"];                                                                          // 1
RC.HeaderNav = React.createClass({                                                                                    // 2
  displayName: "HeaderNav",                                                                                           //
                                                                                                                      //
  propTypes: {                                                                                                        // 3
    id: React.PropTypes.string,                                                                                       // 4
    className: React.PropTypes.string,                                                                                // 5
    theme: React.PropTypes.string,                                                                                    // 6
                                                                                                                      //
    title: React.PropTypes.string,                                                                                    // 8
    nav: React.PropTypes.array,                                                                                       // 9
                                                                                                                      //
    hideBackButton: React.PropTypes.bool,                                                                             // 11
    hideLeftNavToggle: React.PropTypes.bool,                                                                          // 12
    hideShoppingCartButton: React.PropTypes.bool                                                                      // 13
                                                                                                                      //
  },                                                                                                                  //
                                                                                                                      //
  getTheme: function (name) {                                                                                         // 17
    var theme = _.contains(themes, name) ? name : "regular";                                                          // 18
    return theme;                                                                                                     // 20
  },                                                                                                                  //
  clickHandler: function (home) {                                                                                     // 22
    if (home) {                                                                                                       // 23
      FlowRouter.BackButton = true;                                                                                   // 24
      FlowRouter.go("/");                                                                                             // 25
    } else if (FlowRouter.LastRoute.length) {                                                                         //
      FlowRouter.BackButton = true;                                                                                   // 27
      FlowRouter.go(FlowRouter.LastRoute[FlowRouter.LastRoute.length - 1]);                                           // 28
    }                                                                                                                 //
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 31
    return { moreNav: false, init: _.isUndefined(this.props.init) ? true : this.props.init };                         // 32
  },                                                                                                                  //
  componentWillMount: function () {                                                                                   // 34
    var self = this;                                                                                                  // 35
    var allowThreshold = true;                                                                                        // 36
                                                                                                                      //
    document.addEventListener("click", function (e) {                                                                 // 38
                                                                                                                      //
      Meteor.clearTimeout(self.timeout);                                                                              // 40
      // Strange IOS JS error. keep the .length ?/: check in here                                                     //
      var pStop = e.target.className.length ? e.target.className.indexOf("stopPropagate") : -1;                       // 42
      var pExit = e.target.className.length ? e.target.className.indexOf("exitPropagate") : -1;                       // 43
      var moreNavDom = React.findDOMNode(self.refs.moreNav);                                                          // 44
                                                                                                                      //
      if (e.target.tagName == "HTML") return; // This is an old-device fix, leave it alone. :: By Jason               // 46
                                                                                                                      //
      if (pStop < 0 && pExit < 0 && self.state.moreNav) {                                                             // 48
        // Do Animation                                                                                               //
        self.setState({ moreNav: false, init: false });                                                               // 50
        self.timeout = Meteor.setTimeout(function () {                                                                // 51
          self.setState({ moreNav: false, init: true });                                                              // 52
        }, 300);                                                                                                      //
      } else if (pExit >= 0) self.setState({ moreNav: false, init: true });else self.setState({ init: true });        //
    });                                                                                                               //
  },                                                                                                                  //
  openMore: function () {                                                                                             // 60
    this.setState({ moreNav: true, init: false });                                                                    // 61
  },                                                                                                                  //
  //////actions///////                                                                                                //
                                                                                                                      //
  //d打开leftNav                                                                                                        //
  action_openLeftNav: function () {                                                                                   // 66
                                                                                                                      //
    console.log('dispatch: LEFT_NAV_OPEN');                                                                           // 68
    Dispatcher.dispatch({ actionType: 'LEFT_NAV_OPEN' });                                                             // 69
  },                                                                                                                  //
                                                                                                                      //
  timeout: null,                                                                                                      // 72
  render: function () {                                                                                               // 73
                                                                                                                      //
    var logoRight = !(_.isArray(this.props.nav) && !_.isEmpty(this.props.nav));                                       // 75
                                                                                                                      //
    //if (FlowRouter.LastRoute.length)                                                                                //
    //  var backButton = <span className="normal back" onClick={this.clickHandler.bind(null,false)}>Back</span>       //
    //else                                                                                                            //
    //  var backButton = FlowRouter.current().path != "/" && !this.props.hideHome                                     //
    //    ? <span className="normal back" onClick={this.clickHandler.bind(null,true)}>Home</span>                     //
    //    : null                                                                                                      //
                                                                                                                      //
    var backButton = null;                                                                                            // 85
    if (!this.props.hideBackButton) {                                                                                 // 86
      if (FlowRouter.LastRoute.length) {                                                                              // 87
        backButton = React.createElement(                                                                             // 88
          "span",                                                                                                     //
          { className: "normal back", onClick: this.clickHandler.bind(null, false) },                                 //
          React.createElement(RC.uiIcon, { uiClass: "chevron-left" })                                                 //
        );                                                                                                            //
      } else if (FlowRouter.current().path != "/" && !this.props.hideHome) {                                          //
        backButton = React.createElement(                                                                             // 92
          "span",                                                                                                     //
          { className: "normal back", onClick: this.clickHandler.bind(null, true) },                                  //
          React.createElement(RC.uiIcon, { uiClass: "chevron-left" })                                                 //
        );                                                                                                            //
      }                                                                                                               //
    }                                                                                                                 //
                                                                                                                      //
    var leftNavToggle = null;                                                                                         // 97
    //if (this.props.leftNavToggle) {                                                                                 //
    if (!this.props.hideLeftNavToggle) {                                                                              // 99
      leftNavToggle = React.createElement(                                                                            // 100
        "span",                                                                                                       //
        { className: "normal navToggle", onClick: this.action_openLeftNav },                                          //
        React.createElement(RC.uiIcon, {                                                                              //
          uiClass: "bars" })                                                                                          // 101
      );                                                                                                              //
    }                                                                                                                 //
                                                                                                                      //
    var shoppingCartButton = null;                                                                                    // 105
    if (!this.props.hideShoppingCartButton) {                                                                         // 106
      shoppingCartButton = React.createElement(                                                                       // 107
        "a",                                                                                                          //
        { className: "normal shopping-cart-button", href: "/classEdit/billingAndPayment" },                           //
        this.props.shoppingCart && this.props.shoppingCart.items && this.props.shoppingCart.items.length,             //
        React.createElement(RC.uiIcon, { uiClass: "shopping-cart" })                                                  //
      );                                                                                                              //
    }                                                                                                                 //
                                                                                                                      //
    var shoppingCartItems = '';                                                                                       // 115
                                                                                                                      //
    //}                                                                                                               //
                                                                                                                      //
    //if(!backButton){                                                                                                //
    //  var leftNavToggle = this.props.leftNavToggle                                                                  //
    //                                                                                                                //
    //  if(leftNavToggle) backButton= <span className="normal navToggle" onClick={this.action_openLeftNav}><RC.uiIcon uiClass="bars"></RC.uiIcon></span>
    //}                                                                                                               //
                                                                                                                      //
    var classList = ["bg-nav", "nav-height transition", this.getTheme(this.props.theme), this.props.title && this.props.title.length >= 9 ? "long" : "short"];
                                                                                                                      //
    return React.createElement(                                                                                       // 138
      "nav",                                                                                                          //
      { className: classList.join(" "), id: "mobile-header" },                                                        //
      leftNavToggle,                                                                                                  //
      backButton,                                                                                                     //
      React.createElement(                                                                                            //
        "figure",                                                                                                     //
        { className: (logoRight && backButton ? "" : "") + " logo nav-height boxed transition-medium" },              //
        this.props.title && !this.props.showLogo ? React.createElement(                                               //
          "h1",                                                                                                       //
          { className: "ellipsis" },                                                                                  //
          "Calphin"                                                                                                   //
        ) : React.createElement("img", { src: "/assets/logo.png", className: "transition-medium", "data-x": "auto", ref: "logo" })
      ),                                                                                                              //
      logoRight ? { shoppingCartButton: shoppingCartButton } : React.createElement(                                   //
        "p",                                                                                                          //
        { className: "more-button stopPropagate", onClick: this.openMore },                                           //
        React.createElement("span", { className: "stopPropagate" })                                                   //
      ),                                                                                                              //
      logoRight ? null : React.createElement(                                                                         //
        "div",                                                                                                        //
        { className: "stopPropagate more-nav " + (this.state.moreNav ? "corner-in" : "corner-out"),                   //
          style: this.state.init ? { display: "none" } : {}, ref: "moreNav" },                                        // 160
        this.props.nav.map(function (item, n) {                                                                       //
          return React.createElement(                                                                                 // 163
            "a",                                                                                                      //
            { href: item.href, key: n, className: "exitPropagate" },                                                  //
            item.text                                                                                                 //
          );                                                                                                          //
        })                                                                                                            //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.HeaderNav.Help = {                                              // 172
  Type: "Unique/Canvas",                                                                                              // 174
  Themes: themes,                                                                                                     // 175
  PropTypes: {                                                                                                        // 176
    title: "String (Shows title in the header navigation bar)",                                                       // 177
    nav: "Array (List of links for the menu on right)"                                                                // 178
  },                                                                                                                  //
  Description: "Created for documenting snippets of information with dates and bullet points. Use this component with the <RC.Timeline /> component."
};                                                                                                                    //
/* 左侧  */ /* 中间  */ /* 右侧 */                                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/leftNav/leftNav.jsx                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC.LeftNav = React.createClass({                                                                                      // 2
  displayName: "LeftNav",                                                                                             //
                                                                                                                      //
  getInitialState: function () {                                                                                      // 3
    return {                                                                                                          // 4
      closing: false,                                                                                                 // 5
      isOpen: this.props.openOnInit                                                                                   // 6
    };                                                                                                                //
  },                                                                                                                  //
  open: function () {                                                                                                 // 9
    if (!this.state.closing) this.setState({ isOpen: true });                                                         // 10
  },                                                                                                                  //
  close: function () {                                                                                                // 13
    var self = this;                                                                                                  // 14
    this.setState({ closing: true });                                                                                 // 15
    Meteor.setTimeout(function () {                                                                                   // 16
      self.setState({ isOpen: false, closing: false });                                                               // 17
    }, 400);                                                                                                          //
  },                                                                                                                  //
  linkClickHandler: function (e) {                                                                                    // 20
    if (e.target.href) this.close();                                                                                  // 21
  },                                                                                                                  //
  render: function () {                                                                                               // 24
                                                                                                                      //
    if (!this.state.isOpen) return null;                                                                              // 26
                                                                                                                      //
    return React.createElement(                                                                                       // 28
      "nav",                                                                                                          //
      { className: "transition left-nav fixed-full " + (this.state.closing ? "out" : "in") },                         //
      React.createElement("div", { className: "back abs-full", onClick: this.close }),                                //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "inner bg-white scroll", onClick: this.linkClickHandler },                                       //
        React.createElement("div", { onClick: this.props.toggleNavFunc }),                                            //
        React.createElement(RC.NavList, { list: this.props.navList, showCurrent: false })                             //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.LeftNav.Help = {                                                // 40
  Type: "Canvas",                                                                                                     // 42
  Description: "This component is currently being re-written, please check back later."                               // 43
};                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/list/list.jsx                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    //
RC.List = React.createClass({                                                                                         //
  getInitialState(){                                                                                                  //
    return {                                                                                                          //
      selected: null                                                                                                  //
    }                                                                                                                 //
  },                                                                                                                  //
  getTheme(name){                                                                                                     //
    let enableClick = _.isUndefined(this.props.enableClick) ? true : this.props.enableClick                           //
    let theme = _.contains(["regular","nav-list","nav-list dark"], name)                                              //
      ? name : "regular"                                                                                              //
    return theme+" "+(this.props.className || "")+(enableClick ? " click-enabled" : "")                               //
  },                                                                                                                  //
  setSelectedState(n){                                                                                                //
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick)                                              //
      this.setState({selected: n})                                                                                    //
  },                                                                                                                  //
  render() {                                                                                                          //
                                                                                                                      //
    if (!_.isArray(this.props.list) || !this.props.list.length) return null                                           //
                                                                                                                      //
    let self = this                                                                                                   //
    let curState = this.state.selected                                                                                //
    let enableClick = this.props.enableClick || true                                                                  //
                                                                                                                      //
    return <ul className={"rc-list "+this.getTheme(this.props.theme)}>                                                //
      {                                                                                                               //
      this.props.list.map(function(item,n){                                                                           //
                                                                                                                      //
        let itemTitle = null                                                                                          //
        let itemSubtitle = null                                                                                       //
                                                                                                                      //
        let cur = null                                                                                                //
        let avatar = null                                                                                             //
        let sub = null                                                                                                //
                                                                                                                      //
        let date = fw.getDateFromProps(item.date, item.dateFormat)                                                    //
                                                                                                                      //
        switch(item.type){                                                                                            //
          case "title":                                                                                               //
            cur = "type-listTitle sub "+(item.className || "")                                                        //
            itemTitle = item.label                                                                                    //
          break                                                                                                       //
          default:                                                                                                    //
            cur = "transition listItem"+(item.avatar || item.uiClass ? " with-icon " : " ")+(n==curState ? "cur " : "")+(item.onClick || item.href || enableClick ? "cursor " : "")+(item.className || "")
            avatar = <RC.Avatar src={item.avatar} theme="regular" uiClass={item.uiClass} uiSize={item.uiSize>=0 ? item.uiSize : 1} uiColor={item.uiColor || "white"} />
                                                                                                                      //
            let itemTitle = item.title ? <h4 className="textTitle ellipsis">{item.title}</h4> : null                  //
            let itemSubtitle = item.subtitle || item.label                                                            //
              ? <p className="subtitle smaller ellipsis">{item.label ? <strong className="label inline-block">{item.label}</strong> : null}{item.subtitle}</p>
              : null                                                                                                  //
                                                                                                                      //
            sub = item.date ? <strong className="date sub">{date}</strong> : null                                     //
        }                                                                                                             //
                                                                                                                      //
        return <li className={cur} key={n} onClick={item.onClick}>                                                    //
          {                                                                                                           //
            item.href                                                                                                 //
            ? <a href={item.href} onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</a>
            : <span onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</span>       //
          }                                                                                                           //
        </li>                                                                                                         //
      })                                                                                                              //
      }                                                                                                               //
    </ul>                                                                                                             //
  }                                                                                                                   //
})                                                                                                                    //
*/                                                                                                                    //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
// @@@@@@@                                                                                                            //
                                                                                                                      //
var themes = ["inset"];                                                                                               // 86
                                                                                                                      //
RC.List = React.createClass({                                                                                         // 88
  displayName: "List",                                                                                                //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 89
  themeGroup: "list",                                                                                                 // 90
  themes: themes,                                                                                                     // 91
  propTypes: {                                                                                                        // 92
    list: React.PropTypes.array,                                                                                      // 93
                                                                                                                      //
    theme: React.PropTypes.string,                                                                                    // 95
    id: React.PropTypes.string,                                                                                       // 96
    className: React.PropTypes.string,                                                                                // 97
    style: React.PropTypes.object                                                                                     // 98
  },                                                                                                                  //
  getInitialState: function () {                                                                                      // 100
    return {                                                                                                          // 101
      selected: null                                                                                                  // 102
    };                                                                                                                //
  },                                                                                                                  //
  setSelectedState: function (n) {                                                                                    // 105
    if (_.isUndefined(this.props.enableClick) || this.props.enableClick) this.setState({ selected: n });              // 106
  },                                                                                                                  //
  render: function () {                                                                                               // 109
                                                                                                                      //
    var list = !_.isArray(this.props.list) || !this.props.list.length ? [] : this.props.list;                         // 111
    var self = this;                                                                                                  // 113
    var curState = this.state.selected;                                                                               // 114
    var enableClick = this.props.enableClick || true;                                                                 // 115
                                                                                                                      //
    return React.createElement(                                                                                       // 117
      "ul",                                                                                                           //
      { className: this.getTheme() },                                                                                 //
      list.map(function (item, n) {                                                                                   //
        var listProps = _.omit(item, ["value"]);                                                                      // 120
        return React.createElement(                                                                                   // 121
          RC.Item,                                                                                                    // 121
          babelHelpers._extends({}, listProps, { tagName: listProps.tagName || "li", key: n }),                       //
          item.value                                                                                                  //
        );                                                                                                            //
      }),                                                                                                             //
      this.props.children                                                                                             //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") RC.List.Help = {                                                   // 131
  Type: "Canvas",                                                                                                     // 133
  Themes: themes,                                                                                                     // 134
  PropTypes: {                                                                                                        // 135
    list: "Array"                                                                                                     // 136
  },                                                                                                                  //
  Description: "Similar to RC.Card, this is another flexible canvas component.",                                      // 138
  Example: "/List/Index"                                                                                              // 139
};                                                                                                                    //
                                                                                                                      //
/*                                                                                                                    //
        return <li className={cur} key={n} onClick={item.onClick}>                                                    //
          {                                                                                                           //
            item.href                                                                                                 //
            ? <a href={item.href} onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</a>
            : <span onClick={self.setSelectedState.bind(null, n)}>{sub}{avatar}{itemTitle}{itemSubtitle}</span>       //
          }                                                                                                           //
        </li>                                                                                                         //
*/                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/navList/navList.jsx                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC.NavList = React.createClass({                                                                                      // 2
  displayName: "NavList",                                                                                             //
                                                                                                                      //
  getTheme: function (name) {                                                                                         // 3
    var theme = _.contains(["regular", "dark"], name) ? name : "regular";                                             // 4
    return theme + " " + (this.props.className || "");                                                                // 6
  },                                                                                                                  //
  render: function () {                                                                                               // 8
                                                                                                                      //
    var self = this;                                                                                                  // 10
    var curPath = FlowRouter.current().path;                                                                          // 11
    var showCurrent = _.isUndefined(this.props.showCurrent) ? true : this.props.showCurrent;                          // 12
    if (!_.isArray(this.props.list) || !this.props.list.length) return null;                                          // 13
                                                                                                                      //
    return React.createElement(                                                                                       // 15
      "ul",                                                                                                           //
      { className: "unselect nav-list alt " + this.getTheme(this.props.theme) },                                      //
      this.props.list.map(function (item, n) {                                                                        //
                                                                                                                      //
        var itemRender = null;                                                                                        // 19
        var cur = null;                                                                                               // 20
        var uiIcon = null;                                                                                            // 21
                                                                                                                      //
        switch (item.type) {                                                                                          // 23
          case "title":                                                                                               // 24
            itemRender = React.createElement(                                                                         // 25
              "h4",                                                                                                   //
              { className: "type-listTitle sub" },                                                                    //
              item.text                                                                                               //
            );                                                                                                        //
            break;                                                                                                    // 26
          default:                                                                                                    // 27
            cur = "transition link" + (item.uiClass ? " with-icon" : "") + (showCurrent && item.href == curPath ? " cur" : "");
            uiIcon = React.createElement(RC.uiIcon, { uiClass: item.uiClass, uiSize: 0 });                            // 29
            itemRender = item.href ? React.createElement(                                                             // 30
              "a",                                                                                                    //
              { href: item.href, className: "block cursor" },                                                         //
              item.text                                                                                               //
            ) : React.createElement(                                                                                  //
              "span",                                                                                                 //
              { onClick: item.onClick, className: "block cursor" },                                                   //
              item.text                                                                                               //
            );                                                                                                        //
        }                                                                                                             // 32
                                                                                                                      //
        return React.createElement(                                                                                   // 35
          "li",                                                                                                       //
          { className: cur, key: n },                                                                                 //
          uiIcon,                                                                                                     //
          itemRender                                                                                                  //
        );                                                                                                            //
      })                                                                                                              //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/tabs/tabs.jsx                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
RC.Tabs = React.createClass({                                                                                         // 2
  displayName: "Tabs",                                                                                                //
                                                                                                                      //
  getInitialState: function () {                                                                                      // 3
    return {                                                                                                          // 4
      tab: this.props.tab || 0                                                                                        // 5
    };                                                                                                                //
  },                                                                                                                  //
  switchTab: function (tab) {                                                                                         // 8
    this.setState({ tab: tab });                                                                                      // 9
  },                                                                                                                  //
  getTheme: function (name) {                                                                                         // 11
    var theme = _.contains(["regular", "nav-tabs"], name) ? name : "regular";                                         // 12
    return theme;                                                                                                     // 14
  },                                                                                                                  //
  render: function () {                                                                                               // 16
    var self = this;                                                                                                  // 17
                                                                                                                      //
    var tabs = !_.isArray(this.props.children) ? [this.props.children] : this.props.children;                         // 19
    _.filter(tabs.map(function (t, n) {                                                                               // 20
      if (t.type == "div" && (t.props.label || t.props.uiClass)) {                                                    // 21
        return t;                                                                                                     // 22
      } else if (t.type != "div") {                                                                                   //
        console.warn("Tabs child was rejected because it was not a <div>");                                           // 24
        return undefined;                                                                                             // 25
      } else {                                                                                                        //
        console.warn("Tabs child was rejected because it does not have a label or uiClass");                          // 27
        return undefined;                                                                                             // 28
      }                                                                                                               //
    }), function (t) {                                                                                                //
      return !_.isUndefined(t);                                                                                       // 31
    });                                                                                                               //
                                                                                                                      //
    if (!tabs.length) return null;                                                                                    // 34
                                                                                                                      //
    var width = 1 / tabs.length * 100;                                                                                // 36
    var tabStyle = { width: width + "%" };                                                                            // 37
    var barStyle = { width: width + "%", left: width * this.state.tab + "%" };                                        // 38
    var bodyStyle = { width: 100 * tabs.length + "%", marginLeft: -100 * this.state.tab + "%" };                      // 39
                                                                                                                      //
    return React.createElement(                                                                                       // 41
      "div",                                                                                                          //
      { className: "tabs-root overflow " + this.getTheme(this.props.theme), id: this.props.id },                      //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "tabs-nav clear unselect" },                                                                     //
        tabs.map(function (t, n) {                                                                                    //
          return React.createElement(                                                                                 // 45
            "p",                                                                                                      //
            { className: "cursor boxed", key: n, style: tabStyle, onClick: self.switchTab.bind(null, n) },            //
            React.createElement(RC.uiIcon, { uiSize: 0, uiClass: t.props.uiClass, uiColor: t.props.uiColor }),        //
            t.props.label || " "                                                                                      //
          );                                                                                                          //
        }),                                                                                                           //
        React.createElement("div", { className: "tabs-bar boxed transition", style: barStyle })                       //
      ),                                                                                                              //
      React.createElement(                                                                                            //
        "div",                                                                                                        //
        { className: "tabs-body clear transition " + (this.props.className || ""), style: bodyStyle },                //
        tabs.map(function (t, n) {                                                                                    //
          return React.createElement(                                                                                 // 56
            "div",                                                                                                    //
            { className: "tab-pane", style: tabStyle, key: n },                                                       //
            t.props.children                                                                                          //
          );                                                                                                          //
        })                                                                                                            //
      )                                                                                                               //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/ihealth_framework-engine/RC/timeline/timeline.jsx                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      //
// @@@@@                                                                                                              //
// Timeline Canvas                                                                                                    //
// @@@@@                                                                                                              //
                                                                                                                      //
var timelineThemes = [];                                                                                              // 6
RC.Timeline = React.createClass({                                                                                     // 7
  displayName: "Timeline",                                                                                            //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 8
  themeGroup: "timeline",                                                                                             // 9
  themes: timelineThemes,                                                                                             // 10
                                                                                                                      //
  propTypes: {                                                                                                        // 12
    id: React.PropTypes.string,                                                                                       // 13
    className: React.PropTypes.string,                                                                                // 14
    theme: React.PropTypes.string,                                                                                    // 15
                                                                                                                      //
    lineColor: React.PropTypes.string,                                                                                // 17
    dateFormat: React.PropTypes.string,                                                                               // 18
    list: React.PropTypes.array,                                                                                      // 19
                                                                                                                      //
    title: React.PropTypes.string,                                                                                    // 21
    dateFormat: React.PropTypes.string                                                                                // 22
  },                                                                                                                  //
                                                                                                                      //
  render: function () {                                                                                               // 25
                                                                                                                      //
    var defaultFormat = this.props.dateFormat || "MMM Do, YYYY";                                                      // 27
    var count = 0;                                                                                                    // 28
                                                                                                                      //
    if (!this.props.list) return React.createElement(                                                                 // 30
      "ul",                                                                                                           //
      babelHelpers._extends({}, this.props, { className: this.getTheme() + (h.checkColorClass(this.props.lineColor) ? " timeline-" + this.props.lineColor : "") }),
      this.props.children                                                                                             //
    );                                                                                                                //
                                                                                                                      //
    return React.createElement(                                                                                       // 35
      "ul",                                                                                                           //
      { className: "timeline " + this.getTheme(this.props.theme), id: this.props.id },                                //
      this.props.list.map(function (item, n) {                                                                        //
                                                                                                                      //
        var odd_or_even = ""; // This is used for className, don't set it to null                                     // 39
        var itemLabel = null;                                                                                         // 40
        var itemRender = null;                                                                                        // 41
                                                                                                                      //
        var brand = ["bg-brand", "bg-brand2", "bg-brand3"];                                                           // 43
        var brandClass = _.isNumber(item.brand) && brand[item.brand] ? brand[item.brand] : "";                        // 44
        var uiIcon = React.createElement(                                                                             // 45
          "figure",                                                                                                   //
          { className: "round " + brandClass },                                                                       //
          item.type == "title" ? React.createElement(RC.uiIcon, { uiClass: item.uiClass, uiSize: item.uiSize || 0, theme: "tiny" }) : null
        );                                                                                                            //
                                                                                                                      //
        switch (item.type) {                                                                                          // 53
          case "title":                                                                                               // 54
            itemRender = React.createElement(                                                                         // 55
              "h4",                                                                                                   //
              { className: "title sub" },                                                                             //
              fw.getDateFromProps(item.label, item.dateFormat, defaultFormat)                                         //
            );                                                                                                        //
            break;                                                                                                    // 58
          case "list-item":                                                                                           // 58
          default:                                                                                                    // 60
            odd_or_even = count++ % 2 ? " even" : " odd";                                                             // 61
            itemLabel = React.createElement(                                                                          // 62
              "strong",                                                                                               //
              { className: "block label" },                                                                           //
              _.isDate(item.title) ? fw.getDateFromProps(item.title, item.dateFormat, defaultFormat) : item.title     //
            );                                                                                                        //
            item.type = "listItem";                                                                                   // 65
            itemRender = item.href ? React.createElement(                                                             // 66
              "a",                                                                                                    //
              { className: "block", href: item.href },                                                                //
              item.text                                                                                               //
            ) : item.text;                                                                                            //
        }                                                                                                             // 66
                                                                                                                      //
        return React.createElement(                                                                                   // 69
          "li",                                                                                                       //
          { className: "type-" + item.type + odd_or_even, key: n },                                                   //
          React.createElement(                                                                                        //
            "div",                                                                                                    //
            { className: "inner" },                                                                                   //
            uiIcon,                                                                                                   //
            itemLabel,                                                                                                //
            itemRender                                                                                                //
          )                                                                                                           //
        );                                                                                                            //
      })                                                                                                              //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
// @@@@@                                                                                                              //
// Journal Item                                                                                                       //
// @@@@@                                                                                                              //
                                                                                                                      //
var journalThemes = ["title"];                                                                                        // 86
RC.Journal = React.createClass({                                                                                      // 87
  displayName: "Journal",                                                                                             //
                                                                                                                      //
  mixins: [RC.Mixins.Theme],                                                                                          // 88
  themeGroup: "journal",                                                                                              // 89
  themes: journalThemes,                                                                                              // 90
                                                                                                                      //
  propTypes: {                                                                                                        // 92
    id: React.PropTypes.string,                                                                                       // 93
    className: React.PropTypes.string,                                                                                // 94
    theme: React.PropTypes.string,                                                                                    // 95
                                                                                                                      //
    title: React.PropTypes.string,                                                                                    // 97
    dateFormat: React.PropTypes.string                                                                                // 98
  },                                                                                                                  //
                                                                                                                      //
  render: function () {                                                                                               // 101
                                                                                                                      //
    // Format Setups                                                                                                  //
    var dateFormat = this.props.dateFormat || "MMM Do, YYYY";                                                         // 104
    var brand = this.props.uiBrand || "brand";                                                                        // 105
    var classes = this.getTheme() + " journal-" + brand;                                                              // 106
                                                                                                                      //
    // Declarations                                                                                                   //
    var title = _.isDate(this.props.title) ? fw.getDateFromProps(this.props.title, dateFormat) : this.props.title;    // 109
    var content = null;                                                                                               // 110
    var ui = null;                                                                                                    // 111
                                                                                                                      //
    switch (this.props.theme) {                                                                                       // 113
      case "title":                                                                                                   // 114
        // @@@@                                                                                                       //
        // Title                                                                                                      //
        // @@@@                                                                                                       //
        if (this.props.uiClass) {                                                                                     // 118
          var uiObject = _.pick(this.props, fw.uiKeysCircle);                                                         // 119
          ui = React.createElement(RC.uiIcon, _.defaults(uiObject, { uiBrand: brand }));                              // 120
        }                                                                                                             //
        content = React.createElement(                                                                                // 122
          "strong",                                                                                                   //
          null,                                                                                                       //
          title                                                                                                       //
        );                                                                                                            //
        break;                                                                                                        // 123
      default:                                                                                                        // 124
        // @@@@                                                                                                       //
        // Default                                                                                                    //
        // @@@@                                                                                                       //
        content = React.createElement(                                                                                // 128
          "div",                                                                                                      //
          null,                                                                                                       //
          React.createElement(                                                                                        //
            "strong",                                                                                                 //
            { className: "block " + brand },                                                                          //
            title                                                                                                     //
          ),                                                                                                          //
          this.props.children                                                                                         //
        );                                                                                                            //
    }                                                                                                                 // 131
                                                                                                                      //
    return React.createElement(                                                                                       // 134
      "li",                                                                                                           //
      babelHelpers._extends({}, _.omit(this.props, ["children", "dateFormat", "className"]), { className: classes }),
      ui,                                                                                                             //
      content                                                                                                         //
    );                                                                                                                //
  }                                                                                                                   //
});                                                                                                                   //
                                                                                                                      //
if (h.nk(Meteor.settings, "public.env") != "live") {                                                                  // 141
  RC.Timeline.Help = {                                                                                                // 142
    Type: "canvas",                                                                                                   // 143
    Themes: timelineThemes,                                                                                           // 144
    PropTypes: {                                                                                                      // 145
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',                                        // 146
      lineColor: "String, Hex, CSS",                                                                                  // 147
      list: "Array (Optional)"                                                                                        // 148
    },                                                                                                                //
    "PropTypes for List": {                                                                                           // 150
      brand: "Integer (0 to 2, chooses from one of the 3 theme colours) or Brand CSS",                                // 151
      type: 'Array, ["title", "list-item"] Defaults to list-item',                                                    // 152
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',                                        // 153
      title: "String",                                                                                                // 154
      href: "String"                                                                                                  // 155
    },                                                                                                                //
    Description: "Created for documenting series of events. Especially useful for documenting times."                 // 157
  };                                                                                                                  //
  RC.Journal.Help = {                                                                                                 // 159
    Type: "Item",                                                                                                     // 160
    Themes: journalThemes,                                                                                            // 161
    PropTypes: {                                                                                                      // 162
      dateFormat: 'String (Defaults to "MMM Do, YYYY", use momentJS formats)',                                        // 163
      uiBrand: "Flexible",                                                                                            // 164
      title: "String"                                                                                                 // 165
    },                                                                                                                //
    Description: "Created for documenting snippets of information with dates and bullet points. Use this component with the <RC.Timeline /> component."
  };                                                                                                                  //
}                                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ihealth:framework-engine'] = {
  RC: RC
};

})();
