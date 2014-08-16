(function() {

	function levelInit() {
		Crafty.background('#000 url(images/backgrounds/game_over.PNG) no-repeat center center');
		Crafty.stage.elem.style.backgroundSize = 'contain';

		Crafty.e('2D, DOM, Text')
			.attr({
				x: 20,
				y: 100,
				z: 9,
				h: 100,
				w: 100
			})
			.css('color', '#ccc')
			.text('YOUR RECORD: 150km');

		Crafty.e('2D, DOM, Text')
			.attr({
				x: 20,
				y: 300,
				z: 9,
				h: 100,
				w: 100
			})
			.css('color', '#ccc')
			.text('WORLD Record: \n' +
				'1. Nick (1000km) \n' +
				'2. Ava (900km) \n' +
				'3. ...');
	}

	function levelOut() {

	}

	Crafty.defineScene('game-over', levelInit, levelOut);

}());