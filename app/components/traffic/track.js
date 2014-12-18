Crafty.c('Track', {

	_speed: 4.0,
	_maxSpeed: 10.0,
	init: function() {},
	UpSpeed:function(value) {
		//this.GetSpeed()
		if(this._speed < this._maxSpeed) {
			this._speed += value;
		}
	},
	DownSpeed: function(value) {
		this._speed -= value;
	},
	GetSpeed: function() {
		return this._speed;
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
				this.y += this.GetSpeed();

				if (this.y > 0)
					this.y = defaultY;
			})
		;
	}
});