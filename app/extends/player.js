(function (Crafty) {

    Crafty.extend({
        gameBlur: function () {
            document.title = 'GAME Paused';

            if (!Crafty.isPaused()) {
                Crafty.pause();
            }
        },
        gameFocus: function () {
            document.title = 'GAME READY';

            if (Crafty.isPaused()) {
                Crafty.pause();
            }
        },
        player: {
            name: 'Player One',
            points: 0,
            geo: null,
            setGeoPoint: function () {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    Crafty.player.geo = new Parse.GeoPoint(pos.coords);
                }, function (err) {
                    console.error('cannot get current position' + err)
                });
            },
            setPoints: function (pts) {
                Crafty.player.points = pts;
            },
            setUserName: function (name) {
                Crafty.player.name = name;
            }
        }
    });

    /*
    Crafty.extend({
        _href: null,
        setHref: function () {
            if (this._href !== null) return this.this._href;
            else {
                var pageHref = location.href;
                pageHref = pageHref.replace(/\/\w+.(htm?|html)$/gi, '');

                return this._href = pageHref;
            }
        }
    });*/


    Crafty.extend({
        fullscreen: {
            on: function () {
                if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            },
            off: function () {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    });


}(Crafty));