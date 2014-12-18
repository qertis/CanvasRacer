(function (Crafty) {
	Crafty.c('Pause', {
		init: function () {
			this.requires('2D, Canvas, pause')
			this.attr({
				z: 999
			})
		}
	});
}(Crafty));
