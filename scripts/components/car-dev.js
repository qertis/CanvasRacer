(function (Crafty) {


    Crafty.c('TrafficLight', {
        //или слева или справа
        setRandomPos: function () {

            var randomInt = Crafty.math.randomInt(0, 1);

            if (randomInt === 0) {//left
                this.x = 20;
            } else {//right
                this.x = 300;
            }

        },
        init: function () {
            this
                .requires('2D, Canvas, Collision, trafficlight, Sprite, LevelSpeed')
                .collision(
                new Crafty.polygon([0, 0], [15, 0], [15, 100], [0, 100])
            )
                .attr({
                    x: 0,
                    y: 0,
                    z: 999,
                    w: 15,
                    h: 100
                })
                .onHit('Car', function (car, noHit) {

//проверка на то что мы ударились с player Car
                    car.forEach(function (e) {
                        if (e.obj.has('PlayerCar')) {
                            e.obj.trigger('Crash');
                        }
                        if (e.obj.has('EnemyCar')) {
                            console.log('crash with enemy car')
                        }
                    });

                })
                .bind('EnterFrame', function () {
                    this.y += this.speed;

                    if (this.y > Crafty.viewport.height) {
                        this.destroy();
                    }
                })

            ;


        }
    });

    Crafty.c('Car', {
        _directionW: 0, /* направление вверх-вниз */
        _directionS: 0, /* направление вправо-влево */

        speed: 0.0,
        movingBottom: false,
        compareScreen: function () {
            if (this.movingBottom) {
                if (this.y > Crafty.viewport.height * 2)
                    this.destroy();
            } else {
                if (this.y < -Crafty.viewport.height)
                    this.destroy();
            }

        },

        speedUp: function () {
            this.y += this.speed;
        },
        speedDown: function () {
            this.y -= this.speed;
        },

        crash: function (cars) {
            cars
                .map(function (e) {
                    return e.obj
                })
                .concat(this)
                .forEach(function (car) {
                    car.trigger('Crash');
                })
            ;
        },

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
        screenX: function () {
            /*проверка на границы со сценой*/
            if (this.x < 0)
                return -1;
            if (this.x > Crafty.viewport.width - this.w)
                return 1;
        },
        screenY: function () {
            if (this.y < 0)
                return -1;
            if (this.y > Crafty.viewport.height - this.h)
                return 1;
        },
        createSmoke: function () {
            if (this.smoke) {
                throw 'smoke was created!';
            }

            var smokeOriginPos = {
                x: this.w - 20,
                y: this.h - 2
            };

            this.smoke = Crafty
                .e("Smoke")
                .attr({
                    _pos: smokeOriginPos
                })
            ;
        }
    });


//TODO сделать главный компонент Car и мини-компоненты EnemyCar и PlayerCar
    Crafty.c('PlayerCar', {

        init: function () {
            this
                .requires('Car, 2D, Canvas, Collision, mycar, Sprite, Multiway, Keyboard, Tween')
                .collision(
                /* created with summer html image map creator*/
                //http://os-class.ru/mapcreator/index.htm
                new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140])
            )
                .attr({
                })
                .multiway({ x: 3, y: 3 }, {
                    LEFT_ARROW: -180,
                    RIGHT_ARROW: 0,
                    UP_ARROW: -90,
                    DOWN_ARROW: 90
                })
                .onHit('EnemyCar', function (car) {
                    this.trigger('Crash');
                })
                .one('Crash', function () {

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


                    //center player car
                    Crafty.viewport.centerOn(this, 1000);


                    /*увеличиваем скорость каждые 10 тиков*/
                    if (obj.frame % 10 === 0) {
                        this.trigger('GoUp');
                    }

                    this.move('s', this._directionS);
                    this.move('w', this._directionW);

                    //TODO сделать проверку получше
                    if (Crafty('EnemyCar').length <= Crafty.math.randomInt(1, 2)) {
                        Crafty.e('EnemyCar');
                    }

                })
                .bind('RenderScene', function () {

                    var screenX = this.screenX(),
                        screenY = this.screenY();

                    if (screenX === -1) {
                        this.x += 1;

                        if (this.x < 0 - this.w) {
                            this.disableControl();
                        }
                    } else if (screenX === 1) {
                        this.x -= 1;

                        if (this.x > Crafty.viewport.width) {
                            this.disableControl();
                        }
                    }

                    if (screenY === -1) {
                        this.y = 0;
                    } else if (screenY === 1) {
                        this.y = Crafty.viewport.height - this.h;
                    }
                })
                .bind('Move', function () {
                    if (!this.smoke || !this.smoke.pinCar || !this.isDown) return;

                    this.smoke.pinCar(this);

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
                    if (this.disableControls) {
                        this.enableControl();
                    }

                    /*останавливаем движение если неактивно стрелки передвижения неактивны*/
                    if (this.isDown('LEFT_ARROW') || this.isDown('RIGHT_ARROW')) {
                    } else {
                        this.trigger('TurnStop');
                    }
                })
            ;
        }
    });

}(Crafty));