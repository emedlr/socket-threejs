var socket = io.connect();


socket.on('sendCoords', function(data){
	//console.log(data.data.alpha);
	$('#gyro').html(data.data.alpha);
	$('#gyro').css({WebkitTransform: 'rotate(' + data.data.beta + 'deg)'});
});

var scene = new THREE.Scene();
var canvas = document.getElementById("canvas");


var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(146,146);
canvas.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 50, 0.6, 0.04, 100 );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xf2ac45f , wireframe:true} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	cube.rotation.x += 0.03;
	cube.rotation.y += 0.0005;


	renderer.render(scene, camera);
};

render();

$(function(){
    /* Track device orientation */
    var orientation = {alpha: 0, beta: 0, gamma: 0};
    window.ondeviceorientation = function(event) {
		orientation.alpha = Math.round(event.alpha);
		orientation.beta = Math.round(event.beta);
		orientation.gamma = Math.round(event.gamma);
		socket.emit('deviceOrientation', {data:orientation});
	}


});
