function parserPerspective(matrix, text){
	mat4.identity(matrix);
	var pattern = /[+-]?\d+([.]\d*)?/g;
	var k = text.match(pattern);
	if(k.length != 4){
		console.error("Perspective value is invalid. It has 4 arguments (degree, ratio, near value, far value)");
	}
	return k;
}

function parserView(matrix, text){
	if(new RegExp("perspective").test(text)){
		var k = parserPerspective(text);
		mat4.perspective(matrix, k[0], k[1], k[2], k[3], matrix);
	}
}