(function (Crafty) {
	'use strict';

	Crafty.c('Gamepad', {

		init: function () {
			if(!navigator.getGamepads) {
				throw 'Gamepad is not supported!';
			}
		},

		_gpEnterFrame: function () {
			var gamepad = this._getGamepad(this._gamepadIndex);

			// Only evaluate buttons/axes when we found a gamepad and there
			// have been changes according to timestamp.
			if (gamepad) {
				this._emitGamepadEvents(gamepad);
			}
		},

		_emitGamepadEvents: function (gamepad) {
			for (var i = 0; i < gamepad.buttons.length; i++) {
				if (gamepad.buttons[i]) {
					if (gamepad.buttons[i].pressed) {
						this.trigger('GamepadKeyChange', {
							button: i,
							value: gamepad.buttons[i].value
						});
					}
				}
			}

			for (var j = 0; j < gamepad.axes.length; j++) {
				if (gamepad.axes[j]) {
					this.trigger('GamepadAxisChange', {
						axis: j,
						value: gamepad.axes[j]
					});
				}
			}
		},

		_getGamepad: function (index) {
			var gamepad = navigator.getGamepads().item(index);

			if (gamepad && gamepad.connected) {
				return gamepad;
			}

			return null;
		},

		gamepad: function (gamepadIndex) {
			this._gamepadIndex = gamepadIndex || 0;

			this.bind('EnterFrame', this._gpEnterFrame);

			return this;
		}
	});

})(Crafty);