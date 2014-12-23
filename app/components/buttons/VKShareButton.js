(function (Crafty) {
	'use strict';

	/* vk btn */
	Crafty.c('VKShareButton', {
		url: window.location.href,//url	Link to the page to be posted.
		title: window.document.title,//	title	Post title. If not set, title from the post page will be used.
		description: null,//	description	Post description. If not set, description from the post page will be used.
		image: null,//	image	Link to image of the post. If not set, image from the post page will be used.
		noparse: false,//	If true, VK server will not make an additional request to download missing information from the posted page. If false, request will be sent always.

		init: function () {
			this.requires('2D, Canvas, share, Mouse')
				.bind('Click', function () {
					var href = 'http://vk.com/share.php?url=' + this.url +
							'&title=' + this.title +
							'&description=' + this.description +
							'&image=' + this.image +
							'&noparse=' + this.noparse
						;

					window.open(href);
				})
			;
		}
	});

}(Crafty));