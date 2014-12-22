(function (Crafty) {
	'use strict';

	Crafty.defineScene('game-over', levelInit, levelOut);

	function levelInit() {
		Crafty.background('#000 url(content/images/game_over.png) no-repeat center center');
		Crafty.stage.elem.style.backgroundSize = 'contain';

		/* share facebook btn
		 Crafty
		 .e('Button')
		 .attr({
		 x: 150,
		 y: 0,
		 w: 50,
		 h: 50
		 })
		 .bind('Click', function () {
		 var apiId = '306589012770148';

		 var href = 'http://www.facebook.com/plugins/like.php?href=' +
		 window.location.href +
		 '&width&layout=button&action=like&show_faces=false&share=true&height=35&appId=' + apiId;

		 window.open(href);
		 })
		 .setText('FB SHARE')
		 /**/

		Crafty
			.e('Gamepad')
			.gamepad(0)
			.bind('GamepadKeyOnceChange', function (e) {

				switch (e && e.button) {
					case 9:
						Crafty.scene('level');
						break;
				}
			});

		/* vk btn */
		Crafty.c('VKShareButton', {
			url: window.location.href,//url	Link to the page to be posted.
			title: window.document.title,//	title	Post title. If not set, title from the post page will be used.
			description: null,//	description	Post description. If not set, description from the post page will be used.
			image: null,//	image	Link to image of the post. If not set, image from the post page will be used.
			noparse: false,//	If true, VK server will not make an additional request to download missing information from the posted page. If false, request will be sent always.

			init: function () {
				this.requires('2D, Canvas, share, Mouse')
					.bind('Click', function () {
						var href = 'http://vk.com/share.php?url=' + this.url +
								'&title=' + this.title +
								'&description=' + this.description +
								'&image=' + this.image +
								'&noparse=' + this.noparse
							;

						window.open(href);
					})
				;
			}
		});

		Crafty
			.e('VKShareButton')
			.attr({
				x: Crafty.viewport.width - 50,
				y: 0,
				w: 50,
				h: 50,
				title: 'My CanvasRacer record!',
				description: 'record: ' + Crafty.player.getPoints() + ' points'
				//image: Crafty.canvas.context.canvas.toDataURL("image/png")
			})
		;

		Crafty
			.e('Button')
			.attr({
				x: Crafty.viewport.width / 2 - 250 / 2,
				y: 450,
				w: 250,
				h: 100
			})
			.bind('Click', function () {
				Crafty.scene('level');
			})
			.setText('Again')
			.setSize()
		;

		Crafty
			.e('DefaultFont')
			.attr({
				x: 20,
				y: 20,
				z: 9,
				h: 100,
				w: 100
			})
			.textColor('#CCCCCC')
			.text('YOUR RECORD: ' + Crafty.player.getPoints() + ' Points')
		;

		Crafty
			.e('DefaultFont')
			.attr({
				x: 40,
				y: 70
			})
			.textColor('#FFFFFF')
			.text('Top records: ')
		;

		//автоматически записываем состояние гонки в БД
		Crafty.parse.saveUserRecords(Crafty.player.getPoints(), Crafty.player.getLocation());

		//выводим рекорды
		Crafty.parse
			.getUserRecords(3, function (obj) {
				Crafty
					.e('DefaultFont')
					.attr({
						x: 40,
						y: 94 + 22 * obj.index,
						z: 9,
						h: 100,
						w: 100
					})
					.textFont({
						size: '16px'
					})
					.textColor('#FFFFFF')
					.text(obj.points + ' Points ' + '(' + obj.city + ')');
			})
		;
	}

	function levelOut() {
		Crafty('Gamepad').each(function () {
			this.destroy();
		});
	}

	//Crafty.e("InputChangeEvents");

//TODO использовать для сообщений
	Crafty.c('InputChangeEvents', {
		init: function () {
			var input = document.createElement('input');
			input.type = 'text';
			input.style.width = '100px';
			input.style.padding = '2px';
			input.setAttribute('value', Crafty.player.name);
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