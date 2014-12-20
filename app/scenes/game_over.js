(function (Crafty) {

	Crafty.defineScene('game-over', levelInit, levelOut);

	function levelInit() {
		Crafty.background('#000 url(content/images/game_over.png) no-repeat center center');
		Crafty.stage.elem.style.backgroundSize = 'contain';

		//getUserRecords(5);

		Crafty
			.e('2D, DOM, Text')
			.attr({
				x: 20,
				y: 20,
				z: 9,
				h: 100,
				w: 100
			})
			.css('color', '#ccc')
			.text('YOUR RECORD: ' + Crafty.player.getPoints())
		;
		/*
		 Crafty
		 .e('2D, DOM, Text')
		 .attr({
		 x: 20,
		 y: 400,
		 z: 9,
		 h: 100,
		 w: 300
		 })
		 .css('color', '#ccc')
		 .text('WORLD Record: \n\n\
		 1. Nick (1000km) \n\
		 2. Ava (900km) \n\
		 3. ...');*/

		/* share facebook btn */
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

		/* vk btn */
		Crafty
			.e('Button')
			.attr({
				x: 150,
				y: 50,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				var href = 'http://vkontakte.ru/share.php?url=' + window.location.href;
				window.open(href);
			})
			.setText('VK SHARE')
		;

		Crafty
			.e('Button')
			.attr({
				x: 150,
				y: 150,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty.scene('level');
			})
			.setText('Again')
		;

		/* Сохраняем данные.
		* Почему так? Все просто - браузерам необходимо явно разрешение на запрос геолокации.*/
		Crafty
			.e('Button')
			.attr({
				x: 150,
				y: 450,
				w: 50,
				h: 50
			})
			.bind('Click', function () {
				Crafty.parse.saveUserRecords(Crafty.player.getPoints(), Crafty.player.getLocation());
			})
			.setText('Save My Record')
		;




		Crafty.parse.getUserRecords(5);
	}

	function levelOut() {

	}


}(Crafty));