(function (Crafty) {
	'use strict';

	Crafty.c('Track', {
		_speed: 4.0,
		_minSpeed: 2.0,
		_maxSpeed: 10.0,
		_distance: 0.0,
		maxSpeedInfo: 240,

		getDistance: function () {
			return Math.round(this._distance);
		},

		getMaxSpeedInfo: function() {
			return this.maxSpeedInfo;
		},

		setSpeed: function (value) {
			if (value < 0) {
				if (this._speed > this._minSpeed) {
					this._speed += value;
				}
			} else if (value > 0) {
				if (this._speed < this._maxSpeed) {
					this._speed += value;
				}
			}
		},

		getSpeed: function () {
			return this._speed;
		},

		getMaxSpeed: function () {
			return this._maxSpeed;
		},

		init: function () {
			var defaultY = -360;

			this
				.requires('2D, Canvas, Image')
				.attr({
					z: 0,
					y: defaultY,
					w: Crafty.viewport.width,
					h: defaultY * (-3)
				})
				.image("content/images/road_texture.jpg", "repeat-y")
				.bind('EnterFrame', function () {
					this._distance += this.getSpeed() / 60;

					this.y += this.getSpeed();

					if (this.y > 0)
						this.y = defaultY;
				})
			;
		}
	});

}(Crafty));