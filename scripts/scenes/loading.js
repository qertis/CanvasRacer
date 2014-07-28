Crafty.defineScene('loading', function () {
	Crafty.background('#000000');

	Crafty.e('2D, DOM, Text')
		.attr({ w: 100, h: 20, x: 150, y: 120 })
		.text('Loading...')
		.css({ 'text-align': 'center'})
		.textColor('#CCCCCC');


	Crafty.load(["track.png"],
		function () {
			//when loaded
			//Crafty.enterScene('menu');
		},
		function (e) {
			//progress

		},
		function (e) {
			console.log('error loading');
		}
	);
});
