var fs = require('fs')

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(data); proc.stdin.end();
}

function appendInsertStatement(statement, props, coords) {
	coords = coords.map(function(ll) {
		return ll[1] + " " + ll[0]
	}).join(',');
	coords = "POLYGON((" + coords + "))";
	statement += `\nINSERT INTO nyc_neighborhoods(name, geometry, city, state, county, region_id) VALUES("${props.Name}",ST_GeomFromText("${coords}"), "${props.City}", "${props.State}", "${props.County}", "${props.RegionID}");`;
	return statement;
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

		neighborhood.geometry.coordinates.forEach(function(poly,i) {
			if (polygonType && polygonType === "MultiPolygon") {
				insertStatement = appendInsertStatement(insertStatement, props, poly[0]);
			} else {
				insertStatement = appendInsertStatement(insertStatement, props, poly);
			}
		})
	})
	pbcopy(insertStatement)
  console.log("INSERT statement copied to clipboard")

})
