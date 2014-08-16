(function() {

/*TODO added left and right cars*/
	Crafty.c('EnemyCar', {

		carType : ['car1', 'car2', 'car3', 'car4'],

		_kletka : 32,

		movingTop: false,

		init: function () {

			this.requires(Crafty.math.randomElementOfArray(this.carType))
				.requires('2D, Canvas, Sprite, Collision')
				.attr({
//					y: 0,
					movingTop : Crafty.math.randomInt(0, 1),
					w: 20,
					h: 40,
					rotation: 0,
					_speed: Crafty.math.randomInt(2,3)
				})
				.bind('SpeedUp', function() {
					this.y += this._speed;
				})
				.bind('SpeedDown', function() {
					this.y -= this._speed;
				})
				.bind('EnterFrame', function () {


					if(this.movingTop) {

						this.trigger('SpeedUp');

						if (this.y > Crafty.viewport.height) {
							this.destroy();
						}
					} else {
						this.trigger('SpeedDown');

					}

				});


			var randX = Crafty.math.randomInt(0, 300);

			this.x = randX % this._kletka + randX


			if(this.movingTop) {
				this.y = -Crafty.math.randomInt(0, 300)

				this.rotation = 180;
			} else {
				this.y = Crafty.math.randomInt(300, 500)
			}



			this.onHit('EnemyCar', function() {
				console.log('blya')

				this.unbind('SpeedUp')
				this.destroy();


			})
		}
	});

}());

