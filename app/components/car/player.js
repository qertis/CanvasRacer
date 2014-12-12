
Crafty.c('PlayerCar', {

	init: function () {
		this
			.requires('Car, 2D, Canvas, Collision, mycar, Sprite, Multiway, Keyboard, Tween')
			.collision(
			/* created with summer html image map creator*/
			//http://os-class.ru/mapcreator/index.htm
			new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140])
		)
			.attr({
			})
			.multiway({ x: 3, y: 3 }, {
				LEFT_ARROW: -180,
				RIGHT_ARROW: 0,
				UP_ARROW: -90,
				DOWN_ARROW: 90
			})
			.onHit('EnemyCar', function (car) {
				this.trigger('Crash');
			})
			.one('Crash', function () {
				Crafty.player.setPoints(Crafty('Points').getPoints());
				Crafty.enterScene('game-over');

				Crafty.e('Timer').setTimeCallback(2, function () {

				});
			})
			.bind('GoUp', function () {
				this.y--;
			})
			.bind('GoDown', function () {

			})
			.bind('TweenEnd', function (obj) {
				/*stop rotation*/
				if (obj.rotation !== 0) {
					this.trigger('TurnStop');
				}
			})
			.bind('TurnLeft', function () {
				if (this._movement.y <= 0) {
					this.tween({rotation: -30}, 200);
				} else if (this._movement.y > 0) {
					this.tween({rotation: 20}, 500);
				}
			})
			.bind('TurnRight', function () {
				if (this._movement.y <= 0) {
					this.tween({rotation: 30}, 200);
				} else if (this._movement.y > 0) {
					this.tween({rotation: -20}, 500);
				}
			})
			.bind('TurnStop', function () {
				this.tween({rotation: 0}, 200);
			})
			.bind('EnterFrame', function (obj) {

				/*увеличиваем скорость каждые 10 тиков*/
				if (obj.frame % 10 === 0) {
					this.trigger('GoUp');
				}

				this.move('s', this._directionS);
				this.move('w', this._directionW);

				//TODO сделать проверку получше
				if (Crafty('EnemyCar').length <= Crafty.math.randomInt(1, 2)) {
					Crafty.e('EnemyCar');
				}

			})
			.bind('RenderScene', function () {

				var screenX = this.screenX(),
					screenY = this.screenY();

				if (screenX === -1) {
					this.x += 1;

					if (this.x < 0 - this.w) {
						this.disableControl();
					}
				} else if (screenX === 1) {
					this.x -= 1;

					if (this.x > Crafty.viewport.width) {
						this.disableControl();
					}
				}

				if (screenY === -1) {
					this.y = 0;
				} else if (screenY === 1) {
					this.y = Crafty.viewport.height - this.h;
				}
			})
			.bind('Move', function () {
				if (!this.smoke || !this.smoke.pinCar || !this.isDown) return;

				this.smoke.pinCar(this);

				if (this.isDown('LEFT_ARROW')) {
					this.trigger('TurnLeft');
					return;
				}
				if (this.isDown('RIGHT_ARROW')) {
					this.trigger('TurnRight');
					return;
				}
			})
			.bind('NewDirection', function () {
				if (this.disableControls) {
					this.enableControl();
				}

				/*останавливаем движение если неактивно стрелки передвижения неактивны*/
				if (this.isDown('LEFT_ARROW') || this.isDown('RIGHT_ARROW')) {
				} else {
					this.trigger('TurnStop');
				}
			})
		;

//            Crafty.viewport.follow(this);
	}
});
