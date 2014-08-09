(function()  {


	Crafty.defineScene('loading', function () {
		Crafty.background('#000000');

		Crafty.e('2D, DOM, Text')
			.attr({ w: 100, h: 20, x: 150, y: 120 })
			.text('Loading...')
			.css({ 'text-align': 'center'})
			.textColor('#CCCCCC');


		Crafty.e('Loading, 2D, DOM, Text')
			.attr( { w : 100, h: 20, x: 50, y: 300})
			.textColor('#FFFFFF')

		Crafty.load(["images/sprites/gallon.png", 'images/sprites/trafficlights_shlp.png'],

			function () {
				/*when loaded*/


				Crafty.sprite("images/sprites/cars/GTA2_CAR_3.bmp", {
					mycar:[0,0,50,98]
				});


				//TEST for loading scene
				setTimeout(function () {

				Crafty.enterScene('menu');

				}, 100);

			},
			function (e) {
				/*progress*/
				console.log(e)

				Crafty('Loading').text('progress: ' + e.percent)
			},
			function (e) {
				console.log('error loading');
			}
		);
	});


}());
