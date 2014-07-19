Crafty.c('Points', {
	_score : 0,

	init: function() {
		this
			.requires('BoldFont')
			.attr({ 
				x: 20, 
				y: 20, 
				w: 100, 
				h: 20, 
				points: 0 
			})
			.bind('EnterFrame', function() {

				this.text('Points' + this._score++);
			})
			.text("0 Points");
	}
});
