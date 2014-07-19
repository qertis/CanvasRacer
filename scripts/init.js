Crafty.init(300, 600, 'container');

Crafty.enterScene("loading");

Crafty.extend({
	gameBlur: function () {
		document.title = 'GAME Paused';

		if (!Crafty.isPaused()) {
			Crafty.pause();
		}
	},
	gameFocus: function () {
		document.title = 'GAME READY';

		if (Crafty.isPaused()) {
			Crafty.pause();
		}
	},
	player: {
		name: 'Player One'
	}
});

//TODO PRODUCTION ONLY
// window.onblur = Crafty.gameBlur;
// window.onfocus = Crafty.gameFocus;

Crafty.bind('SceneChange', function () {
	Crafty('DebugMsg').destroy();
	Crafty.e('DebugMsg');
});


Crafty.load(["track.png"],
	function () {
		//when loaded
		Crafty.enterScene('menu');
	},
	function (e) {
		//progress
	},
	function (e) {
		//uh oh, error loading
	}
);

/*
 Crafty.e("2D, Canvas, Tint")
 .tint("#969696", 0.3);
 */