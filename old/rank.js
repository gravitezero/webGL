function Rank(ranks) {

    this.object = new glObject();
	this.draw = function(){
		this.object.draw();
	}
	
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

	for ( var i=0 ; i < ranks.length ; i++) {
		sphere = genSphere(20, 20, ranks[i][3], rankToColor(ranks[i]));
		this.object.addModel(new Model(sphere[0], sphere[1], sphere[2], rankToPos(ranks[i]), gl.TRIANGLES));
	}
};
