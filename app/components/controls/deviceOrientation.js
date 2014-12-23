(function (Crafty) {
	'use strict';

	Crafty.c('DeviceOrientation', {
		_data: null,

		init: function () {
			var self = this;

			if (!Crafty.support.deviceorientation) {
				throw 'deviceorientation is not supported';
			}
			if (!Crafty.support.devicemotion) {
				throw 'devicemotion is not supported';
			}

			Crafty.device.deviceOrientation(function (data) {
				self._setDeviceData(data);
			});

			this.bind('EnterFrame', function () {
				this.trigger('DeviceAxisChange', this.getDeviceData());
			})
		},

		_setDeviceData: function (data) {
			if (data && data.tiltLR && data.tiltLR) {
				this._data = data;
			}
		},

		getDeviceData: function () {
			return this._data;
		}

	});

}(Crafty));