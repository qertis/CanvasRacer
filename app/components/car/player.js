(function (Crafty) {
	Crafty.c('PlayerCar', {

		init: function () {
			this
				.requires('Car, 2D, Canvas, playerCar, Sprite, Multiway, Keyboard, Tween')
				.requires('Collision')
				.attr({
					z: 9,
					crashed: false
				})
				.origin('top center')
				.collision(new Crafty.polygon([15, 30], [115, 30], [120, 275], [10, 275]))
				.multiway({x: 3, y: 3}, {
					LEFT_ARROW: -180,
					RIGHT_ARROW: 0
					//UP_ARROW: -90,
					//DOWN_ARROW: 90
				})
				.bind('TurnLeft', function () {
					if (this._movement.y <= 0) {
						this.tween({rotation: -10}, 200);
					} else if (this._movement.y > 0) {
						this.tween({rotation: 10}, 500);
					}
				})
				.bind('TurnRight', function () {
					if (this._movement.y <= 0) {
						this.tween({rotation: 10}, 200);
					} else if (this._movement.y > 0) {
						this.tween({rotation: -10}, 500);
					}
				})
				.bind('TurnStop', function () {
					this.tween({rotation: 0}, 200);
				})
				.bind('RenderScene', function () {
					/* Проверяем выход за сцену
					 * Не даем авто выйти за сцену меняя его направление на противоположное */
					switch (this.getOutScreenX()) {
						case -1:
							this.move('w', this._movement.x);
							break;
						case 1:
							this.move('w', this._movement.x);
							break;

						default:
							break;
					}
				})
				.bind('EnterFrame', function () {
					if (this.isDown('UP_ARROW')) {
						Crafty('Track').UpSpeed(0.01);
					}



					var playerCar = this;
					Crafty('playerTireLeft').attr({
						rotation: playerCar.rotation *2
					});
					Crafty('playerTireRight').attr({
						rotation: playerCar.rotation *2
					})



				})
				.bind('NewDirection', function () {
					if (this.crashed) return;

					/* Проверяем нажатие на клавиши
					 * В зависимости от нажатых клавиш включаем Tween */
					if (this.isDown('LEFT_ARROW')) {
						this.trigger('TurnLeft');
					} else if (this.isDown('RIGHT_ARROW')) {
						this.trigger('TurnRight');
					} else {
						this.trigger('TurnStop');
					}

				})
				//.onHit('EnemyCar', this.crash)
				.one('Crash', function () {
					console.log('crash')
					this.crashed = true;
					this.disableControl();
					Crafty('Points').stop();


					Crafty('Delay').delay(function () {

						console.log('fail')
						Crafty.enterScene('game-over');

						//if (Crafty.viewport._scale === 1) {
					}, 250);
				})
		}
	});

}(Crafty));