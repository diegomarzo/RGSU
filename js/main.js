var allPoints = {};
var pointsArray;
var state = "NONE";
var radious = 6;
var action_type = "NONE";
var tension = 0.25;
var canvas;
var context;

window.onload = function() {
	$('#div_cuadratica').show();
	$('#div_bezier').hide();
	$('#div_spline').hide();
	$('#div_path').hide();
	$('#div_comp').hide();

	allPoints[canvas] = [];
	canvas = document.getElementById("canvas_cuadratica");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setQuadratic();
};

function activaCuadratica() {
	$('#a_cua').addClass('current');
	$('#a_bez').removeClass('current');
	$('#a_comp').removeClass('current');
	$('#a_path').removeClass('current');
	$('#a_spline').removeClass('current');
	$('#div_cuadratica').show();
	$('#div_bezier').hide();
	$('#div_spline').hide();
	$('#div_path').hide();
	$('#div_comp').hide();

	allPoints[canvas] = pointsArray;
	canvas = document.getElementById("canvas_cuadratica");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setQuadratic();
}

function activaBezier() {
	$('#a_cua').removeClass('current');
	$('#a_bez').addClass('current');
	$('#a_comp').removeClass('current');
	$('#a_path').removeClass('current');
	$('#a_spline').removeClass('current');
	$('#div_cuadratica').hide();
	$('#div_bezier').show();
	$('#div_spline').hide();
	$('#div_path').hide();
	$('#div_comp').hide();

	allPoints[canvas] = pointsArray;
	canvas = document.getElementById("canvas_bezier");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setBezier();
}

function activaComp() {
	$('#a_cua').removeClass('current');
	$('#a_bez').removeClass('current');
	$('#a_comp').addClass('current');
	$('#a_path').removeClass('current');
	$('#a_spline').removeClass('current');
	$('#div_cuadratica').hide();
	$('#div_bezier').hide();
	$('#div_comp').show();
	$('#div_spline').hide();
	$('#div_path').hide();

	allPoints[canvas] = pointsArray;
	canvas = document.getElementById("canvas_comp");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setQuadraticComposition();
	$('input:radio[name=comp_type]').filter('[value=cuadratic]').prop('checked', true);
}

function changeCompositionType() {
	var value = $('input:radio[name=comp_type]:checked').val();
	if (value === 'cuadratic') {
		setQuadraticComposition();
	} else if (value === 'cubic') {
		setCubicComposition();
	}
}

function activaPath() {
	$('#a_cua').removeClass('current');
	$('#a_bez').removeClass('current');
	$('#a_comp').removeClass('current');
	$('#a_path').addClass('current');
	$('#a_spline').removeClass('current');
	$('#div_cuadratica').hide();
	$('#div_bezier').hide();
	$('#div_spline').hide();
	$('#div_path').show();
	$('#div_comp').hide();

	allPoints[canvas] = pointsArray;
	canvas = document.getElementById("canvas_path");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setQuadraticPath();

}

function activaSpline() {
	$('#a_cua').removeClass('current');
	$('#a_bez').removeClass('current');
	$('#a_comp').removeClass('current');
	$('#a_path').removeClass('current');
	$('#a_spline').addClass('current');
	$('#div_cuadratica').hide();
	$('#div_bezier').hide();
	$('#div_spline').show();
	$('#div_path').hide();
	$('#div_comp').hide();

	allPoints[canvas] = pointsArray;
	canvas = document.getElementById("canvas_spline");
	canvas.addEventListener('mousedown', handleCanvasMouseDown, false);
	canvas.addEventListener('mouseup', handleCanvasMouseUp, false);
	canvas.addEventListener('mousemove', handleCanvasMouseMove, false);
	context = canvas.getContext('2d');
	pointsArray = allPoints[canvas];
	setQuadraticSpline();
	$('input:radio[name=spline_type]').filter('[value=cuadratic]').prop('checked', true);

}

function changeSplineType() {
	var value = $('input:radio[name=spline_type]:checked').val();
	if (value === 'cuadratic') {
		setQuadraticSpline();
	} else if (value === 'cubic') {
		setCubicSpline();
	}
}

/* This method cleans the canvas */
function clean() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function resetAll() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	action_type = "PLACE";
	pointsArray = [];
}

function drawPointsArray() {
	for (var i = 0; i < pointsArray.length; i++) {
		context.beginPath();
		context.arc(pointsArray[i].x, pointsArray[i].y, radious, 0, 2 * Math.PI, false);

		if (pointsArray[i].type === "PATH") {
			context.strokeStyle = 'black';
		} else if (pointsArray[i].type === "CONTROL") {
			context.strokeStyle = 'green';
		}

		context.lineWidth = 2;
		context.stroke();
	}
}

function drawQuadraticCurve() {
	context.beginPath();
	context.moveTo(pointsArray[0].x, pointsArray[0].y);
	context.quadraticCurveTo(pointsArray[1].x, pointsArray[1].y, pointsArray[2].x, pointsArray[2].y);
	context.lineWidth = 3;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawQuadraticComposition() {
	context.beginPath();
	var i = 0;
	while (i + 2 < pointsArray.length) {
		context.moveTo(pointsArray[i].x, pointsArray[i].y);
		context.quadraticCurveTo(pointsArray[++i].x, pointsArray[i].y, pointsArray[++i].x, pointsArray[i].y);
	}
	context.lineWidth = 3;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawQuadraticPath() {
	context.beginPath();
	context.moveTo(pointsArray[0].x, pointsArray[0].y);
	for ( i = 1; i < pointsArray.length - 2; i++) {
		var xc = (pointsArray[i].x + pointsArray[i + 1].x) / 2;
		var yc = (pointsArray[i].y + pointsArray[i + 1].y) / 2;
		context.quadraticCurveTo(pointsArray[i].x, pointsArray[i].y, xc, yc);
	}
	// curve through the last two points
	context.quadraticCurveTo(pointsArray[i].x, pointsArray[i].y, pointsArray[i + 1].x, pointsArray[i + 1].y);
	context.lineWidth = 3;
	// line color
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBezierCurve() {
	context.beginPath();
	context.moveTo(pointsArray[0].x, pointsArray[0].y);
	context.bezierCurveTo(pointsArray[1].x, pointsArray[1].y, pointsArray[2].x, pointsArray[2].y, pointsArray[3].x, pointsArray[3].y);
	context.lineWidth = 3;
	context.strokeStyle = 'red';
	context.stroke();
}

function drawBezierComposition() {
	context.beginPath();
	var i = 0;
	while (i + 3 < pointsArray.length) {
		context.moveTo(pointsArray[i].x, pointsArray[i].y);
		context.bezierCurveTo(pointsArray[++i].x, pointsArray[i].y, pointsArray[++i].x, pointsArray[i].y, pointsArray[++i].x, pointsArray[i].y);
	}
	context.lineWidth = 3;
	context.strokeStyle = 'red';
	context.stroke();
}

function setQuadratic() {
	resetAll();
	action_type = "CONTROL";
	state = "DRAW_QUADRATIC";
	pointsArray = [{
		x : 200,
		y : 300,
		type : "PATH"
	}, {
		x : 400,
		y : 100,
		type : "CONTROL"
	}, {
		x : 600,
		y : 300,
		type : "PATH"
	}];
	drawPointsArray();
	drawQuadraticCurve();
}

function setBezier() {
	resetAll();
	action_type = "CONTROL";
	state = "DRAW_BEZIER";
	pointsArray = [{
		x : 200,
		y : 300,
		type : "PATH"
	}, {
		x : 350,
		y : 100,
		type : "CONTROL"
	}, {
		x : 450,
		y : 100,
		type : "CONTROL"
	}, {
		x : 600,
		y : 300,
		type : "PATH"
	}];
	drawPointsArray();
	drawBezierCurve();
}

function setQuadraticComposition() {
	resetAll();
	action_type = "PLACE";
	state = "DRAW_QUADRATIC_COMPOSITION";
}

function setCubicComposition() {
	resetAll();
	action_type = "PLACE";
	state = "DRAW_CUBIC_COMPOSITION";
}

function setQuadraticPath() {
	resetAll();
	action_type = "PLACE";
	state = "DRAW_QUADRATIC_PATH";
}

function setQuadraticSpline() {
	resetAll();
	action_type = "PLACE";
	state = "DRAW_QUADRATIC_SPLINE";
}

function setCubicSpline() {
	resetAll();
	action_type = "PLACE";
	state = "DRAW_CUBIC_SPLINE";
}

function addPoint(point) {
	if (state === "DRAW_QUADRATIC_COMPOSITION") {
		var type = "CONTROL";
		if (pointsArray.length % 2 == 0) {
			type = "PATH";
		}
		pointsArray.push({
			x : point.x,
			y : point.y,
			type : type
		});
		clean();
		drawPointsArray();
	} else if (state === "DRAW_CUBIC_COMPOSITION") {
		var type = "CONTROL";
		if (pointsArray.length % 3 == 0) {
			type = "PATH";
		}
		pointsArray.push({
			x : point.x,
			y : point.y,
			type : type
		});
		clean();
		drawPointsArray();
	} else {
		pointsArray.push({
			x : point.x,
			y : point.y,
			type : "PATH"
		});
		clean();
		drawPointsArray();
	}
}

function distance(pointA, pointB) {
	//D = sqrt(dx^2 + dy^2) => D^2 = dx^2 + dy^2
	var dX = pointA.x - pointB.x;
	var dY = pointA.y - pointB.y;
	var dX2 = dX * dX;
	var dY2 = dY * dY;
	var total = dX2 + dY2;
	return total;
}

function calculateFirstControlPoint(p0, p1) {
	var incY = Math.abs(p1.y - p0.y) / 2;
	var newY = 0;
	if (p1.y >= p0.y) {
		newY = p0.y + incY;
	} else {
		newY = p0.y - incY;
	}

	return {
		x : Math.round(p0.x),
		y : Math.round(newY),
		type : "CONTROL"
	};

}

function calculateControlPoint(previous, current, next, previousControlPoint) {
	var previousDistance = distance(previous, current);
	var nextDistance = distance(current, next);
	var factor = nextDistance / previousDistance;
	var incX = current.x - previousControlPoint.x;
	var incY = current.y - previousControlPoint.y;
	return {
		x : Math.round(current.x + incX * factor),
		y : Math.round(current.y + incY * factor),
		type : "CONTROL"
	}
}

function mergeArrays(a1, a2) {
	var r = [];
	//There is an extra element in a1
	r.push(a1.pop());
	while (a1.length > 0 && a2.length > 0) {
		r.push(a2.pop());
		r.push(a1.pop());
	}
	return r;
}

function purgePointsArray() {
	var newPointsArray = [];
	if (pointsArray) {
		//If we have any control points in the array we are going to purge them first.
		for (var i = 0; i < pointsArray.length; i++) {
			if (pointsArray[i].type === "PATH") {
				newPointsArray.push(pointsArray[i]);
			}
		}
	}
	return newPointsArray;
}

function calculateControlPointsForQuadraticSpline() {
	if (pointsArray) {
		var newPointsArray = purgePointsArray();
		if (newPointsArray && newPointsArray.length > 1) {
			//We calculate the first control point, just the tension is important, and it will define the first quadratic curve
			var controlPoints = [];
			controlPoints.push(calculateFirstControlPoint(newPointsArray[0], newPointsArray[1]));
			for (var i = 1; i < pointsArray.length - 1; i++) {
				controlPoints.push(calculateControlPoint(newPointsArray[i - 1], newPointsArray[i], newPointsArray[i + 1], controlPoints[controlPoints.length - 1]));
			}
		}
		pointsArray = mergeArrays(newPointsArray, controlPoints);
	}
}

function getControlPoints(p0, p1, p2, t) {
	//  p0(x0,y0) and  p1(x1,y1) are the begining and end of first segment
	//  p2 is the next point, not connected yet but needed to calculate pc2
	//  pc1 is the control point calculated here, from x1 back toward x0.
	//  pc2 is the next control point, calculated here and returned to become the
	//  next segment's pc1.
	//  t is the 'tension' which controls how far the control points spread.

	//  Scaling factors: distances from this knot to the previous and following knots.
	var d01 = distance(p0, p1);
	var d12 = distance(p1, p2);

	var fa = t * d01 / (d01 + d12);
	var fb = t - fa;

	var pc1x = p1.x + fa * (p0.x - p2.x);
	var pc1y = p1.y + fa * (p0.y - p2.y);

	var pc2x = p1.x - fb * (p0.x - p2.x);
	var pc2y = p1.y - fb * (p0.y - p2.y);

	return [{
		x : pc1x,
		y : pc1y,
		type : "CONTROL"
	}, {
		x : pc2x,
		y : pc2y,
		type : "CONTROL"
	}];
}

function cubicMergeArrays(a1, a2) {
	var r = [];
	//There is an extra element in a1
	r.push(a1.pop());
	while (a1.length > 0 && a2.length > 0) {
		//2 elements for the second for each one in the first
		r.push(a2.pop());
		r.push(a2.pop());
		r.push(a1.pop());
	}
	return r;
}

function calculateControlPointsForCubicSpline() {
	if (pointsArray) {
		var newPointsArray = purgePointsArray();
		//The first control point of all should be in the same position than the first path point
		var controlPoints = [];
		controlPoints.push(newPointsArray[0]);
		for (var i = 0; i < pointsArray.length - 2; i++) {
			controlPoints = controlPoints.concat(getControlPoints(pointsArray[i], pointsArray[i + 1], pointsArray[i + 2], tension));
		}
		//The last control point of all should be in the same position than the last path point
		controlPoints.push(newPointsArray[pointsArray.length - 1]);
		console.log(controlPoints);
		pointsArray = cubicMergeArrays(newPointsArray, controlPoints);
		console.log(pointsArray);
	}
}

function draw() {
	action_type = "CONTROL";
	if (state === "DRAW_QUADRATIC") {
		clean();
		drawPointsArray();
		drawQuadraticCurve();
	} else if (state === "DRAW_BEZIER") {
		clean();
		drawPointsArray();
		drawBezierCurve();
	} else if (state === "DRAW_QUADRATIC_COMPOSITION") {
		clean();
		drawPointsArray();
		drawQuadraticComposition();
	} else if (state === "DRAW_CUBIC_COMPOSITION") {
		clean();
		drawPointsArray();
		drawBezierComposition();
	} else if (state === "DRAW_QUADRATIC_PATH") {
		clean();
		drawPointsArray();
		drawQuadraticPath();
	} else if (state === "DRAW_QUADRATIC_SPLINE") {
		calculateControlPointsForQuadraticSpline();
		state = "DRAW_QUADRATIC_COMPOSITION";
		draw();
	} else if (state === "DRAW_CUBIC_SPLINE") {
		calculateControlPointsForCubicSpline();
		state = "DRAW_CUBIC_COMPOSITION";
		draw();
	}
}

var mouseState = {
	pressed : false,
	selected : -1
};

function pointsInRange(pointA, pointB) {
	//Two points are in range if the distance between them is smaller than the radious of the "point"
	var r2 = radious * radious;
	var result = (r2 > distance(pointA, pointB));
	return result;
}

function existsPointInRange(point) {
	for (var i = 0; i < pointsArray.length; i++) {
		if (pointsInRange(point, pointsArray[i])) {
			return i;
		}
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : Math.round(evt.clientX - rect.left),
		y : Math.round(evt.clientY - rect.top)
	};
}

function changeState() {
	if (action_type === "PLACE") {
		action_type = "CONTROL";
	} else if (action_type === "CONTROL") {
		action_type = "PLACE";
	}
}

function handleCanvasMouseDown(evt) {
	if (action_type === "PLACE") {
		var mousePos = getMousePos(canvas, evt);
		addPoint(mousePos);
	} else if (action_type === "CONTROL") {
		var mousePos = getMousePos(canvas, evt);
		//If there is any point in this range, then we will remove the point
		var indexOfPointInRange = existsPointInRange(mousePos);
		if (indexOfPointInRange >= 0) {
			mouseState.pressed = true;
			mouseState.selected = indexOfPointInRange;
		}
	}
}

function handleCanvasMouseUp(evt) {
	mouseState.pressed = false;
}

function handleCanvasMouseMove(evt) {
	if (action_type === "CONTROL") {
		if (mouseState.pressed) {
			var mousePos = getMousePos(canvas, evt);
			pointsArray[mouseState.selected].x = mousePos.x;
			pointsArray[mouseState.selected].y = mousePos.y;
			draw();
		}
	}
}

