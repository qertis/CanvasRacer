(function (Crafty) {

	Crafty.c('ItalicFont', {
		init: function () {
			this.requires("2D, Canvas, Text")
				.text('')
				.origin("center")
				.textColor('#FF0000')
				.textFont({
					type: 'italic',
					size: '20px',
					weight: 'bold',
					family: 'Ubuntu Mono'
				});
		}
	});
	
}(Crafty));
