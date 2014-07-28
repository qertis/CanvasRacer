(function () {

	window.onload = onload;

	function productionLoad() {
		var script = document.createElement('script');
		script.src = '';//FIXME
		script.async = false;
		document.head.appendChild(script);
	}

	function debugLoad() {
		[
			'scripts/crafty/crafty.js',
			'scripts/extends/player.js',
			'scripts/components/fonts.js',
			'scripts/components/car.js',
			'scripts/components/enemycars.js',
			'scripts/components/track.js',
			'scripts/components/keyboard.js',
			'scripts/components/points.js',
			'scripts/components/debug.js',
			'scripts/scenes/loading.js',
			'scripts/scenes/menu.js',
			'scripts/scenes/level.js',
			'scripts/scenes/game-over.js',
			'scripts/common/utils.js'
		].forEach(function (src) {
				var script = document.createElement('script');
				script.src = src;
				script.async = false;
				script.defer = true;
				script.type = 'text/javascript';
				document.body.appendChild(script);
			});
	}

	loadConfig();

	function loadConfig() {
		var req = new XMLHttpRequest;
		req.overrideMimeType("application/json");
		req.open('GET', encodeURIComponent("/config.json"), true);
		req.onload = function () {

			if (req.readyState === 4 && req.status == 200) {
				var respJson = JSON.parse(req.responseText);
				console.log(respJson);

				if (respJson.production) {
					productionLoad();
				} else {
					debugLoad();

				}

				craftyInit();
			}

		};
		req.send(null);
	}

	function craftyInit() {

		var _this = setInterval(function () {
			if (window.Crafty) {
				iii();
				clearInterval(_this);
			}
		}, 5);

		function iii() {

			Crafty.init(300, 600, 'container');
			Crafty.enterScene("loading");

			//TEST for loading scene
			setTimeout(function () {

				Crafty.enterScene('menu');

			}, 100);

			Crafty.bind('SceneChange', function () {
				Crafty('DebugMsg').destroy();
				Crafty.e('DebugMsg');
			});

		}

	}


	// TODO PRODUCTION ONLY
	// window.onblur = Crafty.gameBlur;
	// window.onfocus = Crafty.gameFocus;

}());