var Stage = (function() {
	var _view = null;
	var _matrix = mat4.create();
	var _js3d = null;
	
	this.initialize = function(js3d, e) {
		_js3d = js3d;
		
		mat4.identity(_matrix);
		
		var list = e.attr("style").split(';');
		var styles = {};
		var c = '';
		for ( var x = 0; x < list.length; x++) {
			c = list[x].split(':');
			styles[$.trim(c[0])] = $.trim(c[1]);
		}
		_view = styles["view"];

		if(new RegExp("perspective").test(_view)){
			var pattern = /[+-]?\d+([.]\d*)?/g;
			var k = _view.match(pattern);
			if(k.length != 3){
				console.error("Perspective value is invalid. It has 3 arguments (degree, near value, far value)");
			}else {
				mat4.perspective(_matrix, k[0], _js3d.getGl().viewportWidth / _js3d.getGl().viewportHeight, k[1], k[2], _matrix);
			}
		}
	};
	
	this.getMatrix = function(){
		return _matrix;
	};
	
	this.render = function(){
		
	};
});