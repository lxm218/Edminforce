var fontStyles = {
  italic: 'font-style:italic',
  underline: 'text-decoration:underline',
  strikethrough: 'text-decoration:line-through',
  bold: 'font-weight:bold'
}

var colorList = ['aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black','blanchedalmond','blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellow','yellowgreen']

DevTools.browserStyle = function(formatting, m) {
  // console.log('formatting', formatting)
  var styleStr = _.reduce(formatting, function(memo, val, key) {
    // console.log('reduce', memo, val, key)
    switch (key) {
      case 'styles':
        var styles = _.reduce(val, function(stylesMemo, style) {
          if (_.contains(_.keys(fontStyles), style)) {
            stylesMemo.push(fontStyles[style].toString());
          } else {
            console.log('%c'+'style not recognized: '+ style, 'color: red;font-weight:bold; background-color: yellow');
          }
          return stylesMemo;
        }, []);
        memo = _.union(memo,styles);
        break;
      case 'color':
      case 'bgc':
        if(!_.contains(colorList, val)) {
          console.log('%c'+'color not recognized: '+ val, 'color: red;font-weight:bold; background-color: yellow');
        } else if(key==='color') {
          memo.push('color:' + val);
        } else if(key==='bgc') {
          memo.push('background-color:' + val);
        }
        break;
      default:
        console.log('%c'+'key not recognized: '+ key, 'color: red;font-weight:bold; background-color: yellow');
    }
    return memo;
  }, []);
  // console.log('styleStr', styleStr);
  return styleStr.join(';');
}

// console.log("%c" + messages , "color:" + color + ";font-weight:bold; background-color: " + bgc+";");
