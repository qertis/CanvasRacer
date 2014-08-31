(function () {

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
            points: 0
        }
    });


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

}());
