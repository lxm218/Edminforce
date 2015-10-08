
Tinytest.add('terminal-good', function (test) {
  var formatting = {
    styles: ['underline'],
    color: 'red',
    bgc: 'yellow'
  }
  var terminalStyle = DevTools.terminalStyle(formatting);
  console.log('terminalStyle: ', JSON.stringify(terminalStyle));
  test.equal(terminalStyle, '\u001b[4;31;43m');
});
Tinytest.add('terminal-bad', function (test) {
  var formatting = {
    styles: ['badstyle'],
    color: 'badcolor',
    bgc: 'badcoloragain'
  }
  var terminalStyle = DevTools.terminalStyle(formatting);
  console.log('terminalStyle: ', JSON.stringify(terminalStyle));
  test.equal(terminalStyle, '\u001b[0m');
});
