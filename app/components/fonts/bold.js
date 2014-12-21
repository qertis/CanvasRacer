(function (Crafty) {

	Crafty.c('BoldFont', {
		init: function () {
			this.requires("2D, Canvas, Text")
				.text('')
				.origin("center")
				.textColor('rgb(254, 254, 254)')
				.textFont({
					size: '28px',
					type: 'normal',
					weight: 'bold',
					family: 'Lobster'
				});
		}
	});

}(Crafty));
