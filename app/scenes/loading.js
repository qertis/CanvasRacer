(function (Crafty) {

	Crafty.defineScene('loading', levelInit, levelOut);

	//---------------------------------------------------------------

	function levelInit() {
		Crafty.background('#ffffff');

		Crafty.e('2D, Canvas, playerCar');

		Crafty.e('2D, Canvas, asphalt')

		Crafty.e('2D, Canvas, trafficlights_shlp')

/*

				Crafty.c('LevelSpeed', {
					speed: 4
				});
				Crafty.c('Grass', {
					init: function () {
						var y = -256;

						this
							.requires("2D, Canvas, Image, LevelSpeed")
							.attr({
								w: Crafty.viewport.width,
								h: Crafty.viewport.height * 2
							})
							.image("images/textures/tex_trava.bmp", "repeat")
							.bind('EnterFrame', function () {
								this.y += this.speed;

								if (this.y > 0)
									this.y = y;
							})
						;
					}
				});

				Crafty.c('Road', {
					init: function () {

						var padding = 50,
							y = -256;

						this.requires("2D, Canvas, Image, LevelSpeed")
							.attr({
								x: padding,
								w: Crafty.viewport.width - padding * 2,
								h: Crafty.viewport.height * 2
							})
							.image("images/textures/m_g_asphalt03.jpg", "repeat")
							.bind('EnterFrame', function (obj) {
								this.y += this.speed;

								if (this.y > 0)
									this.y = y;

								//TODO увеличить
								//каждые 50 метров создаем дорожный столб
								if (obj.frame % 500 === 0) {

									//TODO добавить в продакшене
//                                    Crafty.e('TrafficLight')
//                                        .setRandomPos()
									;
								}

							})

					}
				});

				Crafty.c('Asphalt', {
					defaultY: -340,
					init: function () {
						this
							.requires('2D, Canvas, asphalt, LevelSpeed')
							.attr({
								w: 100,
								h: 100,
								x: Crafty.viewport.width / 2,
								z: 1
							})
							.bind('EnterFrame', function () {
								this.y += this.speed;

								if (this.y > Crafty.viewport.height)
									this.y = this.defaultY;
							})
						;
					}
				});*/


	}

	function levelOut() {

	}

}(Crafty));



/*
	*/

