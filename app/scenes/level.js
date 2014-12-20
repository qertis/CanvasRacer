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


		var playerTireLeft = Crafty.e('2D, Canvas, playerTire, playerTireLeft')
			.attr({z: 1, x: 205, y: 358})
			.origin('center');
		playerCar.attach(playerTireLeft)

		var playerTireRight = Crafty.e('2D, Canvas, playerTire, playerTireRight')
			.attr({z: 1, x: 305, y: 358})
			.origin('center')
		playerCar.attach(playerTireRight)



		/* используйте такой формат, вместо setInterval*/
		Crafty.e("Delay").delay(function() {
			//console.log("100ms later" + x);

			Crafty.e('EnemyCar')
				.addComponent('WiredHitBox')
				.debugStroke('white')
		}, 2500, -1, function() {
			console.log("delay finished");
		});
	}

	function levelOut() {
		console.log('level out')
	}

}(Crafty));