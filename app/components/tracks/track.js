(function (Crafty) {

	Crafty.c('Track', {
		_speed: 4.0,
		_maxSpeed: 10.0,
		_distance: 0.0,

		GetDistance: function() {
			return Math.round(this._distance);
		},
		UpSpeed: function (value) {
			if (this._speed < this._maxSpeed) {
				this._speed += value;
			}
		},
		DownSpeed: function (value) {
			if(this._speed > 0) {
				this._speed -= value;
			}
		},
		GetSpeed: function () {
			return this._speed;
		},
		GetMaxSpeed: function () {
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
					this._distance += this.GetSpeed();
					this.y += this.GetSpeed();

					if (this.y > 0)
						this.y = defaultY;
				})
			;
		}
	});

}(Crafty));