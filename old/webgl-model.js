function Model(vertices, colors, normales, origi, rendering) {

    this.vertices = vertices;
    this.colors = colors;
    this.normales = normales;
    this.rendering = rendering;
	this.origin = [0.0,0.0,0.0];
    this.lineWidth = 1;
    this.verticesBuffer = gl.createBuffer();
    this.colorsBuffer = gl.createBuffer();
    this.normalesBuffer = gl.createBuffer();

	
	this.setOrigin = function(orig) {
		for( var i=0 ; (i+2) < this.vertices.length ; i += 3) {
			this.vertices[i] += (orig[0] - this.origin[0]);
			this.vertices[i+1] += (orig[1] - this.origin[1]);
			this.vertices[i+2] += (orig[2] - this.origin[2]);
		}
		this.origin = orig;
	}
	
    this.genBuffers = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        
        this.verticesBuffer.itemSize = 3;
        this.verticesBuffer.numItems = this.vertices.length / 3;
           
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        
        this.colorsBuffer.itemSize = 4;
        this.colorsBuffer.numItems = this.colors.length / 4;
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normales), gl.STATIC_DRAW);
        
        this.normalesBuffer.itemSize = 3;
        this.normalesBuffer.numItems = this.normales.length / 3;
    };
	
	this.setOrigin(origi);
    this.genBuffers();

    this.draw = function() {
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.verticesBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.colorsBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        setMatrixUniforms();
        gl.lineWidth(lineWidth);
        gl.drawArrays(this.rendering, 0, this.verticesBuffer.numItems);
    };

};


