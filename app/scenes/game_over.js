(function (Crafty) {
	'use strict';

	Crafty.defineScene('game-over', levelInit, levelOut);

	function levelInit() {
		Crafty.background('#000 url(content/images/game_over.png) no-repeat center center');
		Crafty.stage.elem.style.backgroundSize = 'contain';

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

}(Crafty));