Crafty.c('TrafficLight', {
	//или слева или справа
	setRandomPos: function () {

		var randomInt = Crafty.math.randomInt(0, 1);

		if (randomInt === 0) {//left
			this.x = 20;
		} else {//right
			this.x = 300;
		}

	},
	init: function () {
		this
			.requires('2D, Canvas, Collision, trafficlight, Sprite, LevelSpeed')
			.collision(new Crafty.polygon([0, 0], [15, 0], [15, 100], [0, 100]))
			.attr({
				x: 0,
				y: 0,
				z: 999,
				w: 15,
				h: 100
			})
			.onHit('Car', function (car, noHit) {

//проверка на то что мы ударились с player Car
				car.forEach(function (e) {
					if (e.obj.has('PlayerCar')) {
						e.obj.trigger('Crash');
					}
					if (e.obj.has('EnemyCar')) {
						console.log('crash with enemy car')
					}
				});

			})
			.bind('EnterFrame', function () {
				this.y += this.speed;

				if (this.y > Crafty.viewport.height) {
					this.destroy();
				}
			})

		;


	}
});
