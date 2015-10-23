
RC.Grids = React.createClass({
  render(){
    let grids = 
      ensureNonEmptyArray(
        removeUndefined(
          removeNonDivs(
            ensureArray(
              this.props.children
            )
          )
        )
      );

    let gridClass = {
      "three-quarter": "grid-three-quarter",
      "three-fifth": "grid-three-fifth",
      "two-fifth": "grid-two-fifth",
      "one-fifth": "grid-one-fifth",
      "four-fifth": "grid-four-fifth",


      full:"grid-full",
      half: "grid-half",
      third: "grid-third",
      quarter: "grid-quarter"
    }

    return <div className="clear grid-root" id={this.props.id}>
      {
      grids.map(function(grid,n){

        let size = gridClass[grid.props.size] ? gridClass[grid.props.size] : gridClass.half

        return <div className={"boxed grid "+size+" "+(grid.className || "")} key={n} id={grid.id}>
          {grid.props.children}
        </div>
      })
      }
    </div>
  },
})

// ensure sure input is a non-empty array
var ensureArray = function (maybeArray) {
  if (!_.isArray(maybeArray)) {
    console.log("single element converted to an array.");
    definiteArray = [maybeArray]
  } else {
    definiteArray = maybeArray;
  };
  return definiteArray;
}

var ensureNonEmptyArray = function (maybeEmpty) {
  if (_.isEmpty(maybeEmpty)) {
      console.log("array is empty");
      throw "array empty";
  };
  return maybeEmpty;
};

// filter out non-divs
var removeNonDivs = function (arr) {
  return _.filter(arr, function(g,n){
    if (g.type!="div") {
      console.warn("Element was rejected because it was not a <div>")
      return false
    } else return true
  });
}

// filter out undefined elements
var removeUndefined = function (arr) {
  return _.filter(arr, function(g,n){
    if (_.isUndefined(g)) {
      console.log("Filtered out undefined element - " + n + ": " + g);
      return false
    } else return true
  });
}
