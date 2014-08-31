(function (Crafty) {

	Crafty.c('EnemyCar', {
        speed: 0.0,
		init: function () {
            var carType = ['car1', 'car2', 'car3', 'car4'],
                movingTop = Crafty.math.randomInt(0, 1);

            this.requires('2D, Canvas, Sprite, Collision')
                .requires(Crafty.math.randomElementOfArray(carType))
                .attr({
                    w: 64,
                    h: 141
				})
                .collision(
                new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140])
            )
                .onHit('EnemyCar', function () {
                    console.log('enemy car');

                    this.unbind('SpeedUp');
                    this.destroy();
                })
				.bind('SpeedUp', function() {
                    this.y += this.speed;

                    if (this.y > Crafty.viewport.height * 2)
                        this.destroy();
				})
				.bind('SpeedDown', function() {
                    this.y -= this.speed;

                    if (this.y < -Crafty.viewport.height)
                        this.destroy();
				})
				.bind('EnterFrame', function () {
                    if (movingTop)
						this.trigger('SpeedUp');
                    else
                        this.trigger('SpeedDown');
				});

            if (movingTop) {
                this.x = Crafty.math.randomInt(100, 160);
                this.y = -Crafty.math.randomInt(this.h, Crafty.viewport.height);
				this.rotation = 180;
                this.speed = Crafty.math.randomNumber(6, 8);
			} else {
                this.x = Crafty.math.randomInt(180, 220);
                this.y = Crafty.math.randomInt(Crafty.viewport.height, Crafty.viewport.height + this.h);
                this.rotation = 0;
                this.speed = Crafty.math.randomNumber(1, 3);
			}
		}
	});
}(Crafty));