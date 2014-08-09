(function() {

	Crafty.c("Keyboard", {
		isDown: function (key) {
			if (typeof key === "string") {
				key = Crafty.keys[key];
			}
			return !!Crafty.keydown[key];
		}
	});
}());