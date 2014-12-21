(function (Crafty) {
	'use strict';

	var APPLICATION_ID = "bn9Mvt4trLBqOE9zu6OisSdEvnd7m7o9i2Eqzs7k";
	var JAVASCRIPT_KEY = "eCVDbPlzgDF6xDNnCduQvwSZB2iQzfzqNMXkuyPT";
	var GEOCODE_PROVIDER = "http://geocode-maps.yandex.ru/1.x/?format=json&geocode=";

	Crafty.extend({

		geo: {
			//yandex geocoding. Get city
			getCity: function (geoPoint, callback) {
				if (!geoPoint || !geoPoint.latitude || !geoPoint.longitude) return;

				var latitude = geoPoint.latitude;
				var longitude = geoPoint.longitude;

				var url = GEOCODE_PROVIDER + longitude + ',' + latitude;

				var xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onload = function (e) {
					var res = JSON.parse(this.response);
					var geoObject = res.response.GeoObjectCollection.featureMember[0].GeoObject;
					var description = geoObject.description || geoObject.name;

					if (callback) callback(description);
				};
				xhr.send();
			}
		},

		parse: {
			_userRecords: null,

			initialize: function () {
				Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
			},

			user: function () {
				Parse.User.allowCustomUserClass(false);//запрещаем делать кастомные классы
			},

			saveUserRecords: function (points, location) {
				var UserRecords = Parse.Object.extend("UserRecords");
				this._userRecords = this._userRecords || new UserRecords();
				var userRecords = this._userRecords;

				userRecords.set("points", points);
				userRecords.set("location", location);

				var self = this;
				userRecords.save(null, {
					success: function (userRecord) {
						// Execute any logic that should take place after the object is saved.
						alert('New object created with objectId: ' + userRecord.id);

						Crafty.geo.getCity(location, self.updateUserCity.bind(self));
					},
					error: function (userRecord, error) {
						// Execute any logic that should take place if the save fails.
						// error is a Parse.Error with an error code and message.
						alert('Failed to create new object, with error code: ' + error.message);
					}
				});
			},

			updateUserCity: function (city) {
				if (!city) return;

				console.log('updating city...')
				console.log(city);

				var userRecords = this._userRecords;
				userRecords.set("city", city);
				userRecords.save();
			},

			getUserRecords: function (limit, callback) {
				var UserRecords = Parse.Object.extend("UserRecords");
				var query = new Parse.Query(UserRecords);
				query.descending("points");
				query.limit(limit);
				query.find({
					success: function (results) {
						results.forEach(function (elem, index) {
							var city = elem.get('city');
							var points = elem.get('points');

							if (callback) {
								callback({
									count: results.length,
									index: index,
									city: city,
									points: points
								});
							}
						});
					}
				});
			}
		}

	});

}(Crafty));