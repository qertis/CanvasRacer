(function(Crafty) {
	'use strict';

	Crafty.c('InputChangeEvents', {
		init: function () {
			var input = document.createElement('input');
			input.type = 'text';
			input.style.width = '100px';
			input.style.padding = '2px';
			input.setAttribute('value', 'text');
			input.name = 'PlayerName';

			this.requires('HTML, Keyboard')
				.attr({
					x: 20,
					y: 20
				})
				.bind('change', function () {
					if (Crafty.player.name.length < 4) {
						alert('your name: too short!');
						return false;
					}

					Crafty.e('Timer').setTimeCallback(3, function () {
						Crafty.enterScene('level');
					}, function () {
						console.log('эта функция необязательна');
					});
				})
				.replace(input.outerHTML)
				.bind('KeyDown', function (e) {
					var text = this._element.children[0].value.trim();
					var textLength = text.length;
					var keyCode = e.keyCode;

					if (textLength > 10) {
						if (text !== Crafty.player.name) {
							this._element.children[0].value = Crafty.player.name;
						}
						return false;
					}

					switch (keyCode) {
						case Crafty.keys.UP_ARROW:
						case Crafty.keys.RIGHT_ARROW:
						case Crafty.keys.DOWN_ARROW:
						case Crafty.keys.LEFT_ARROW:
							//...
							break;

						case Crafty.keys.ENTER:
							this.change();
							break;

						default:
							//...
							break;
					}

				})

		},
		change: function (e) {
			this.trigger('change');
		}
	});


}(Crafty));