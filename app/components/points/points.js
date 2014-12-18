(function (Crafty) {

    Crafty.c('Points', {
        _score: 0,

        stop: function() {
            this.unbind('EnterFrame')
        },
        getPoints: function () {
            return this._score;
        },
        init: function () {
            this
                .requires('BoldFont')
                .attr({
                    x: Crafty.viewport.width - 150,
                    y: 20,
                    w: 150,
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