Crafty.defineScene('level', function () {
	Crafty.background('rgb(127,127,127)');

	Crafty.sprite("track.png", {
		d_0: [0, 0, 100, 150],
		d_1: [0, 0, 100, 100]
	});


	Crafty.e('Track, d_1')
		.attr({x: 100, y: 500, rotation: 90})
		.sprite(150, 0/*, 50,200*/)


	Crafty.e('Track, d_1')
		.attr({x: 100, y: 400, rotation: 90})
		.sprite(150, 0/*, 50,200*/)

	Crafty.e('Track, d_1')
		.attr({x: 100, y: 300, rotation: 90})
		.sprite(0, 0/*, 50,200*/)

	Crafty.e('Track, d_1')
		.attr({x: 100, y: 200, rotation: 90})
		.sprite(400, 0/*, 50,200*/)

	Crafty.e('Track, d_1')
		.attr({x: 100, y: 100, rotation: 90})
		.sprite(150, 0/*, 50,200*/)


	Crafty.e("Car")
		.attr({x: 100, y: Crafty.viewport._height - 60, w: 20, h: 40, z: 9 })

	//Crafty.e("EnemyCar")


	//Score boards
	Crafty.e("Points")
});