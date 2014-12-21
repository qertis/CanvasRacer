(function (Crafty) {

	Crafty.c('DeviceOrientation', {
		_data: null,
		_setDeviceData: function(data) {
			if(data) {
				this._data = data;
			}
		},
		getDeviceData: function() {
			return this._data;
		},
		init: function () {
			if (!Crafty.support.deviceorientation) {
				throw 'deviceorientation is not supported';
			}
			if (!Crafty.support.devicemotion) {
				throw 'devicemotion is not supported';
			}

			var self = this;
			Crafty.device.deviceOrientation(function(data) {
				self._setDeviceData(data);
			});

			this.bind('EnterFrame', function() {
				this.trigger('DeviceAxisChange', this.getDeviceData());
			})
		}
	})

}(Crafty));