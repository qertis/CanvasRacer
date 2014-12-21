(function (Crafty) {
	Crafty.defineScene('level', levelInit, levelOut);

	function levelInit() {

		Crafty.background('rgb(127,127,127)');

		var playerCar = Crafty.e('PlayerCar').attr({
			x: 200,
			y: 300
		})
			.addComponent('WiredHitBox')
			.debugStroke("white")

		Crafty.e('Track');

		Crafty.e('Pause');

		Crafty.e('FullScreen');

		Crafty.e('EnemyCar')
			/* Debug */
			.addComponent('WiredHitBox')
			.debugStroke('white')
			.attr({
				x: 0,
				y: 200
			});

		Crafty.e('Points');
		Crafty.e('Delay');


		var playerTireLeft = Crafty.e('2D, Canvas, playerTire, playerTireLeft, SolidHitBox')
				.attr({z: 1, x: 207, y: 358})
				.origin('middle right')
				.debugFill("transparent")
			;

		playerCar.attach(playerTireLeft)

		var playerTireRight = Crafty.e('2D, Canvas, playerTire, playerTireRight, SolidHitBox')
			.attr({z: 1, x: 303, y: 358})
			.origin('middle left')
			.debugFill("transparent")
		playerCar.attach(playerTireRight)


		/* используйте такой формат, вместо setInterval*/
		Crafty("Delay").get(0).delay(function () {
			//console.log("100ms later" + x);

			Crafty.e('EnemyCar')
				.addComponent('WiredHitBox')
				.debugStroke('white')
		}, 2500, -1, function () {
			console.log("delay finished");
		});


		Crafty.e('2D, Canvas, Image, SolidHitBox')
			.image("content/images/speedometer/arrow.png", "no-repeat")
			.attr({
				x: Crafty.viewport.width / 2 - 52,
				y: 588,
				z: 99,
				rotation: 0,
				maxSpeedInfo: 240
			})
			.origin(50, 6)
			.bind('EnterFrame', function () {
				var track = Crafty('Track').get(0);

				var trackCurrentSpeed = track.GetSpeed();
				var trackMaxSpeed = track.GetMaxSpeed();

				this.rotation = trackCurrentSpeed / trackMaxSpeed * this.maxSpeedInfo;
			})
		//.debugFill("transparent")

		Crafty.e('2D, Canvas, Image')
			.image("content/images/speedometer/speedometer.png", "no-repeat")
			.attr({
				x: Crafty.viewport.width / 2 - 150 / 2,
				y: Crafty.viewport.height - 120,
				z: 98,
				w: 150,
				h: 150
			})
	}

	function levelOut() {
		console.log('level out')

		Crafty('Delay').each(function () {
			this.destroy();
		})

	}

}(Crafty));