(function (Crafty) {

    function levelInit() {

        Crafty.background('rgb(127,127,127)');

        Crafty.e('Grass');

        Crafty.e('Asphalt').attr({ y: -200 });
        Crafty.e('Asphalt').attr({ y: 0 });
        Crafty.e('Asphalt').attr({ y: 200 });
        Crafty.e('Asphalt').attr({ y: 400 });

        Crafty.e('Road').attr({

        });


        /*TEST*/
        Crafty.e("Car")
            .attr({
                x: 100,
                y: Crafty.viewport._height - 60,
                w: 64,
                h: 141,
                z: 999
            });

        Crafty.e("Points")
    }

    function levelOut() {
        console.log('level out')
    }


    Crafty.defineScene('level', levelInit, levelOut);

}(Crafty));