(function (Crafty) {

	function levelInit() {

		Crafty.background('rgb(127,127,127)');

		Crafty.e('PlayerCar').attr({
			x: 200,
			y: 300
		})
			.addComponent('WiredHitBox')
			.debugStroke("white")

		Crafty.e('Track')

		Crafty.c('Pause', {
			init: function () {
				this.requires('2D, Canvas, pause')
				this.attr({
					z: 999
				})
			}
		});

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
		/*

		 var firstScale = 10;
		 .delay(function () {
		 firstScale -= 1;
		 Crafty.viewport.scale(firstScale);

		 if (Crafty.viewport._scale === 1) {
		 this.destroy();
		 }

		 }, 50, -1);

		 //        ;


		 console.log('ffff');
		 */
	}

	function levelOut() {
		console.log('level out')
	}


	Crafty.defineScene('level', levelInit, levelOut);

}(Crafty));