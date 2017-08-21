var randomMapParameterX = [];
var randomMapParameterY = [];
var parameters = {
    "numOfParameters": 10,
    "mapMultiplierX": 100,
    "mapMultiplierY": 100,
    "difficulty": 1,  //the lower the more difficult and the slower to generate map
    "step": 0.001,
    "mapWidth": 3600,
    "mapHeight": 900,
    "yOffset": 420,
    "arcLength": 5000,   //the total length of the generated terrain, i.e., the curve
    "maxTryTime": 2000
}

function generateMapSeed() {
	for (var i=0; i<parameters.numOfParameters; i++) {
		randomMapParameterX[i] = Math.random() * (2*parameters.mapMultiplierX) - parameters.mapMultiplierX;
		randomMapParameterY[i] = Math.random() * (2*parameters.mapMultiplierY) - parameters.mapMultiplierY;
	}
}

mapX = function(t) {
	var x = 0;
	for (var i=0; i<parameters.numOfParameters; i++) {
		x += randomMapParameterX[i] * Math.sin(t * parameters.step * i);
    }
	return (x + t * parameters.difficulty) | 0;
}

mapY = function(t) {
	var y = 0;
	for (var i=0; i<parameters.numOfParameters; i++) {
		y += randomMapParameterY[i] * Math.sin(t * Math.PI/(parameters.mapWidth) *i);
    }
	return y + parameters.yOffset;
}

function generateMap() {
    var overlap;
    var map = {};
    generateMapSeed();
    var tryTime = 0;
    do {
        tryTime++;
        map = {};
        overlap = false;
        for (var t=0; t<parameters.arcLength; t++) {
            if (mapX(t) > parameters.mapWidth) break;
            if (!(mapX(t) in map)) {
                map[mapX(t)] = [];
            }
            map[mapX(t)].push(mapY(t));
            if ( mapY(t) > parameters.mapHeight || tryTime > parameters.maxTryTime
            || (map[mapX(t)].length > 2 && (map[mapX(t)][map[mapX(t)].length - 1] - map[mapX(t)][map[mapX(t)].length - 2])*(map[mapX(t)][map[mapX(t)].length - 1] - map[mapX(t)][map[mapX(t)].length - 3])<0)) {
				overlap = true;
				generateMapSeed();
				break;
			}
        }
    } while (overlap);
    return map;
}

function getNearestAvailable(x, map)
{
	var availableX = Object.keys(map);
	var availX = x;
	var difference = 10;
	for (var i = 0; i<availableX.length; i++)
	{
		if (Math.abs(parseInt(availableX[i]) - x) < difference)
		{
			availX = parseInt(availableX[i]);
			difference = Math.abs(availX - x);
		}
	}
	return finalX;
}