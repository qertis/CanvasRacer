Crafty.c('EnemyCar', {

	//замедляем скорость бота, чтобы он не врезался в чужую машину
	compareWithOtherEnemyCar: function () {


		//логика работы
		//проверяем все машины движующиеся в одну сторону,
		//если их расстояние между собой очень маленькое - замедляем скорость той, что стоит сзади
		Crafty('EnemyCar').each(function () {

			var movingBottom = this.movingBottom;
			var prevCar = this;


			Crafty('EnemyCar').each(function () {

				//проверка на одно направление
				if (movingBottom != this.movingBottom && this.xxx) return;

				if (prevCar != this) {
					var distance = Crafty.math.distance(prevCar.x, prevCar.y, this.x, this.y);

					if (distance < 100) {
//                            debugger;
						//console.warn(distance)

						if (this.movingBottom) {
//                                this.speed += 0.2;
						} else {
//                                this.speed -= 0.2;
						}
						//  prevCar.xxx = true;
					}
				}
			});

			delete prevCar.xxx;

		});

	},
	init: function () {
		if (Crafty._current !== 'level') return;

		var carType = ['car1', 'car2', 'car3', 'car4'],
			movingBottom = Crafty.math.randomInt(0, 1);

		this
			.requires('Car, 2D, Canvas, Sprite, Collision')
			.requires(Crafty.math.randomElementOfArray(carType))
			.attr({
				w: 64,
				h: 141,
				movingBottom: movingBottom
			})
			.collision(new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140]))
			.one('SetAttrs', function () {
				if (this.movingBottom) {
					this.x = Crafty.math.randomInt(110, 140);
					this.y = -Crafty.math.randomInt(this.h, Crafty.viewport.height);
					this.rotation = 180;
					this.speed = Crafty.math.randomNumber(6, 8);
				} else {
					this.x = Crafty.math.randomInt(180, 210);
					this.y = -Crafty.math.randomInt(Crafty.viewport.height, Crafty.viewport.height + this.h);
					this.rotation = 0;
					this.speed = -Crafty.math.randomNumber(1, 3);
				}
			})
			.one('Crash', function () {
				//после аварии - авто идут вниз
				this.unbind('SpeedUp');
				this.unbind('SpeedDown');

//                    this.movingBottom = true;
				console.log('CRASH!');

//                    this.trigger('CrashMove', 0.0);
//                    this.alpha = .5;
			})
			.onHit('EnemyCar', this.crash)
			.bind('CrashMove', function (amount) {
//FIXME!!! плавное уезжаание за экран в случае аварии
//                    console.log('crash!')

				if (amount > 1) {
					this.destroy();
				}
				this.rotation = Crafty.math.lerp(this.rotation, Crafty.math.randomNumber(-90, 90), amount);

				this.y += 1;

				this.trigger('CrashMove', amount + 0.01)
			})
			.bind('SpeedUp', this.speedUp)
			.bind('SpeedDown', this.speedDown)
			.bind('EnterFrame', function () {
				if (movingBottom)
					this.trigger('SpeedUp');
				else
					this.trigger('SpeedDown');

				this.compareWithOtherEnemyCar();
				this.compareScreen();
			})
			.trigger('SetAttrs')
		;
	}
});
