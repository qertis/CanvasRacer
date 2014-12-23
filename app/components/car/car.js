(function (Crafty) {

	Crafty.c('Car', {
		_speed: 0.0,

		init: function () {
			this.requires('2D, Canvas, Tween, Collision, Sprite')
				.origin('top center')
		},

		crash: function (cars) {
			cars.map(function (e) {
				return e.obj
			}).concat(this)
				.forEach(function (car) {
					car.trigger('Crash');
				})
			;
		},

		getOutScreenX: function () {
			/*проверка на границы со сценой*/
			if (this.x < 0) {
				return -1;
			}

			if (this.x + this.w > Crafty.viewport.width) {
				return 1;
			}

			return 0;
		}
	});

}(Crafty));