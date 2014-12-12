(function (Crafty) {

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



}(Crafty));