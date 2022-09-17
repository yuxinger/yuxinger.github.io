"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		 -1.0, -1.0, 
		  -0.5,  1.0, 
		0.0, -1.0 ,
		0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0/* , 
		-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5 */
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program1 = initShaders( gl, "vertex-shader", "fragment-shader1" );
	gl.useProgram( program1 );

	// Load the data into the GPU
	var bufferId1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition1 = gl.getAttribLocation( program1, "vPosition" );
	gl.vertexAttribPointer( vPosition1, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition1 );

	render();
	
	
	//2
	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 6.0 );
	
	// Load shaders and initialize attribute buffers
	var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
	gl.useProgram( program2 );
	
	// Load the data into the GPU
	var bufferId2 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	
	// Associate external shader variables with data buffer
	var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
	gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition2 );
	
	render2();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0,9);
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}

function render2(){
	//gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 3,9);
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}