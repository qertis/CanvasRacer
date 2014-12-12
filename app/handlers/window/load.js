window.addEventListener('load', function () { // on page load

	// TODO PRODUCTION ONLY
	// window.onblur = Crafty.gameBlur;
	// window.onfocus = Crafty.gameFocus;



	document.onkeypress = function (e) {
		// Ctrl-R
		if (e.keyCode == 114) {
			//Crafty.enterScene('level');
			e.preventDefault();
		}
	};

	//testInit();

}, false);



/*
 window.video = Crafty.e('Video').attr({
 poster: 'http://demosthenes.info/assets/images/polina.jpg',
 videos: {
 webm: 'http://demosthenes.info/assets/videos/polina.webm',
 mp4: 'http://demosthenes.info/assets/videos/polina.mp4'
 },
 once: true
 }).createVideo();*/



