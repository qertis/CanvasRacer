(function () {


	window.addEventListener('load', function () { // on page load
		console.log(document.readyState)
	});


	document.addEventListener('DOMContentLoaded', function () {
		//последовательность: getCraftyModules-> getGameConfig-> gameInit
//		getCraftyModules();
//		getGameConfig();
//		gameInit();


		console.log(document.readyState)

		testInit();
	}, false);

	function testInit() {

		getCraftyModules();
	}


	function getCraftyModules() {
		var pageHref = location.href;
		pageHref = pageHref.replace(/\/\w+.(htm?|html)$/gi, '');

		// Loading from alternative repository
		Crafty.modules(pageHref, {
			'scripts/components/car': 'DEV',
			'scripts/extends/player': 'DEV',
			'scripts/components/fonts': 'DEV',
			'scripts/components/enemycars': 'DEV',
			'scripts/components/keyboard': 'DEV',
			'scripts/components/points': 'DEV',
			'scripts/components/debug': 'DEV',
			'scripts/scenes/loading': 'DEV',
			'scripts/scenes/menu': 'DEV',
			'scripts/scenes/level': 'DEV',
			'scripts/scenes/game-over': 'DEV',
			'scripts/common/utils': 'DEV'

		}, function () {
			console.log('module is ready');

			getGameConfig();
		});
	}


	function getGameConfig() {

		var req = new XMLHttpRequest();
		req.overrideMimeType("application/json");
		req.open('GET', encodeURIComponent("/config.json"), true);
		req.onload = function () {

			if (req.readyState === 4 && req.status == 200) {
				var respJson = JSON.parse(req.responseText);
				console.log(respJson);


				gameInit();


				if (respJson.production) {
//					productionLoad();
				} else {

				}

			}
		};
		req.onerror = function (err) {
			console.log('error', err);
		};
		req.send(null);
	}


//	window.onload = ;

	function gameInit() {

		Crafty.init(300, 600, 'container');
		Crafty.enterScene("loading");

//			Crafty.stage.inner.webkitRequestFullScreen()

		Crafty.bind('SceneChange', function () {
			Crafty('DebugMsg').destroy();
			Crafty.e('DebugMsg');
		});

	}


	// once {boolean} не обязателен.  Если false|undefined - видео проигрывается всегда.
	Crafty.c('Video', {
		poster: '',
		videos: {},
		once: false,
		videoElem: null,

		init: function () {
			Crafty('FullVideo').each(function () {
				this.destroyVideo();
			});
		},

		destroyVideo: function () {
			if (this.videoElem) {
				this.videoElem.remove();
				this.destroy();
			}
		},

		createVideo: function () {
			var self = this;

			function appendChild() {
				for (var source in self.videos) {
					var srcElem = document.createElement('source');
					srcElem.src = self.videos[source];

					srcElem.type = 'video/' + source;
					self.videoElem.appendChild(srcElem);
				}
			}

			function setAttr() {
				if (self.once === true) {

				} else {
					self.videoElem.loop = true;
				}

				self.videoElem.autoplay = true;

				if (!!self.poster) {
					self.videoElem.poster = self.poster;
				}
			}

			function setInnerScreenStyle() {
//TODO: дописать возможность установки внутреннего видео внутри игрового контейнера
			}

			function setFullScreenStyle() {
				self.videoElem.style.position = 'fixed';
				self.videoElem.style.right = 0;
				self.videoElem.style.bottom = 0;
				self.videoElem.style.minWidth = '100%';
				self.videoElem.style.minHeight = '100%';
				self.videoElem.style.width = 'auto';
				self.videoElem.style.height = 'auto';
				self.videoElem.style.zIndex = '-100';
				self.videoElem.style.backgroundSize = 'cover';

				if (!!self.poster) {
					self.videoElem.style.background = 'url(' + self.poster + ') no-repeat';
				}
			}

			function setEvents() {
				self.videoElem.addEventListener('loadedmetadata', function () {
				}, false);

				self.videoElem.addEventListener('ended', function () {
					if (self.once === true) {
						self.destroyVideo();
					}
				}, false);
			}

			self.videoElem = document.createElement('video');

			appendChild();
			setAttr();
			setFullScreenStyle();
			setEvents();

			document.body.appendChild(self.videoElem)
		}


	});


	/*
	window.video = Crafty.e('Video').attr({
		poster: 'http://demosthenes.info/assets/images/polina.jpg',
		videos: {
			webm: 'http://demosthenes.info/assets/videos/polina.webm',
			mp4: 'http://demosthenes.info/assets/videos/polina.mp4'
		},
		once: true
	}).createVideo();*/

	// TODO PRODUCTION ONLY
	// window.onblur = Crafty.gameBlur;
	// window.onfocus = Crafty.gameFocus;

}());