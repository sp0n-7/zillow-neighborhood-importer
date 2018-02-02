var fs = require('fs')

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data); proc.stdin.end();
}

// POLYGON
function getPolygonInsertStatement(props, coords) {
	coords = coords.map(function(ll) {
		return ll[1] + " " + ll[0]
	}).join(',');
	coords = "POLYGON((" + coords + "))";
	return `\nINSERT INTO nyc_neighborhoods(name, geometry, city, state, county, region_id) VALUES("${props.Name}",ST_GeomFromText("${coords}"), "${props.City}", "${props.State}", "${props.County}", "${props.RegionID}");`;
}

// MULTIPOLYGON
function getMultiPolygonInsertStatement(props, multiPoly) {
  var coords = "MULTIPOLYGON(" +
    multiPoly.map(function(polygon) {
      return "((" +
        polygon[0].map(function(ll) {
    		    return ll[1] + " " + ll[0]
        }).join(",")
        + "))";
    }).join(",")
    + ")"

	return `\nINSERT INTO nyc_neighborhoods(name, geometry, city, state, county, region_id) VALUES("${props.Name}",ST_GeomFromText("${coords}"), "${props.City}", "${props.State}", "${props.County}", "${props.RegionID}");`;
}

fs.readFile('./neighborhoods.json', function(err,data) {
	if(err) {
		throw err;
	}
	neighborhoodData = JSON.parse(data);

	var insertStatement;

	neighborhoodData.features.forEach(function(neighborhood, i) {
		var props = neighborhood.properties;
		var polygonType = neighborhood.geometry.type;

    if (polygonType && polygonType === "MultiPolygon") {
      insertStatement += getMultiPolygonInsertStatement(props, neighborhood.geometry.coordinates);
    } else if (polygonType && polygonType === "Polygon") {
      insertStatement += getPolygonInsertStatement(props, neighborhood.geometry.coordinates[0]);
    }
	})
	pbcopy(insertStatement)
  console.log("INSERT statement copied to clipboard")

})
