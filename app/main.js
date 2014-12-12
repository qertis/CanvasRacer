(function (Crafty, $) {

	$(initGame);

	//-----------------------------------------------------------------------------------------

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
				/* debug */
				'app/components/debug/debug.js',
				/* fonts */
				'app/components/fonts/default.js',
				'app/components/fonts/bold.js',
				'app/components/fonts/i' +
				'talic.js',
				/* points */
				'app/components/points/points.js',
				/* video */
				'app/components/video/video.js'
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
				'app/scenes/level.js',
				'app/scenes/loading.js',
				'app/scenes/menu.js'
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
				loadAssets()
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
		Crafty.viewport.mouselook(true);

		Crafty.background('#000000');

		var loadingText = Crafty.e('Text, ItalicFont')
			.attr({x: 0, y: 300})
			.text('Loading...')
			.textFont({ size: '20px' })
			.textColor('#FFFFFF');

		Crafty.viewport.centerOn(loadingText, 0);


		/*TEST
		 Crafty.bind('SceneChange', function () {
		 Crafty('DebugMsg').destroy();
		 Crafty.e('DebugMsg');
		 });
		 /*TESTEND*/
	}

	function loadAssets() {

		Crafty.paths({
			images: "content/images/",
			audio: "content/audio/"
		});


		var assetsObj = {
			"audio": {
				"game_over": ["game_over.wav", "game_over.mp3", "game_over.ogg"],
				"music": "music.ogg",
				"power_up": "power_up.mp3",
				"upgrade": "upgrade.wav"
			},
			"images": ["game_over.png", "menu.jpg"],
			"sprites": {
				"controls/buttons.png": {
					"tile": 50,
					"tileh": 40,
					"map": {"ladybug": [0, 0], "lazycat": [0, 1], "ferociousdog": [0, 2]},
					"paddingX": 5,
					"paddingY": 5,
					"paddingAroundBorder": 10
				},
				"vehicles.png": {
					"tile": 130,
					"tileh": 300,
					"map": {
						playerCar: [0, 0], car1: [1, 0], car2: [2, 0], car3: [3, 0], car4: [4, 0]
					}
				},
				"asphalt.png": {
					tile: 100,
					tileh: 100,
					map: {
						asphalt: [0,0]
					}
				},
				"trafficlights_shlp.png": {
					"tile": 130,
					"tileh": 300,
					"map": {
						trafficlights_shlp: [0, 0]
					}
				}
				/*
				Crafty.sprite("images/textures/asphalt_texture.png", {
					asphalt: [0, 0, 100, 100]
				});*/
			},
		};

// preload assets
		Crafty.load(assetsObj,
			function () {
				console.log('loaded');

				Crafty.scene('loading')
			},
			function (e) { //progress
				console.log(e);
				//Crafty('Loading').text('progress: ' + e.percent)
			},
			function (e) { //uh oh, error loading
			}
		);

	}


}(Crafty, jQuery));