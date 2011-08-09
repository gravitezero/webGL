function yAxisSprite() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 500;
	canvas.height = 2000;

	var context = canvas.getContext( '2d' );
	
	context.save();
	context.translate(250,1000)
	context.rotate(Math.PI/2);
	context.font = "60pt Calibri";
	context.textAlign = "center";
	context.textBaseline = "bottom";
	context.fillText("Charism", 0, 0);
	context.restore();
	
	context.lineWidth = 3;
	
	for (var i = 0 ; i < 100 ; i++) {
		context.moveTo(250, i*20);
		if (i % 10 == 0) {
			context.lineTo(200, i*20);
		} else if (i % 5 == 0) {
			context.lineTo(225, i*20);
		} else {
			context.lineTo(235, i*20);
		}
	}
	context.stroke();
	return canvas;
}

function drawAxes(scene) {

	// Y Axis Sprite

	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture( yAxisSprite() ), blending: THREE.AdditiveBlending } );
	textYAxis = new THREE.Particle( material );
	textYAxis.position.y = 200;
	textYAxis.scale.x = textYAxis.scale.y = 0.2;
	scene.addObject( textYAxis );

	// Y Axis

	var yAxisGeo = new THREE.Geometry();
	yAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 0, 0 ) ) );
	yAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 400, 0 ) ) );

	var yAxis = new THREE.Line( yAxisGeo, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.8 } ) );
	scene.addObject( yAxis );

	// Circle Geometry

	var circleGeo = new THREE.Geometry();
	for (var i = 0 ; i <= 100 ; i++) {
		var angle = i*2*Math.PI / 100;
		var radius = 300;
		circleGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( radius * Math.cos(angle), 0, radius * Math.sin(angle) ) ) );
	}

	// External Circle
	
	var circle = new THREE.Line( circleGeo, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.8 } ) );
	scene.addObject( circle );

	// Internal Circles
	
	for ( var i = 0.1 ; i < 1 ; i += 0.1) {
		var circle = new THREE.Line( circleGeo, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.1 } ) );
		circle.scale.x = circle.scale.z = i;
		scene.addObject( circle );
	}

	// 
	
	var graduationGeo = new THREE.Geometry();
	graduationGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 0, 0 ) ) );
	graduationGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( 2, 0, 0 ) ) );

	for (var i = 0 ; i < 360 ; i++) {

		var graduation = new THREE.Line( graduationGeo, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );
		if (i % 6 == 0) {
			graduation.scale.x = 2;
		}
		if (i % 30 == 0) {
			graduation.scale.x = 4;
		}					
		graduation.rotation.y = -i/360 * 2 * Math.PI;
		graduation.position.x = 300 * Math.cos(i/360 * 2*Math.PI);
		graduation.position.z = 300 * Math.sin(i/360 * 2*Math.PI);
		scene.addObject( graduation );
	}
}
