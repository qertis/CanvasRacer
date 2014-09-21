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
                .collision(new Crafty.polygon([0, 0], [15, 0], [15, 100], [0, 100]))
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
        //TODO rename compareScreen
        compareScreen: function () {
            if (this.y > Crafty.viewport.height * 2) {
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
                    Crafty.player.setPoints(Crafty('Points').getPoints());
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

//            Crafty.viewport.follow(this);
        }
    });

    Crafty.c('EnemyCar', {

        //замедляем скорость бота, чтобы он не врезался в чужую машину
        compareWithOtherEnemyCar: function () {


            //логика работы
            //проверяем все машины движующиеся в одну сторону,
            //если их расстояние между собой очень маленькое - замедляем скорость той, что стоит сзади
            Crafty('EnemyCar').each(function () {

                var movingBottom = this.movingBottom;
                var prevCar = this;


                Crafty('EnemyCar').each(function () {

                    //проверка на одно направление
                    if (movingBottom != this.movingBottom && this.xxx) return;

                    if (prevCar != this) {
                        var distance = Crafty.math.distance(prevCar.x, prevCar.y, this.x, this.y);

                        if (distance < 100) {
//                            debugger;
                            //console.warn(distance)

                            if (this.movingBottom) {
//                                this.speed += 0.2;
                            } else {
//                                this.speed -= 0.2;
                            }
                            //  prevCar.xxx = true;
                        }
                    }
                });

                delete prevCar.xxx;

            });

        },
        init: function () {
            if (Crafty._current !== 'level') return;

            var carType = ['car1', 'car2', 'car3', 'car4'],
                movingBottom = Crafty.math.randomInt(0, 1);

            this
                .requires('Car, 2D, Canvas, Sprite, Collision')
                .requires(Crafty.math.randomElementOfArray(carType))
                .attr({
                    w: 64,
                    h: 141,
                    movingBottom: movingBottom
                })
                .collision(new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140]))
                .one('SetAttrs', function () {
                    if (this.movingBottom) {
                        this.x = Crafty.math.randomInt(110, 140);
                        this.y = -Crafty.math.randomInt(this.h, Crafty.viewport.height);
                        this.rotation = 180;
                        this.speed = Crafty.math.randomNumber(6, 8);
                    } else {
                        this.x = Crafty.math.randomInt(180, 210);
                        this.y = -Crafty.math.randomInt(Crafty.viewport.height, Crafty.viewport.height + this.h);
                        this.rotation = 0;
                        this.speed = -Crafty.math.randomNumber(1, 3);
                    }
                })
                .one('Crash', function () {
                    //после аварии - авто идут вниз
                    this.unbind('SpeedUp');
                    this.unbind('SpeedDown');

//                    this.movingBottom = true;
                    console.log('CRASH!');

//                    this.trigger('CrashMove', 0.0);
//                    this.alpha = .5;
                })
                .onHit('EnemyCar', this.crash)
                .bind('CrashMove', function (amount) {
//FIXME!!! плавное уезжаание за экран в случае аварии
//                    console.log('crash!')

                    if (amount > 1) {
                        this.destroy();
                    }
                    this.rotation = Crafty.math.lerp(this.rotation, Crafty.math.randomNumber(-90, 90), amount);

                    this.y += 1;

                    this.trigger('CrashMove', amount + 0.01)
                })
                .bind('SpeedUp', this.speedUp)
                .bind('SpeedDown', this.speedDown)
                .bind('EnterFrame', function () {
                    if (movingBottom)
                        this.trigger('SpeedUp');
                    else
                        this.trigger('SpeedDown');

                    this.compareWithOtherEnemyCar();
                    this.compareScreen();
                })
                .trigger('SetAttrs')
            ;
        }
    });

}(Crafty));