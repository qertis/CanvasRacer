(function (Crafty) {
	'use strict';

	Crafty.c("Keyboard", {
		isKeyDown: function (key) {
			if (typeof key === "string") {
				key = Crafty.keys[key];
			}
			return !!Crafty.keydown[key];
		}
	});

}(Crafty));