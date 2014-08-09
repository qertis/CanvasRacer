(function() {

	Crafty.defineScene("menu", function () {
		Crafty.background("#000");

		Crafty.e("2D, DOM, Text")
			.attr({ w: 100, h: 20, x: 50, y: 120 })
			.text("Your Name: ")
			.css({ "text-align": "center"})
			.textColor("#FFFFFF");

		Crafty.c('InputChangeEvents', {
			init: function () {
				var input = document.createElement('input');
				input.type = 'text';
				input.setAttribute('value', Crafty.player.name);
				input.name = 'PlayerName';

				this.requires('HTML, Keyboard')
					.attr({
						x: 150,
						y: 120,
						w: 100,
						h: 100
					})
					.bind('change', function () {
						if (Crafty.player.name.length < 4) {
							alert('your name: too short!');
							return false;
						}
						Crafty.enterScene('level');
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

						Crafty.player.name = text;
					})

			},
			change: function (e) {
				this.trigger('change');
			}
		});

		Crafty.c('OkButton', {
			init: function () {
				this.requires('HTML, Mouse');
				var button = document.createElement('button');
				button.textContent = 'YEAH';

				this.replace(button.outerHTML);
			}
		});

		Crafty.e('OkButton')
			.attr({
				x: 150,
				y: 150,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty('InputChangeEvents').change();
			});

		Crafty.e("InputChangeEvents");


		/*FIXME test*/
//		Crafty.enterScene('level')
	});

}());