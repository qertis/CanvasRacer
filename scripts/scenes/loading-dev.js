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

		Crafty.load([
				//backgrounds
				'images/backgrounds/game_over.PNG'
				,'images/backgrounds/menu.jpg'
				//sprites
				,'images/sprites/cars/car1.png'
				//textures
				,'images/textures/asphalt_texture.png'
			],

			function () {
				/*when loaded*/


				Crafty.sprite("images/sprites/cars/car1.png", {
					mycar:[0,0, 138, 280]
				});


				Crafty.sprite("images/sprites/cars/car2.png", {
					car2:[0,0, 138, 280]
				})



				Crafty.c('Asphalt', {
					init: function() {

						var y = -340;

						this.requires("2D, Canvas, Image")
							.attr({
								w: 506,//Crafty.viewport.width,
								h: 1024,
								y: y

							})
							.image("images/textures/asphalt_texture.png", "repeat");

						this.bind('EnterFrame', function() {
							this.y += 4;

							if(this.y > 0)
								this.y = y;
						})
					}
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
