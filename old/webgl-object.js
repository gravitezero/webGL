function glObject() {

    this.models = new Array();
	
	this.addModel = function(model) {
		this.models.push(model);
	}
	
	this.draw = function() {
		for ( var i=0 ; i < this.models.length ; i++ ) {
			this.models[i].draw();
		}
	}

};