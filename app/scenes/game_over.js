(function (Crafty) {

    function levelInit() {
        Crafty.background('#000 url(images/backgrounds/game_over.png) no-repeat center center');
        Crafty.stage.elem.style.backgroundSize = 'contain';

        getUserRecords(5);

        Crafty
            .e('2D, DOM, Text')
            .attr({
                x: 20,
                y: 100,
                z: 9,
                h: 100,
                w: 100
            })
            .css('color', '#ccc')
            .text('YOUR RECORD: ' + Crafty.player.points)
        ;

        Crafty
            .e('2D, DOM, Text')
            .attr({
                x: 20,
                y: 300,
                z: 9,
                h: 100,
                w: 100
            })
            .css('color', '#ccc')
            .text('WORLD Record: \n' +
                '1. Nick (1000km) \n' +
                '2. Ava (900km) \n' +
                '3. ...')
        ;

        /* share facebook btn */
        Crafty
            .e('Button')
            .attr({
                x: 150,
                y: 0,
                w: 50,
                h: 50
            })
            .bind('Click', function () {
                window.open('http://www.facebook.com/plugins/like.php?href=' + window.location.href + '&width&layout=button&action=like&show_faces=false&share=true&height=35&appId=' + /*appid*/ '306589012770148')
            })
            .setText('FB SHARE')
        ;

        /* vk btn */
        Crafty
            .e('Button')
            .attr({
                x: 150,
                y: 50,
                w: 50,
                h: 50
            })
            .bind('Click', function () {
                window.open('http://vkontakte.ru/share.php?url=' + window.location.href);
            })
            .setText('VK SHARE')
        ;

        Crafty
            .e('Button')
            .attr({
                x: 150,
                y: 150,
                w: 50,
                h: 50
            })
            .bind('Click', function () {
                Crafty.scene('level');
            })
            .setText('Again')
        ;
    }

    function levelOut() {

    }

    Crafty.defineScene('game-over', levelInit, levelOut);

}(Crafty));