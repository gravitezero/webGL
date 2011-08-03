function Model(vertices, colors, rendering) {

    this.vertices = vertices;
    this.colors = colors;
    this.rendering = rendering;
    this.lineWidth = 1;
    this.verticesBuffer = gl.createBuffer();
    this.colorsBuffer = gl.createBuffer();


    this.genBuffers = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        
        this.verticesBuffer.itemSize = 3;
        this.verticesBuffer.numItems = this.vertices.length / 3;
           
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        
        this.colorsBuffer.itemSize = 4;
        this.colorsBuffer.numItems = this.colors.length / 4;
    };
    
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


