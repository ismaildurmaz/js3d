var js3d = (function() {
	var _canvas = null;
	var _gl = null;
	var _rootObject = null;

	this.gl = function() {
		return _gl;
	};

	/**
	 * Canvas element
	 */
	this.canvas = function() {
		return _canvas;
	};

	/**
	 * Main root game object
	 */
	this.rootObject = function() {
		return _rootObject;
	};

	/**
	 * Initialize the canvas with webgl. 
	 */
	this.initialize = function(canvas) {
		try {
			_canvas = canvas;
			_gl = canvas.getContext("experimental-webgl");
			_gl.viewportWidth = canvas.width;
			_gl.viewportHeight = canvas.height;
		} catch (e) {
		}
		if (!gl) {
			alert("Could not initialise WebGL");
		}
	};

	/**
	 * Draw the scene all objects
	 */
	this.drawScene = function() {

	};

	/**
	 * Clear the scene
	 */
	this.clearScene = function() {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	};
});