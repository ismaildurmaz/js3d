var Stage = (function() {
	var _matrix = mat4.create();
	var _js3d = null;
	
	this.initialize = function(js3d, e) {
		_js3d = js3d;
		parserView(_matrix, e.attr('-data-view'));
	};
	
	this.getMatrix = function(){
		return _matrix;
	};
	
	this.render = function(){
		
	};
});