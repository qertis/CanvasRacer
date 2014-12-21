(function (Crafty) {

	Crafty.c('DefaultFont', {
		init: function () {
			this.requires("2D, Canvas, Text")
				.text('')
				.origin("center")
				.textColor('#FF0000')
				.textFont({
					size: '20px'
				});
		}
	});

}(Crafty));
