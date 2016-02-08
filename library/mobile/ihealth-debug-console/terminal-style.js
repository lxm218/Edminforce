// https://en.wikipedia.org/wiki/ANSI_escape_code
var sgrParams = {
  reset: 0,
  light: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  blink: 5,
  blinkFast: 6,
  reverse: 7
}

var ansiColors = {
  black: 0,
  red: 1,
  green: 2,
  yellow: 3,
  blue: 4,
  magenta: 5,
  cyan: 6,
  white: 7,
  default: 9
}

var csiCodes = {
  'sgr': 'm'
}

var csiApply = function (csiCode, arr) {
  if(arr.length>1) {
    var arrStr = arr.join(';');
  } else {
    var arrStr = '0';
  }
  var result = '\x1b['+arrStr+csiCode
  return result
};

var sgr = _.partial(csiApply, csiCodes.sgr);

var terminalColors = _.chain(ansiColors)
  .pairs()
  .map(function(pair) { return [_.first(pair), sgr(_.last(pair))]})
  .object()
  .value()

DevTools.terminalStyle = function(formatting, m) {
  // console.log('formatting', formatting)
  var styleStr = _.reduce(formatting, function(memo, val, key) {
    // console.log('reduce', memo, val, key)
    switch (key) {
      case 'styles':
        var styles = _.reduce(val, function(stylesMemo, style) {
          if (_.contains(_.keys(sgrParams), style)) {
              stylesMemo.push(sgrParams[style].toString());
          } else {
            console.log('\x1b[33;46m','style not recognized: ', style, '\x1b[0m');
          }
          return stylesMemo;
        }, []);
        memo = _.union(memo,styles);
        break;
        case 'color':
        case 'bgc':
          if (!_.contains(_.keys(ansiColors), val)) {
            console.log('\x1b[33;46m','2color not recognized: ', val, '\x1b[0m');
          } else if (key === 'color') {
            memo.push('3'+ansiColors[val]);
          } else if (key === 'bgc') {
            memo.push('4'+ansiColors[val]);
          }
          break;
      default:
        console.log('\x1b[33;46m','key not recognized: ', key, '\x1b[0m');
    }
    return memo;
  }, []);
  // console.log('styleStr', styleStr);
  var result = sgr(styleStr, m);
  return result;
}
