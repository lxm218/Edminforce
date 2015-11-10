
Tinytest.add('browser-good', function (test) {
  var formatting = {
    styles: ['bold','italic','underline'],
    color: 'green',
    bgc: 'orange'
  }
  var browserStyle = DevTools.browserStyle(formatting);
  console.log('browserStyle: ', browserStyle);
  test.equal(browserStyle, 'font-weight:bold;font-style:italic;text-decoration:underline;color:green;background-color:orange');
});

Tinytest.add('browser-bad', function (test) {
  var formatting = {
    styles: ['badstyle'],
    color: 'badcolor',
    bgc: 'badcoloragain'
  }
  var browserStyle = DevTools.browserStyle(formatting);
  console.log('browserStyle: ', browserStyle);
  test.equal(browserStyle, '');
});
