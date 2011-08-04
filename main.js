var container;

var camera, scene, renderer;

var rotation = { init: 0, current: 0 };
var translation = { init:100, current: 100 };

var mouse = { x: 0, y: 0, xOnDown: 0, yOnDown:0, down: false };
var INTERSECTED;	

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var programFill = function ( context ) {

	context.beginPath();
	context.arc( 0, 0, 1, 0, 2*Math.PI, true );
	context.closePath();
	context.fill();

}

	
var programStroke = function ( context ) {

	context.lineWidth = 0.05;
	context.beginPath();
	context.arc( 0, 0, 1, 0, 2*Math.PI, true );
	context.closePath();
	context.stroke();

}			

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	//container = document.getElementById('container');

	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 100;
	camera.position.z = 500;
	camera.target.position.y = 100;

	scene = new THREE.Scene();
	projector = new THREE.Projector();

	drawAxes(scene);
	
	//for ( var i = 0 ; i < 10 ; i++)
	//{
		//addRank(scene, [i*36,0.5,0.5,0.01]);
	//}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseDown( event ) {

	//event.preventDefault();

	mouse.down = true;
	
	mouse.xOnDown = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.yOnDown = - ( event.clientY / window.innerHeight ) * 2 + 1;
	rotation.init = rotation.current;
	translation.init = translation.current;
	

    //addRank(scene, [36,0.5,0.5,0.01]);
	
}

function onDocumentMouseMove( event ) {
	
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	if (mouse.down) {
		rotation.current = rotation.init + ( mouse.x - mouse.xOnDown ) * 0.8;
		translation.current = translation.init - (mouse.y - mouse.yOnDown) * 100;
	}
}

function onDocumentMouseUp( event ) {
	mouse.down = false;
}

function onDocumentMouseOut( event ) {
	//mouse.down = false;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	
	camera.position.x = Math.cos( rotation.current ) * 500;
	camera.position.z = Math.sin( rotation.current ) * 500;
	camera.position.y = translation.current;
	camera.target.position.y = translation.current;
	
	camera.update();
	
	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );

	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

	var intersects = ray.intersectScene( scene );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ){
				INTERSECTED.materials[ 0 ].program = programStroke;
				INTERSECTED.axes[0].materials[0].opacity = 0.2;
				INTERSECTED.axes[1].materials[0].opacity = 0.2;
				hideSelected();
			}
			
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.materials[ 0 ].program = programFill;
			INTERSECTED.axes[0].materials[0].opacity = 0.8;
			INTERSECTED.axes[1].materials[0].opacity = 0.8;
			showSelected(INTERSECTED.rank);

		}

	} else {

		if ( INTERSECTED ) {
			INTERSECTED.materials[ 0 ].program = programStroke;
			INTERSECTED.axes[0].materials[0].opacity = 0.2;
			INTERSECTED.axes[1].materials[0].opacity = 0.2;
			hideSelected();
		}
		INTERSECTED = null;

	}
	
	renderer.render( scene, camera );

}


function main() {
	init();
	animate();
}
