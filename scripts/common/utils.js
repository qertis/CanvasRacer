console.log = function(msg) {
	if(Crafty('DebugMsg').log) {
		Crafty('DebugMsg').log(msg);
	}
};

Crafty.device.deviceOrientation(function(data){
    console.log('data.tiltLR : '+Math.round(data.tiltLR)+', data.tiltFB : '+Math.round(data.tiltFB)+', data.dir : '+Math.round(data.dir)+', data.motUD : '+data.motUD+'');

	if(Crafty('Car').setTiltLR) {
		Crafty('Car').setTiltLR(data.tiltLR);
	}
});

Crafty.device.deviceMotion(function(data) {
	//console.log('orientation')
});