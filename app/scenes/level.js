(function (Crafty) {
	Crafty.defineScene('level', levelInit, levelOut);

	function levelInit() {

		Crafty.background('rgb(127,127,127)');

		Crafty.e('PlayerCar').attr({
			x: 200,
			y: 300
		})
			.addComponent('WiredHitBox')
			.debugStroke("white")

		Crafty.e('Track')

		Crafty.e('Pause');

		Crafty.e('EnemyCar')
			/* Debug */
			.addComponent('WiredHitBox')
			.debugStroke('white')
			.attr({
				x: 0,
				y: 200
			});

		Crafty.e("Points");
		Crafty.e("Delay");

	}

	function levelOut() {
		console.log('level out')
	}

}(Crafty));