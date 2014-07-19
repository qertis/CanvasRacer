Crafty.c('DefaultFont', {
	init: function () {
		this.requires("2D, Canvas, Text")
			.text('')
			.textColor('#FF0000', 0.8)
			.textFont({
				size: '20px',
				family: 'Ubuntu Mono'
			});
	}
});

Crafty.c('ItalicFont', {
	init: function () {
		this.requires("2D, Canvas, Text")
			.text('')
			.textColor('#FF0000', 1.0)
			.textFont({
				type: 'italic',
				size: '20px',
				weight: 'bold',
				family: 'Ubuntu Mono'
			});
	}
});

Crafty.c('BoldFont', {
	init: function () {
		this.requires("2D, Canvas, Text")
			.text('')
			.textColor('#FF0000', 1.0)
			.textFont({
				size: '20px',
				weight: 'bold',
				family: 'Ubuntu Mono'
			});
	}
});