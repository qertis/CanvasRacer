(function () {


    function levelInit() {
        Crafty.background('rgb(127,127,127)');

        Crafty.e('Grass');

        Crafty.e('Asphalt').attr({

        });

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


//        Crafty.e('EnemyCar')


        Crafty.e("Points")
    }

    function levelOut() {
        console.log('wow')
    }


    Crafty.defineScene('level', levelInit, levelOut);

}());
