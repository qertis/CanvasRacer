(function (Crafty, window) {

    window.addEventListener('load', function () { // on page load

        // TODO PRODUCTION ONLY
        // window.onblur = Crafty.gameBlur;
        // window.onfocus = Crafty.gameFocus;

        //последовательность: getCraftyModules-> getGameConfig-> gameInit
//		getCraftyModules();
//		getGameConfig();
//		gameInit();

        document.onkeypress = function (e) {
            // Ctrl-R
            if (e.keyCode == 114) {
                Crafty.enterScene('level');
                e.preventDefault();
            }
        };

        testInit();

    }, false);

    function testInit() {

        getCraftyModules();
    }

    function getCraftyModules() {


        var pageHref = Crafty.setHref();

        // Loading from alternative repository
        Crafty.modules(pageHref, {
            'scripts/components/car': 'DEV',
            'scripts/components/fonts': 'DEV',
            'scripts/components/enemycars': 'DEV',
            'scripts/components/keyboard': 'DEV',
            'scripts/components/points': 'DEV',
            'scripts/components/debug': 'DEV',
            'scripts/scenes/loading': 'DEV',
            'scripts/scenes/menu': 'DEV',
            'scripts/scenes/level': 'DEV',
            'scripts/scenes/game-over': 'DEV',
            'scripts/common/utils': 'DEV',
            'scripts/components/video.js': 'DEV'

        }, function () {
            console.log('module is ready');

            getGameConfig();
        });
    }


    function getGameConfig() {

        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', Crafty._href + '/config.json', true);
        req.onload = function () {

            if (req.readyState === 4 && req.status == 200) {
                var respJson = JSON.parse(req.responseText);

                gameInit();

                if (respJson.production) {
//					productionLoad();
                } else {

                }

            }
        };
        req.onerror = function (err) {
            console.log('error', err);
        };
        req.send(null);
    }


//	window.onload = ;

    function gameInit() {
        Crafty.init(320, 480, 'container');
        Crafty.canvas.init();
        Crafty.pixelart(true);
        Crafty.viewport.mouselook(true);

        Crafty.enterScene("loading");

        Crafty.bind('SceneChange', function () {

            Crafty('DebugMsg').destroy();
            Crafty.e('DebugMsg');
        });
    }


    /*POINTER LOCK*/

    document.addEventListener('pointerlockerror', errorCallback, false);
    document.addEventListener('mozpointerlockerror', errorCallback, false);
    document.addEventListener('webkitpointerlockerror', errorCallback, false);


    /*
     window.video = Crafty.e('Video').attr({
     poster: 'http://demosthenes.info/assets/images/polina.jpg',
     videos: {
     webm: 'http://demosthenes.info/assets/videos/polina.webm',
     mp4: 'http://demosthenes.info/assets/videos/polina.mp4'
     },
     once: true
     }).createVideo();*/


}(Crafty, window));