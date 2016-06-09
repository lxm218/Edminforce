
// Because we require account verification before createUser,
// there is no need to restrict user content at client router level
// for unverified users



let postRoutes = Picker.filter(function(req, res) {
  // you can write any logic you want.
  // but this callback does not run inside a fiber
  // at the end, you must return either true or false
  return req.method == "POST";
});

/* TODO
postRoutes.route('/verification_server', function(params, req, res, next) {
  let {emailOrPhone, token, tokenId} = params.query || {};

  try {
    check(emailOrPhone, String);
    check(token, String);
    check(tokenId, String);
  } catch (e) {
    res.statusCode = 404;
    res.statusMessage = "Invalid query parameters";
  }

  let verified;
  try {
    verified = IH.Accounts.verifyEmailOrPhone(emailOrPhone, token, tokenId);
    res.statusCode = 200;
    let data = JSON.stringify({verified: verified});
    res.end(data);
  } catch (e) {
    res.statusCode = 404;
    res.statusMessage = e.message;
    res.end();
  }

});
*/