(function (Crafty) {
	'use strict';

	Crafty.c('Gamepad', {
		_timestamp: 0.0,
		_buttonsState: [],

		init: function () {
			if (!navigator.getGamepads) {
				throw 'Gamepad is not supported!';
			}
		},

		_gpEnterFrame: function () {
			var gamepad = this._getGamepad(this._gamepadIndex);

			//даем добро на нажатие одиночных клавиш
			if (gamepad && gamepad.timestamp !== this._timestamp) {
				this._timestamp = gamepad.timestamp;
				this._emitGamepadOnceEvents(gamepad);
			}

			// запрещаем ввод множественного нажатия клавиш во время паузы
			if (gamepad) {
				if (Crafty.isPaused()) return;

				this._timestamp = gamepad.timestamp;
				this._emitGamepadEvents(gamepad);
			}
		},

		_emitGamepadOnceEvents: function (gamepad) {
			for (var i = 0; i < gamepad.buttons.length; i++) {
				if (gamepad.buttons[i] && gamepad.buttons[i].pressed && gamepad.buttons[i].value == 1) {
					if (this._buttonsState[i] && gamepad.buttons[i] == this._buttonsState[i]) {
						this.trigger('GamepadKeyOnceChange', {
							button: i,
							value: gamepad.buttons[i].value
						});
						break;
					}
				}

				this._buttonsState[i] = gamepad.buttons[i];
			}
		},

		_emitGamepadEvents: function (gamepad) {
			for (var i = 0; i < gamepad.buttons.length; i++) {
				if (gamepad.buttons[i]) {
					if (gamepad.buttons[i].pressed && gamepad.buttons[i].value !== 0) {

						this.trigger('GamepadKeyChange', {
							button: i,
							value: gamepad.buttons[i].value
						});

						break;
					}
				}
			}

			for (var j = 0; j < gamepad.axes.length; j++) {
				if (gamepad.axes[j]) {
					this.trigger('GamepadAxisChange', {
						axis: j,
						value: gamepad.axes[j]
					});

					break;
				}
			}
		},

		_getGamepad: function (index) {
			var gamepad = navigator.getGamepads();

			if (gamepad && gamepad[index]) {
				if(gamepad[index].connected) {
					return gamepad[index];
				}
			}

			return null;
		},

		gamepad: function (gamepadIndex) {
			this._gamepadIndex = gamepadIndex || 0;
			var self = this;

			function step(timestamp) {
				self._gpEnterFrame();

				window.requestAnimationFrame(step);
			}

			window.requestAnimationFrame(step);

			return this;
		}

	});

})(Crafty);