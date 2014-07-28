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
		name: 'Player One',
		points: 0
	}
});
