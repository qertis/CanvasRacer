(function (Crafty, $) {

	$(initGame);

	function initGame() {
		$.when()
			.then(loadScripts([
				/* cars */
				'app/components/car/car.js',
				'app/components/car/player.js',
				'app/components/car/enemy.js',
				/* controls */
				'app/components/controls/keyboard.js',
				'app/components/controls/gamepad.js',
				'app/components/controls/touch.js',
				/* debug */
				'app/components/debug/debug.js',
				/* fonts */
				'app/components/fonts/default.js',
				'app/components/fonts/bold.js',
				'app/components/fonts/italic.js',
				/* trafic objects */
				'app/components/tracks/track.js',
				/* points */
				'app/components/points/points.js',
				/* video */
				'app/components/video/video.js',
				/* buttons */
				'app/components/buttons/pause.js'
			]))
			.done(function () {
				console.log('components loaded');
				//console.log(JSON.stringify(arguments, null, 2));
			})
			.then(loadScripts([
				'app/extends/geo.js',
				'app/extends/player.js'
			]))
			.done(function () {
				console.log('extends loaded');
			})
			.then(loadScripts([
				'app/handlers/window/load.js'
			]))
			.then(loadScripts([
				'app/scenes/game_over.js',
				'app/scenes/loading.js',
				'app/scenes/menu.js',
				'app/scenes/level.js'
			]))
			.then(loadScripts([
				'app/utils/utils.js'
			]))
			.then(function () {
				return $.getJSON('bower.json', function (configData) {
					Crafty.extend({configData: configData})
				});
			})
			.then(function () {
				runGame();
			})
			.done(function () {
				Crafty.enterScene('loading')
			});
	}

	function loadScripts(scripts) {
		scripts.forEach(function (item, i) {
			$.getScript(item);
		});

		return $.when.apply($, scripts);
	}

	function runGame() {
		console.log('game init');

		Crafty.init(360, 640, 'canvasRacer');
		Crafty.canvas.init();
		Crafty.pixelart(true);
		//Crafty.viewport.mouselook(true);

		Crafty.background('#000000');
		Crafty.e('Text, ItalicFont')
			.attr({x: 0, y: 300})
			.text('Loading Scenes...')
			.textFont({size: '20px'})
			.textColor('#FFFFFF');
	}

}(Crafty, jQuery));