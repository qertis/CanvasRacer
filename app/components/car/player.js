(function (Crafty) {
	'use strict';

	Crafty.c('PlayerCar', {
		UPSPEED: 0.02,
		DOWNSPEED: -0.04,

		init: function () {
			this
				.requires('Car, 2D, Canvas, playerCar, Sprite, Tween, Multiway, Collision')
				.requires('Keyboard, Gamepad, DeviceOrientation')
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
					switch (e && e.button) {
						case 0:
							Crafty('Track').setSpeed(this.UPSPEED);
							break;
						case 1:
							Crafty('Track').setSpeed(this.DOWNSPEED);
							break;
					}
				})
				.bind('GamepadKeyOnceChange', function (e) {
					switch (e && e.button) {
						case 9:
							Crafty('Pause').togglePause();
							break;
					}
				})
				.bind('GamepadAxisChange', function (e) {
					var speed = 0.0;

					if (this.isKeyDown('LEFT_ARROW') || this.isKeyDown('RIGHT_ARROW')) {
						return;
					}

					if (e && e.axis === 0) {
						if (e.value < 0.15) {
							speed = e.value * this._speed.x;

							this.trigger('TurnDirection', speed * 4);
						} else if (e.value > 0.15) {
							speed = e.value * this._speed.x;
							this.trigger('TurnDirection', speed * 4);
						}

						this.move('w', -speed);
					}
				})
				.bind('DeviceAxisChange', function (data) {
					if (data) {
						if (data.tiltLR < 1 || data.tiltLR > 1) {
							if (data.tiltLR < -40) data.tiltLR = -40;
							if (data.tiltLR > 40) data.tiltLR = 40;

							// ограничение на поворот
							var moveW = Crafty.math.clamp(-data.tiltLR / 10, -this._speed.x, this._speed.x);
							this.move('w', moveW);

							var turnDirection = Crafty.math.clamp(data.tiltLR / 1.5, -10, 10);
							this.trigger('TurnDirection', turnDirection);
						}

						if (data.tiltFB < 0) {
							Crafty('Track').setSpeed(this.UPSPEED)
						} else if (data.tiltFB > 0) {
							Crafty('Track').setSpeed(this.DOWNSPEED)
						}
					}
				})
				.bind('TurnDirection', function (rotation, time) {
					if (this.crashed) return;

					if (this._movement.y <= 0) {
						this.tween({rotation: rotation}, time || 200);
					} else if (this._movement.y > 0) {
						this.tween({rotation: rotation}, time || 500);
					}
				})
				.bind('TurnStop', function () {
					if (this.crashed) return;

					this.tween({rotation: 0}, 200);
				})
				.bind('RenderScene', function () {
					/* Проверяем выход за сцену
					 * Не даем авто выйти за сцену меняя его направление на противоположное */
					switch (this.getOutScreenX()) {
						case -1:
							this.move('w', -this._speed.x - 1);
							break;
						case 1:
							this.move('w', this._speed.x + 1);
							break;
					}
				})
				.bind('EnterFrame', function () {
					var self = this;

					if (this.isKeyDown('UP_ARROW')) {
						Crafty('Track').setSpeed(this.UPSPEED);
					} else if (this.isKeyDown('DOWN_ARROW')) {
						Crafty('Track').setSpeed(this.DOWNSPEED);
					}

					Crafty('playerTireLeft').attr({
						rotation: self.rotation * 2.4
					});
					Crafty('playerTireRight').attr({
						rotation: self.rotation * 2.4
					});
				})
				.bind('NewDirection', function () {
					/* Проверяем нажатие на клавиши
					 * В зависимости от нажатых клавиш включаем Tween */
					if (this.isKeyDown('LEFT_ARROW')) {
						this.trigger('TurnDirection', -10);
					} else if (this.isKeyDown('RIGHT_ARROW')) {
						this.trigger('TurnDirection', 10);
					} else {
						this.trigger('TurnStop');
					}
				})
				.onHit('EnemyCar', this.crash)
				.one('Crash', function () {
					this.crashed = true;
					this.disableControl();

					Crafty.audio.play('crash');

					//проверяем что разбилась именно наша машина
					if (this.has('PlayerCar')) {
						Crafty('Points').stop();

						Crafty('Delay').get(0).delay(function () {
							Crafty.player.setPoints(Crafty('Points').getPoints());

							Crafty.enterScene('game-over');
						}, 250);
					}
				})
			;
		}
	});

}(Crafty));