function genSphere(latitudeBands, longitudeBands, radius, color) {
	var vertexData = [];
	var colorData = [];
	var normalData = [];
	
	for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
		var theta1 = latNumber * Math.PI / latitudeBands;
		var theta2 = (latNumber+1) * Math.PI / latitudeBands;
		var sinTheta1 = Math.sin(theta1);
		var cosTheta1 = Math.cos(theta1);
		var sinTheta2 = Math.sin(theta2);
		var cosTheta2 = Math.cos(theta2);
		
		for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
			var phi1 = longNumber * 2 * Math.PI / longitudeBands;
			var phi2 = (longNumber+1) * 2 * Math.PI / longitudeBands
			
			var sinPhi1 = Math.sin(phi1);
			var cosPhi1 = Math.cos(phi1);
			var sinPhi2 = Math.sin(phi2);
			var cosPhi2 = Math.cos(phi2);
			
			var x1 = cosPhi1 * sinTheta1; 
			var y1 = cosTheta1;
			var z1 = sinPhi1 * sinTheta1;
			
			var x2 = cosPhi2 * sinTheta1; 
			var y2 = cosTheta1;
			var z2 = sinPhi2 * sinTheta1;
			
			var x3 = cosPhi1 * sinTheta2; 
			var y3 = cosTheta2;
			var z3 = radius * sinPhi1 * sinTheta2;
			
			var x4 = cosPhi2 * sinTheta2; 
			var y4 = cosTheta2;
			var z4 = sinPhi2 * sinTheta2;
			
			if (latNumber != 0)
			{
				vertexData.push(radius * x1);
				vertexData.push(radius * y1);
				vertexData.push(radius * z1);
				normalData.push(x1);
				normalData.push(y1);
				normalData.push(z1);
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
				
				vertexData.push(radius * x2);
				vertexData.push(radius * y2);
				vertexData.push(radius * z2);
				normalData.push(x2);
				normalData.push(y2);
				normalData.push(z2);
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
				
				vertexData.push(radius * x3);
				vertexData.push(radius * y3);
				vertexData.push(radius * z3);
				normalData.push(x3);
				normalData.push(y3);
				normalData.push(z3);
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
			}
			
			if (latNumber != (latitudeBands-1))
			{
				vertexData.push(radius * x4);
				vertexData.push(radius * y4);
				vertexData.push(radius * z4);
				normalData.push(x4);
				normalData.push(y4);
				normalData.push(z4);				
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
				
				vertexData.push(radius * x2);
				vertexData.push(radius * y2);
				vertexData.push(radius * z2);
				normalData.push(x2);
				normalData.push(y2);
				normalData.push(z2);				
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
				
				vertexData.push(radius * x3);
				vertexData.push(radius * y3);
				vertexData.push(radius * z3);
				normalData.push(x3);
				normalData.push(y3);
				normalData.push(z3);				
				colorData.push(color[0]);
				colorData.push(color[1]);
				colorData.push(color[2]);
				colorData.push(color[3]);
			}
		}
	}
	return [vertexData, colorData, normalData];
}

function genLink(point1, point2, longitudeBands, color) {
	var vertexData = [];
	var colorData = [];
	
	function posToRank(pos) {
		var rank = new Array(3);
		rank[2] = pos[1];
		rank[0] = Math.atan2(pos[1],pos[2]);
		rank[1] = Math.sqrt(pos[1]*pos[1] + pos[0]*pos[0]);

		return rank;
	}
	
	


}
