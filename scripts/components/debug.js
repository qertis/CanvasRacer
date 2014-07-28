Crafty.c('DebugMsg', {
	init: function () {
		this.requires('DefaultFont')
			.attr({
				x: 0,
				h: 200,
				w: 200,
				y: 0,
				z: 999
			})
			.textColor('#FF0000')
	},
	log: function (msg) {
		this.text(msg);
	}
});
