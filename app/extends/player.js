(function (Crafty) {
	'use strict';

	Crafty.extend({

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

			setLocation: function(location) {
				this._location = location;
			},

			getLocation: function () {
				return this._location;
			},

			getMyLocation: function (callback) {
				navigator.geolocation.getCurrentPosition(function (pos) {
					try {
						callback({error: false, location: new Parse.GeoPoint(pos.coords)});
					} catch (e) {
						callback({error: e});
					}
				}, function (err) {
					callback({error: err})
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