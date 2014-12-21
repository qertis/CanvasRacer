window.addEventListener('load', function () {


	// TODO PRODUCTION ONLY
	// window.onblur = Crafty.gameBlur;
	// window.onfocus = Crafty.gameFocus;


	document.onkeypress = function (e) {
		// Ctrl-R
		if (e.keyCode == 114) {
			//Crafty.enterScene('main');

			console.log('xx')
			e.preventDefault();
		}
	};

}, false);