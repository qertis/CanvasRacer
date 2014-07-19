//FIXME ���� �� ���� - �������� �������������
/*setInterval(function() {
 //	Crafty.e('EnemyCar');
 }, 3000);
 */

//TODO added left and right cars
Crafty.c('EnemyCar', {
	init: function () {
		this.requires('2D, Canvas, Color, Collision')
			.color('rgb(255,0,0)')
			.attr({
				x: Crafty.math.randomInt(0, 300),
				y: 0,
				w: 20,
				h: 40,
				_speed: 4//Crafty.math.randomInt(2,5);
			})
			.bind('EnterFrame', function () {
				this.y += this._speed;

				if (this.y > Crafty.viewport.height) {
					this.destroy();
				}
			});
	}
});