(function (Crafty) {

	Crafty.c('Car', {
		//_directionW: 0, /* направление вверх-вниз */
		//_directionS: 0, /* направление вправо-влево */
		_speed: 0.0,
		movingBottom: false,

		crash: function (cars) {
			cars.map(function (e) {
				return e.obj
			}).concat(this)
				.forEach(function (car) {
					car.trigger('Crash');
				})
			;
		},

		/*
		 setDirectionW: function (w) {
		 //быстрое округление до целого
		 w = w >> 0;

		 //ограничения
		 if (Crafty.math.abs(w) > 25) {
		 return;
		 }
		 this._directionW = w;
		 },
		 setDirectionS: function (s) {
		 s = s >> 0;

		 if (Crafty.math.abs(s) > 25) {
		 return;
		 }

		 this._directionS = s;
		 },*/

		getOutScreenX: function () {
			/*проверка на границы со сценой*/
			//var hack = this.w / 4;

			if (this.x < 0) {
				return -1;
			}

			if (this.x + this.w > Crafty.viewport.width) {
				return 1;
			}

			return 0;
		}/*,
		 outScreenY: function () {
		 if (this.y < 0 || this.y > Crafty.viewport.height - this.h)
		 return true;

		 return true;
		 }*/
	});

}(Crafty));