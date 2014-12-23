(function (Crafty) {
	'use strict';

	var GEOCODE_PROVIDER = "http://geocode-maps.yandex.ru/1.x/?format=json&geocode=";

	Crafty.extend({
		geo: {
			//yandex geocoding. Get city
			getCity: function (geoPoint, callback) {
				if (!geoPoint || !geoPoint.latitude || !geoPoint.longitude) return;

				var xhr = new XMLHttpRequest();
				var latitude = geoPoint.latitude;
				var longitude = geoPoint.longitude;
				var url = GEOCODE_PROVIDER + longitude + ',' + latitude;

				xhr.open('GET', url);
				xhr.onload = function (e) {
					var res = JSON.parse(this.response);
					var geoObject = res.response.GeoObjectCollection.featureMember[0].GeoObject;
					var description = geoObject.description || geoObject.name;

					if (callback) callback(description);
				};
				xhr.send();
			}
		}
	});

}(Crafty));