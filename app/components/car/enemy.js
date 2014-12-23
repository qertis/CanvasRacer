(function (Crafty) {
	'use strict';

	var carType = [
		{
			type: 'car1',
			collision: function () {
				return [[15, 30], [115, 30], [120, 285], [10, 285]]
			},
			horn: 'horn1'
		},
		{
			type: 'car2',
			collision: function () {
				return [[15, 30], [115, 30], [120, 260], [60, 280], [10, 260]]
			},
			horn: 'horn2'
		},
		{
			type: 'car3',
			collision: function () {
				return [[10, 10], [115, 10], [120, 275], [10, 275]]
			},
			horn: 'horn3'
		},
		{
			type: 'car4',
			collision: function () {
				return [[15, 30], [115, 30], [120, 280], [10, 280]]
			},
			horn: 'horn3'
		}
	];

	Crafty.c('EnemyCar', {
		init: function () {
			if (Crafty._current !== 'level') return;

			var getRandomPos = Crafty.math.randomInt(0, 1);
			var currentCar = Crafty.math.randomElementOfArray(carType);

			this.requires('Car')
				.requires(currentCar.type)
				.collision(new Crafty.polygon(currentCar.collision()))
				.attr({
					_speed: Crafty.math.randomNumber(1, 1.2)
				})
				.bind('RenderScene', function () {
					var playerCar = Crafty('PlayerCar').get(0);
					var distance = Crafty.math.distance(this.x, this.y, playerCar.x, playerCar.y);

					//добавляем неного случайности величину
					if (Crafty.math.randomInt(0, 9) === 5) {
						if (Crafty.math.withinRange(distance, 400, 500)) {

							if (!Crafty.audio.isPlaying(currentCar.horn)) {
								Crafty.audio.play(currentCar.horn, 1, 0.7);
							}
						}
					}

					// уничтожаем объект при выходе за сцену
					if (this.y > Crafty.viewport.height) {
						this.destroy();
					}
				})
				.one('Crash', function () {
					//после аварии - авто идут вниз
					this.unbind('SpeedUp');
					this.unbind('SpeedDown');

					var self = this;
					Crafty('Delay').get(0).delay(function () {
						self.destroy();

					}, 3000, 1);
				})
				.onHit('EnemyCar', this.crash)
				.onHit('PlayerCar', function (obj) {
					if (!this.destroyer) {
						this.unbind('SpeedUp');
						this.unbind('SpeedDown');

						this.tween({ rotation: Crafty.math.randomNumber(- 20, 20) }, 1000);

						this.destroyer = true;
					}
				})
				.bind('SpeedUp', this.speedUp)
				.bind('SpeedDown', this.speedDown)
				.bind('EnterFrame', function () {
					this.trigger('SpeedUp');
				})
			;
		},

		speedUp: function () {
			this.y += this._speed + Crafty('Track').getSpeed();
		},

		speedDown: function () {
			this.y -= this._speed + Crafty('Track').getSpeed();
		}

	});

}(Crafty));