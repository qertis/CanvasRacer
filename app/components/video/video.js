(function (Crafty) {
	'use strict';

	Crafty.c('Video', {
		poster: '',
		videos: {},
		once: false,
		videoElem: null,

		init: function () {
			this.videoElem = document.createElement('video');

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

		setFullScreenStyle: function () {
			this.videoElem.style.position = 'fixed';
			this.videoElem.style.right = 0;
			this.videoElem.style.bottom = 0;
			this.videoElem.style.minWidth = '100%';
			this.videoElem.style.minHeight = '100%';
			this.videoElem.style.width = 'auto';
			this.videoElem.style.height = 'auto';
			this.videoElem.style.zIndex = -100;
			this.videoElem.style.backgroundSize = 'cover';

			if (!!this.poster) {
				this.videoElem.style.background = 'url(' + this.poster + ') no-repeat';
			}

			Crafty.stage.elem.appendChild(this.videoElem);
		},

		setInnerScreenStyle: function () {
			this.videoElem.style.position = 'absolute';
			this.videoElem.style.left = 0;
			this.videoElem.style.top = 0;
			this.videoElem.style.minWidth = '100%';
			this.videoElem.style.minHeight = '100%';
			this.videoElem.style.width = 'auto'//Crafty.stage.elem.offsetWidth + 'px';
			this.videoElem.style.height = Crafty.stage.elem.offsetHeight + 'px';

			this.videoElem.style.zIndex = -100;
			this.videoElem.style.backgroundSize = 'cover';

			if (!!this.poster) {
				this.videoElem.style.background = 'url(' + this.poster + ') no-repeat';
			}

			Crafty.stage.inner.appendChild(this.videoElem);

			setTimeout(function () {
				Crafty.stage.inner.style.zIndex = 0;
			}, 100);
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

				Crafty.DrawManager.renderDOM();
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

			function setEvents() {
				self.videoElem.addEventListener('loadedmetadata', function () {
				}, false);

				self.videoElem.addEventListener('ended', function () {
					if (self.once === true) {
						self.destroyVideo();
					}
				}, false);
			}

			appendChild();
			setAttr();
			setEvents();

			return this;
		}

	});

}(Crafty));