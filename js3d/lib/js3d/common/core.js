var JS3d = (function() {
	var _canvas = null;
	var _gl = null;
	var _rootObject = null;
	var _shaderProgram = null;
	var _stages = [];
	var _currentStage = null;

	/**
	 * Canvas element
	 */
	this.getGl = function() {
		return _gl;
	};

	/**
	 * Main root game object
	 */
	this.rootObject = function() {
		return _rootObject;
	};

	this.getShaderProgram = function() {
		return _shaderProgram;
	};

	/**
	 * Add a new stage
	 */
	this.addStage = function(stage) {
		_stages.push(stage);

		// if the current stage is null, set it
		if (_currentStage == null) {
			_currentStage = stage;
		}
	};

	/**
	 * Get current stage
	 */
	this.getCurrentStage = function() {
		return _currentStage;
	};

	/**
	 * Set current stage
	 */
	this.setCurrentStage = function(stage) {
		_currentStage = stage;

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
		if (!_gl) {
			console.error("Could not initialise WebGL");
		} else {
			initShaders();
		}
	};

	/**
	 * Initialize the shaders
	 */
	function initShaders() {
		var fragmentShader = getShader(_gl, "shader-fs");
		var vertexShader = getShader(_gl, "shader-vs");

		_shaderProgram = _gl.createProgram();
		_gl.attachShader(_shaderProgram, vertexShader);
		_gl.attachShader(_shaderProgram, fragmentShader);
		_gl.linkProgram(_shaderProgram);

		if (!_gl.getProgramParameter(_shaderProgram, _gl.LINK_STATUS)) {
			console.error("Could not initialize shaders");
		}

		_gl.useProgram(_shaderProgram);

		_shaderProgram.vertexPositionAttribute = _gl.getAttribLocation(
				_shaderProgram, "aVertexPosition");

		_gl.enableVertexAttribArray(_shaderProgram.vertexPositionAttribute);

		_shaderProgram.pMatrixUniform = _gl.getUniformLocation(_shaderProgram,
				"uPMatrix");
		_shaderProgram.mvMatrixUniform = _gl.getUniformLocation(_shaderProgram,
				"uMVMatrix");
	}

	function getShader(gl, id) {
		var shaderScript = document.getElementById(id);
		if (!shaderScript) {
			console.error("shader cannot be found");
			return null;
		}

		var str = "";
		var k = shaderScript.firstChild;
		while (k) {
			if (k.nodeType == 3) {
				str += k.textContent;
			}
			k = k.nextSibling;
		}

		var shader;
		if (shaderScript.type == "x-shader/x-fragment") {
			shader = _gl.createShader(_gl.FRAGMENT_SHADER);
		} else if (shaderScript.type == "x-shader/x-vertex") {
			shader = _gl.createShader(_gl.VERTEX_SHADER);
		} else {
			console.log("shader script type is invalid");
			return null;
		}

		_gl.shaderSource(shader, str);
		_gl.compileShader(shader);

		if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
			console.error(_gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}

	/**
	 * Draw the scene all objects
	 */
	this.drawScene = function() {
		if (_currentStage == null) {
			console.debug("Please create any stages");
		} else {
			_currentStage.render();
		}
	};

	/**
	 * Clear the scene
	 */
	this.clearScene = function() {
		_gl.clearColor(0.0, 0.0, 0.0, 1.0);
		_gl.enable(_gl.DEPTH_TEST);
	};
});