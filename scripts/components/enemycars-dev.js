(function() {

/*TODO added left and right cars*/
	Crafty.c('EnemyCar', {

		_kletka : 32,

		init: function () {
			this.requires('2D, Canvas, Color, Collision')
				.color('rgb(255,0,0)')
				.attr({
//					y: 0,
					w: 20,
					h: 40,
					_speed: Crafty.math.randomInt(2,3)
				})
				.bind('SpeedUp', function() {
					this.y += this._speed;
				})
				.bind('EnterFrame', function () {

					this.trigger('SpeedUp');

					if (this.y > Crafty.viewport.height) {
						this.destroy();
					}
				});

			var randX = Crafty.math.randomInt(0, 300);

			this.x = randX % this._kletka + randX
			this.y = -Crafty.math.randomInt(0, 300)



			this.onHit('EnemyCar', function() {
				console.log('blya')

				this.unbind('SpeedUp')
				this.destroy();


			})
		}
	});

}());

