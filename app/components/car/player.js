(function (Crafty) {

	Crafty.c('PlayerCar', {

		UPSPEED: 0.02,
		DOWNSPEED: -0.04,

		init: function () {
			this
				.requires('Car, 2D, Canvas, playerCar, Sprite, Multiway, Keyboard, Tween, Gamepad')
				.requires('DeviceOrientation')
				.requires('Collision')
				.attr({
					z: 9,
					crashed: false
				})
				.origin('top center')
				.collision(new Crafty.polygon([15, 30], [115, 30], [120, 275], [10, 275]))
				.multiway({x: 3, y: 0}, {
					LEFT_ARROW: -180,
					RIGHT_ARROW: 0
				})
				.gamepad(0)
				.bind('GamepadKeyChange', function (e) {
					switch (e.button) {
						case 0:
							Crafty('Track').SetSpeed(this.UPSPEED);
							break;
						case 1:
							Crafty('Track').SetSpeed(this.DOWNSPEED);
							break;
					}
				})
				.bind('GamepadAxisChange', function (e) {
					var speed = 0.0;

					if (this.isKeyDown('LEFT_ARROW') || this.isKeyDown('RIGHT_ARROW')) {
						return;
					}

					if (e.axis === 0) {
						if (e.value < 0.15) {
							speed = e.value * this._speed.x;

							this.trigger('TurnLeft', speed * 4);
						} else if (e.value > 0.15) {
							speed = e.value * this._speed.x;
							this.trigger('TurnRight', speed * 4);
						}

						this.move('w', -speed);
					}
				})
				.bind('DeviceAxisChange', function (data) {

					if (data) {
						//ограничение на поворот в 50'
						if (Crafty.math.withinRange(data.tiltLR, -50, 50)) {
							this.move('w', data.tiltLR / 10);
							//this.trigger('TurnLeft', speed * 4);
						}

						if(Crafty.math.withinRange(data.tiltFB, - 30, 30)) {
							console.log(data.tiltFB / 10)


							Crafty('Track').SetSpeed(data.tiltFB / 10);

						}
					}
				})
				.bind('TurnLeft', function (rotation, time) {
					if (this._movement.y <= 0) {
						this.tween({rotation: rotation}, time || 200);
					} else if (this._movement.y > 0) {
						this.tween({rotation: rotation}, time || 500);
					}
				})
				.bind('TurnRight', function (rotation, time) {
					if (this._movement.y <= 0) {
						this.tween({rotation: rotation}, time || 200);
					} else if (this._movement.y > 0) {
						this.tween({rotation: rotation}, time || 500);
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
							this.move('w', -this._speed.x);
							break;
						case 1:
							this.move('w', this._speed.x);
							break;

						default:
							break;
					}
				})
				.bind('EnterFrame', function () {
					if (this.isKeyDown('UP_ARROW')) {
						Crafty('Track').SetSpeed(this.UPSPEED);
					} else if (this.isKeyDown('DOWN_ARROW')) {
						Crafty('Track').SetSpeed(this.DOWNSPEED);
					}

					var playerCar = this;
					Crafty('playerTireLeft').attr({
						rotation: playerCar.rotation * 2.4
					});
					Crafty('playerTireRight').attr({
						rotation: playerCar.rotation * 2.4
					});

				})
				.bind('NewDirection', function () {
					if (this.crashed) return;

					/* Проверяем нажатие на клавиши
					 * В зависимости от нажатых клавиш включаем Tween */
					if (this.isKeyDown('LEFT_ARROW')) {
						this.trigger('TurnLeft', -10);
					} else if (this.isKeyDown('RIGHT_ARROW')) {
						this.trigger('TurnRight', 10);
					} else {
						this.trigger('TurnStop');
					}

				})
				//.onHit('EnemyCar', this.crash)
				.one('Crash', function () {
					console.log('crash')
					this.crashed = true;
					this.disableControl();


					//проверяем что разбилась именно наша машина
					if (this.has('PlayerCar')) {


						Crafty('Points').stop();

						Crafty('Delay').get(0).delay(function () {

							//console.log('fail')

							Crafty.player.setPoints(Crafty('Points').getPoints());
							Crafty.player.setMyLocation();


							Crafty.enterScene('game-over');

						}, 250);


					}
				})
			;
		}
	});

}(Crafty));