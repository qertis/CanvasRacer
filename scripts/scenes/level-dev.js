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
        Crafty.e('PlayerCar')
            .attr({
                //x: 200,
                x: 300,//test
                y: 250,
                w: 64,
                h: 141,
                z: 999
            })
            .origin('top center')
            .createSmoke()
        ;
        /**/


        var firstScale = 10;
        Crafty.e("Delay").delay(function () {
            Crafty.viewport.scale(--firstScale);

            if (Crafty.viewport._scale === 1) {
                this.destroy();
            }

        }, 50, -1);


        console.log('ffff');

        Crafty.e("Points")
    }

    function levelOut() {
        console.log('level out')
    }


    Crafty.defineScene('level', levelInit, levelOut);

}(Crafty));