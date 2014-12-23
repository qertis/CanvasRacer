(function(Crafty){
	'use strict';

	Crafty.c('Button', {
		_button: null,

		init: function () {
			this.requires('HTML, Mouse');
			var button = document.createElement('button');

			button.style.color = '#333';
			button.style.backgroundColor = 'ghostwhite';
			button.style.padding = '4px 12px';
			button.style.border = 'none';

			this._button = button;
		},

		setSize: function (width, height) {
			this._button.style.width = width || this.w + 'px';
			this._button.style.height = height || this.h + 'px';

			//явно вызываем для отрисовки CSS
			this.replace(this._button.outerHTML);

			return this;
		},

		setText: function (text) {
			this._button.textContent = text;
			this.replace(this._button.outerHTML);

			return this;
		}
	});

}(Crafty));