function rankToPos(rank) {
	var position = new Array(3);
	position[1] = rank[2];
	position[0] = rank[1] * Math.cos(rank[0]);
	position[2] = rank[1] * Math.sin(rank[0]);
	return position;
}

function posToRank(pos) {
	var rank = new Array(3);
	rank[2] = pos[1];
	rank[0] = Math.atan2(pos[1],pos[2]);
	rank[1] = Math.sqrt(pos[1]*pos[1] + pos[0]*pos[0]);

	return rank;
}

function rankToColor(rank) {

	hue = rank[0]/Math.PI * 180;
	value = 1.0;
	saturation = 1.0;
	
	chroma = value * saturation;
	hueSector = Math.floor(hue / 60.0) % 6;
	X = chroma * ( 1 - Math.abs(hueSector % 2 - 1));
	m = value - chroma;
	
	switch(hueSector) {
		case 0: return [chroma + m, X + m, m, 1.0];
		case 1: return [X + m, chroma + m, m, 1.0];
		case 2: return [m, chroma + m, X + m, 1.0];
		case 3: return [m, X + m, chroma + m, 1.0];
		case 4: return [X + m, m, chroma + m, 1.0];
		case 5: return [chroma + m, m, X + m, 1.0];
	}
}

function pad16Str(d){
	if (d < 16)
		return "0" + d.toString(16);
	else
		return d.toString(16);
}

function colorToHTML(color){
	return "0x" + pad16Str(color[0]*255) + pad16Str(color[1]*255) + pad16Str(color[2]*255) ;
}

function showSelected(rank) {
    selected = document.getElementById("selected");
    selected.style.display = 'block';
    
    type1 = document.getElementById("Type1");
    label1 = document.getElementById("LabelType1");
    bar1 = document.getElementById("BarType1");
    
    type2 = document.getElementById("Type2");
    label2 = document.getElementById("LabelType2");
    bar2 = document.getElementById("BarType2");

    
    if (Math.cos(rank[0]) > 0.0001 ) {
    
        var dist = (rank[0] < Math.PI ) ? rank[0] : 2*Math.PI - rank[0];
        label1.innerHTML="Sexyness";
        //bar1.style.borderLeftWidth = (Math.cos(rank[0]) * 160).toString(10) + "px";
        //bar1.style.width = ((1-Math.cos(rank[0])) * 160).toString(10) + "px";
        
        bar1.style.borderLeftWidth = ((1-(dist / Math.PI * 2)) * 160).toString(10) + "px";  
        bar1.style.width = (dist / Math.PI * 2 * 160).toString(10) + "px";
        
        type1.style.display="block";
    } else if (Math.cos(rank[0]) < -0.0001 ) {
        label1.innerHTML="Beautyfulness";
        bar1.style.borderLeftWidth = ((1-(Math.abs(rank[0]-Math.PI) / Math.PI * 2)) * 160).toString(10) + "px";  
        bar1.style.width = (Math.abs(rank[0]-Math.PI) / Math.PI * 2 * 160).toString(10) + "px";
        type1.style.display="block";        
    } else {
        type1.style.display="none";
    }
    
    if (Math.sin(rank[0]) > 0.0001 ) {
        label2.innerHTML="Delightfulness";
        bar2.style.borderLeftWidth = ((1-(Math.abs(rank[0]-Math.PI/2) / Math.PI * 2)) * 160).toString(10) + "px";  
        bar2.style.width = (Math.abs(rank[0]-Math.PI/2) / Math.PI * 2 * 160).toString(10) + "px";
        
        type2.style.display="block";        
    } else if (Math.sin(rank[0]) < -0.0001 ) {
        label2.innerHTML="Hotness";
        bar2.style.borderLeftWidth = ((1-(Math.abs(rank[0]-3*Math.PI/2) / Math.PI * 2)) * 160).toString(10) + "px";  
        bar2.style.width = (Math.abs(rank[0]-3*Math.PI/2) / Math.PI * 2 * 160).toString(10) + "px";        
        
        type2.style.display="block";        
    } else {
        type2.style.display="none";
    }

    Beauty = document.getElementById("Beauty");
    Beauty.style.borderLeftWidth = (rank[1] * 160).toString(10) + "px";
    Beauty.style.width = ((1-rank[1]) * 160).toString(10) + "px";

    Charm = document.getElementById("Charism");
    Charm.style.borderLeftWidth = (rank[2] * 160).toString(10) + "px";
    Charm.style.width = ((1 - rank[2]) * 160).toString(10) + "px";

    Accuracy = document.getElementById("Accuracy"); 
       
    if( rank[3] < 1 ) {
        Accuracy.style.borderLeftWidth = ((1-rank[3]) * 160).toString(10) + "px";
        Accuracy.style.width = (rank[3] * 160).toString(10) + "px";
    } else {
        Accuracy.style.borderLeftWidth = "160px";
        Accuracy.style.width = "0px";
    }
}

function hideSelected() {
    document.getElementById("selected").style.display = 'none';
}

function addRank(scene, rank) {

    rank[0] *= Math.PI / 180;
    rank[1] *= 300;
    rank[2] *= 400;
    rank[3] *= 400;

	var position = rankToPos(rank);
	var color = rankToColor(rank);

	var horizParticleAxisGeo = new THREE.Geometry();
	horizParticleAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, position[1], 0 ) ) );
	horizParticleAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( position[0] - rank[3]*Math.cos(rank[0]), position[1], position[2] - rank[3]*Math.sin(rank[0]) ) ) );

	var vertParticleAxisGeo = new THREE.Geometry();
	vertParticleAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( position[0] , 0, position[2]  ) ) );
	vertParticleAxisGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( position[0] , position[1]-rank[3], position[2]  ) ) );

	var horizParticleAxis = new THREE.Line( horizParticleAxisGeo, new THREE.LineBasicMaterial( { color: colorToHTML(rankToColor(rank)), opacity: 0.2 } ) );
	var vertParticleAxis = new THREE.Line( vertParticleAxisGeo, new THREE.LineBasicMaterial( { color: colorToHTML(rankToColor(rank)), opacity: 0.2 } ) );

	scene.addObject( horizParticleAxis );
	scene.addObject( vertParticleAxis );

	var particle = new THREE.Particle( new THREE.ParticleCanvasMaterial( { color: colorToHTML(rankToColor(rank)), opacity: 0.8, program: programStroke } ) );
	particle.position.x = position[0];
	particle.position.y = position[1];
	particle.position.z = position[2];
	particle.scale.x = particle.scale.y = rank[3];
	particle.axes = [horizParticleAxis, vertParticleAxis];	
	particle.rank = [
	    rank[0],
        rank[1] / 300,
        rank[2] / 400,
        rank[3] / 400
	];
	scene.addObject( particle );
	
}
