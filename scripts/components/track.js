/*
Crafty.c('Track', {
	//_tiled : 6,

	init: function() {
		this
			.requires('2D, Canvas')
			.bind('EnterFrame', function() {
				this.y ++;
				
				if(this.y > 500) {
					this.destroy();
				
					this.createNewTiled();
				}
				
			 })
	},
	createNewTiled : function() { 
	
		//FIXME
				Crafty.e('Track, d_1')
					.attr({x: 100, y: -100, rotation: 90})
					.sprite(150, 0)

	}
});*/