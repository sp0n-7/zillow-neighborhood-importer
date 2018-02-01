# Neighborhood importer

A JS script written to import GeoJSON Polygons and MultiPolygons (specifically from the [Zillow neighborhood boundaries](https://www.zillow.com/howto/api/neighborhood-boundaries.htm) data set) and generate an INSERT statement to push them to MySQL. The script grabs:

- Name
- Polygon
- City
- State
- County
- Region ID (from Zillow, I guess)

### Run it

Assuming neighborhoods.json is the data you want to import
- Run `node main.js` from the directory. No special libs, so no `npm install` needed.
- The INSERT statement will get copied into the clipboard, copypasta it to MySQL
