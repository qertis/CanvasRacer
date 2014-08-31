(function () {

    Crafty.c('DefaultFont', {
        init: function () {
            this.requires("2D, Canvas, Text")
                .text('')
                .textColor('#FF0000')
                .textFont({
                    size: '20px',
                    family: 'Ubuntu Mono'
                });
        }
    });

    Crafty.c('ItalicFont', {
        init: function () {
            this.requires("2D, Canvas, Text")
                .text('')
                .textColor('#FF0000')
                .textFont({
                    type: 'italic',
                    size: '20px',
                    weight: 'bold',
                    family: 'Ubuntu Mono'
                });
        }
    });

    Crafty.c('BoldFont', {
        init: function () {
            this.requires("2D, Canvas, Text")
                .text('')
                .textColor('#FF0000')
                .textFont({
                    size: '20px',
                    weight: 'bold',
                    family: 'Ubuntu Mono'
                });
        }
    });

}());
