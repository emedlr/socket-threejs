/* socket.io */
var socket = io.connect();

/* Set up scene */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

/* Create cube */
var geometry = new THREE.CubeGeometry(4,1.5,.2,10,10,10);
//var geometry = new THREE.CubeGeometry(1,1,1,40,40,40);
var material = new THREE.MeshBasicMaterial({color:0xD9F57E, wireframe:true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

socket.on('sendCoords', function(data){
	//console.log(data.data.alpha);
	$('#gyro').html(data.data.alpha);
	cube.rotation.z = (data.data.alpha * Math.PI)/180;
	cube.rotation.x = (data.data.beta * Math.PI)/180;
	cube.rotation.y = (data.data.gamma * Math.PI)/180;
});

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
}
render();

$(function(jQuery){
	var orientation = {alpha: 0, beta: 0, gamma: 0};
	window.ondevicemotion = function(event) {
		orientation.alpha = Math.round(event.alpha);
		orientation.beta = Math.round(event.beta);
		orientation.gamma = Math.round(event.gamma);
		socket.emit('deviceOrientation', {data:orientation});
	}
});
