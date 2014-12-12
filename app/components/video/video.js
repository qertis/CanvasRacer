(function () {


// once {boolean} не обязателен.  Если false|undefined - видео проигрывается всегда.
    Crafty.c('Video', {
        poster: '',
        videos: {},
        once: false,
        videoElem: null,

        init: function () {
            Crafty('FullVideo').each(function () {
                this.destroyVideo();
            });
        },

        destroyVideo: function () {
            if (this.videoElem) {
                this.videoElem.remove();
                this.destroy();
            }
        },

        createVideo: function () {
            var self = this;

            function appendChild() {
                for (var source in self.videos) {
                    var srcElem = document.createElement('source');
                    srcElem.src = self.videos[source];

                    srcElem.type = 'video/' + source;
                    self.videoElem.appendChild(srcElem);
                }
            }

            function setAttr() {
                if (self.once === true) {

                } else {
                    self.videoElem.loop = true;
                }

                self.videoElem.autoplay = true;

                if (!!self.poster) {
                    self.videoElem.poster = self.poster;
                }
            }

            function setInnerScreenStyle() {
//TODO: дописать возможность установки внутреннего видео внутри игрового контейнера
            }

            function setFullScreenStyle() {
                self.videoElem.style.position = 'fixed';
                self.videoElem.style.right = 0;
                self.videoElem.style.bottom = 0;
                self.videoElem.style.minWidth = '100%';
                self.videoElem.style.minHeight = '100%';
                self.videoElem.style.width = 'auto';
                self.videoElem.style.height = 'auto';
                self.videoElem.style.zIndex = '-100';
                self.videoElem.style.backgroundSize = 'cover';

                if (!!self.poster) {
                    self.videoElem.style.background = 'url(' + self.poster + ') no-repeat';
                }
            }

            function setEvents() {
                self.videoElem.addEventListener('loadedmetadata', function () {
                }, false);

                self.videoElem.addEventListener('ended', function () {
                    if (self.once === true) {
                        self.destroyVideo();
                    }
                }, false);
            }

            self.videoElem = document.createElement('video');

            appendChild();
            setAttr();
            setFullScreenStyle();
            setEvents();

            document.body.appendChild(self.videoElem)
        }


    });

}());