(function () {
	/**
	 * Override alert
	 * */
	if ('alert' in window) {
		window.alert = function (msg) {
			console.log(msg);

			if (Crafty('DebugMsg').log) {
				Crafty('DebugMsg').log(msg);
			}
		}
	}

}());

/**
 * support module
 */
(function () {
	if (Crafty.support.canvas) {

	}
	if (Crafty.support.audio) {

	}
	if (Crafty.support.deviceorientation) {
		Crafty.device.deviceOrientation(function (data) {
			alert('data.tiltLR : ' + Math.round(data.tiltLR) +
				', data.tiltFB : ' + Math.round(data.tiltFB) +
				', data.dir : ' + Math.round(data.dir) +
				', data.motUD : ' + data.motUD + '');

			if (Crafty('Car').setDirectionW) {
				Crafty('Car').setDirectionW(data.dir);
			}

			if (Crafty('Car').setDirectionS) {
				Crafty('Car').setDirectionS(data.tiltFB);
			}
		});
	}

	if (Crafty.support.devicemotion) {
		/*
		 Crafty.device.deviceMotion(function(data) {
		 //alert('orientation')
		 });*/
	}
}());
