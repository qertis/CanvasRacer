(function (Crafty) {
	'use strict';

	Crafty.extend({

		//TODO: ...
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
			_name: 'Player Name',
			_points: 0,
			_location: null,

			getName: function () {
				return this._name;
			},

			getPoints: function () {
				return this._points;
			},

			getLocation: function () {
				return this._location;
			},

			setMyLocation: function () {
				navigator.geolocation.getCurrentPosition(function (pos) {
					try {
						Crafty.player._location = new Parse.GeoPoint(pos.coords);
					} catch (e) {
						console.error('location getting error')
					}
				}, function (err) {
					console.error('cannot get current position' + err)
				});
			},

			setPoints: function (pts) {
				Crafty.player._points = pts;
			},

			setUserName: function (name) {
				Crafty.player._name = name;
			}
		}
	});

}(Crafty));