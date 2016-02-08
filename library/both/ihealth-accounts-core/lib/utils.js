
// h.xxx


// Match patterns

h.ObjWithStringValues = Match.Where(function (x) {
  check(x, Object);
  _.each(_.values(x), function(value) {
    check(value, String);
  });
  return true;
});