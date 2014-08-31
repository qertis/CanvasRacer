(function (Crafty) {
    /*
     Crafty.c('Wall', {
     init: function () {
     this.requires('2D, Canvas, Collision, Color, Tween')
     .attr({
     x: 50,
     y: 50,
     z: 999,
     w: 100,
     h: 100
     })
     .color('rgb(0,255,0)')

     .bind('EnterFrame', function () {

     this.y++;

     if (this.y > Crafty.viewport.height) {
     this.destroy();
     }
     });
     }
     });*/


    Crafty.c('Car', {
        _directionW: 0, /*направление вверх-вниз*/
        _directionS: 0, /*направление вправо-влево*/

        setDirectionW: function (w) {
            /*быстрое округление до целого*/
            w = w >> 0;

            /*ограничения*/
            if (Crafty.math.abs(w) > 25) {
                return;
            }
            this._directionW = w;
        },
        setDirectionS: function (s) {
            s = s >> 0;

            if (Crafty.math.abs(s) > 25) {
                return;
            }

            this._directionS = s;
        },

        init: function () {
            this.requires('2D, Canvas, Collision, mycar, Sprite, Multiway, Keyboard, Tween')
                .collision(
                /* created with summer html image map creator*/
                //http://os-class.ru/mapcreator/index.htm
                new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140])
            )
                .multiway({ x: 3, y: 3 }, {
                    LEFT_ARROW: -180,
                    RIGHT_ARROW: 0,
                    UP_ARROW: -90,
                    DOWN_ARROW: 90
                })
                .onHit('EnemyCar', function () {
                    this.trigger('Crash');
                })
                .bind('Crash', function () {


                    Crafty.player.points = Crafty('Points').getPoints();
                    Crafty.enterScene('game-over');

                    Crafty.e('Timer').setTimeCallback(2, function () {


                    });
                })
                .bind('GoUp', function () {
                    this.y--;
                })
                .bind('GoDown', function () {

                })
                .bind('TweenEnd', function (obj) {
                    /*stop rotation*/
                    if (obj.rotation !== 0) {
                        this.trigger('TurnStop');
                    }
                })
                .bind('TurnLeft', function () {
                    if (this._movement.y <= 0) {
                        this.tween({rotation: -30}, 200);
                    } else if (this._movement.y > 0) {
                        this.tween({rotation: 20}, 500);
                    }
                })
                .bind('TurnRight', function () {
                    if (this._movement.y <= 0) {
                        this.tween({rotation: 30}, 200);
                    } else if (this._movement.y > 0) {
                        this.tween({rotation: -20}, 500);
                    }
                })
                .bind('TurnStop', function () {
                    this.tween({rotation: 0}, 200);
                })
                .bind('EnterFrame', function (obj) {
                    /*увеличиваем скорость каждые 10 тиков*/
                    if (obj.frame % 10 === 0) {
                        this.trigger('GoUp');
                    }

                    this.move('s', this._directionS);
                    this.move('w', this._directionW);


                    if (Crafty('EnemyCar').length <= Crafty.math.randomInt(1, 2)) {
                        Crafty.e('EnemyCar')
                    }

                })
                .bind('RenderScene', function () {
                    /*проверка на границы со сценой*/
                    if (this.x < -this.w) {
                        this.x = Crafty.viewport.width;
                    } else if (this.x > Crafty.viewport.width) {
                        this.x = 0;
                    }

                    if (this.y < 0) {
                        this.y = 0;
                    } else if (this.y > Crafty.viewport.height - this.h) {
                        this.y = Crafty.viewport.height - this.h;
                    }
                })
                .bind('Move', function () {

                    this.smoke.attr({
                        x: this.x,
                        y: this.y
                    });

                    if (this.isDown('LEFT_ARROW')) {
                        this.trigger('TurnLeft');
                        return;
                    }
                    if (this.isDown('RIGHT_ARROW')) {
                        this.trigger('TurnRight');
                        return;
                    }


                })
                .bind('NewDirection', function () {
                    /*останавливаем движение если неактивно стрелки передвижения неактивны*/
                    if (this.isDown('LEFT_ARROW') || this.isDown('RIGHT_ARROW')) {
                    } else {
                        this.trigger('TurnStop');
                    }
                });


            this.smoke = Crafty.e("Smoke").attr({x: 100, y: 200})
        }
    });

}(Crafty));