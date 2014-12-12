(function (Crafty) {

    Crafty.c('Points', {
        _score: 0,

        getPoints: function () {
            return this._score;
        },
        init: function () {
            this
                .requires('BoldFont')
                .attr({
                    x: 20,
                    y: 20,
                    w: Crafty.viewport.width,
                    h: 20,
                    z: 999
                })
                .bind('EnterFrame', function () {
                    this._score++;

                    this.text('Points ' + this.getPoints());
                })
                .text('0 Points')
            ;
        }
    });

}(Crafty));