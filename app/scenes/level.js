(function (Crafty) {
	'use strict';

	Crafty.defineScene('level', levelInit, levelOut);

	function levelInit() {
		Crafty.background('white');

		Crafty.audio.play("music", -1); //Play the audio file

		Crafty.e('Track');

		Crafty.e('Pause');

		Crafty.uniqueBind('Pause', function () {
			/* обнуляем направление при нажатии на кнопку паузы */
			Crafty('PlayerCar').each(function() {
				this.attr({
					_speed: {x: 0, y: 0},
					_movement: {x: 0, y: 0}
				});
			});
		});

		Crafty.uniqueBind('Unpause', function () {
			Crafty('PlayerCar').each(function() {
				this.setCurrentSpeed();
			});
		});

		Crafty.e('Points');

		Crafty.e('Delay');

		Crafty.e('2D, Canvas, Image')
			.image("content/images/speedometer/arrow.png", "no-repeat")
			.attr({
				x: Crafty.viewport.width / 2 - 52,
				y: 588,
				z: 99,
				rotation: 0
			})
			.origin(50, 6)
			.bind('EnterFrame', function () {
				var track = Crafty('Track').get(0);

				var trackCurrentSpeed = track.getSpeed();
				var trackMaxSpeed = track.getMaxSpeed();
				var maxSpeedInfo = track.getMaxSpeedInfo();

				this.rotation = trackCurrentSpeed / trackMaxSpeed * maxSpeedInfo;
			})
			/* debug */
			//.addComponent('SolidHitBox')
			//.debugFill("transparent")
		;

		Crafty
			.e('2D, Canvas, Image')
			.image("content/images/speedometer/speedometer.png", "no-repeat")
			.attr({
				x: Crafty.viewport.width / 2 - 150 / 2,
				y: Crafty.viewport.height - 120,
				z: 91,
				w: 150,
				h: 150,
				alpha: 0.9
			})
		;

		var playerCar = Crafty.e('PlayerCar').attr({
				x: 200,
				y: 300,
				z: 18
			})
		/* debug */
		//.addComponent('WiredHitBox')
		//.debugStroke("transparent")
			;

		var playerTireLeft = Crafty.e('2D, Canvas, playerTire, playerTireLeft')
				.attr({z: 1, x: 207, y: 358})
				.origin('middle right')
		/* debug */
		//.addComponent('SolidHitBox')
		//.debugFill("transparent")
			;
		playerCar.attach(playerTireLeft);

		var playerTireRight = Crafty.e('2D, Canvas, playerTire, playerTireRight')
				.attr({z: 1, x: 303, y: 358})
				.origin('middle left')
		/* debug */
		//.addComponent('SolidHitBox')
		//.debugFill("transparent")
			;
		playerCar.attach(playerTireRight);

		/* используйте такой формат, вместо setInterval*/
		Crafty("Delay").get(0).delay(function () {
			if (Crafty._current !== 'level') {
				return;
			}

			var range = 0;
			var trackRandomPositions = [];
			var trackPosition = null;
			var enemyCarsLenght = Crafty('EnemyCar').length;
			var trackSpeed = Crafty('Track').getSpeed();

			// ограничение количества машин на сцене
			if (enemyCarsLenght >= 4) {
				return;
			}

			// Чем больше скорость у персонажа - тем выше вероятность создания врага)
			range = Crafty.math.randomNumber(0, (Crafty.viewport.height * 2) - (trackSpeed * 3));

			if (Crafty.math.withinRange(range, 0, Crafty.viewport.height)) {
				trackRandomPositions = [
					Crafty.math.randomInt(0, 25),
					Crafty.math.randomInt(205, 230)
				];

				trackPosition = Crafty.math.randomElementOfArray(trackRandomPositions);

				Crafty.e('EnemyCar')
					.attr({
						x: trackPosition,
						y: -Crafty.math.randomInt(Crafty.viewport.height * 2.5, Crafty.viewport.height * 3)
					})
					/* debug */
					//.addComponent('SolidHitBox')
					//.addComponent('WiredHitBox')
					//.debugStroke('transparent')
				;
			}

			//Удаляем неиспользуемые ссылки.
			enemyCarsLenght = trackSpeed = range = trackRandomPositions = trackPosition = null;
		}, 1200, -1);

		var particles = Crafty
				.e("2D,Canvas,Particles")
				.particles({
					maxParticles: 25,
					size: 8,
					sizeRandom: 1,
					speed: 0.7,
					speedRandom: 0.2,
					lifeSpan: 18,
					lifeSpanRandom: 3,
					angle: 90,
					angleRandom: 0,
					startColour: [0, 0, 0, 0.4],
					endColour: [0, 0, 0, 0],
					sharpness: 20,
					sharpnessRandom: 10,
					spread: 3,
					duration: -1,
					fastMode: false,
					jitter: 0
				})
				.attr({
					x: 275,
					y: 578
				})
			;

		playerCar.attach(particles);
	}

	function levelOut() {
		Crafty('Delay').each(function () {
			this.destroy();
		});

		Crafty('Gamepad').each(function () {
			this.destroy();
		});

		Crafty.audio.remove();
	}

}(Crafty));