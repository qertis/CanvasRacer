(function (Crafty) {
	'use strict';

	var APPLICATION_ID = "bn9Mvt4trLBqOE9zu6OisSdEvnd7m7o9i2Eqzs7k";
	var JAVASCRIPT_KEY = "eCVDbPlzgDF6xDNnCduQvwSZB2iQzfzqNMXkuyPT";

	Crafty.extend({

		parse: {
			_userRecords: null,
			_userRecordObjectId: null,

			initialize: function () {
			  try {
          Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
        } catch(error) {
			    alert(error);
        }

				/* загружаем рекорды пользователя если они есть */
				var userRecordObjectId = Crafty.storage('userRecordObjectId');
				if (userRecordObjectId) {
					this._userRecordObjectId = {
						id: userRecordObjectId
					};
				}
			},

			user: function () {
				Parse.User.allowCustomUserClass(false);//запрещаем делать кастомные классы
			},

			saveUserRecords: function (points, location) {
				var self = this;
				var UserRecords = Parse.Object.extend("UserRecords");
				var userRecords = this._userRecords = this._userRecords || new UserRecords();
				var recordObj = this._userRecordObjectId || null;

				userRecords.set("points", points);
				userRecords.set("location", location);

				/* обновляем если существует в localStorage иначе создаем новый */
				userRecords.save(recordObj, {
					success: function (userRecord) {
						// Execute any logic that should take place after the object is saved.
						Crafty.storage('userRecordObjectId', userRecord.id);

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

				var userRecords = this._userRecords;
				userRecords.set("city", city);
				userRecords.save();
			},

			getUserRecords: function (limit, callback) {
			  if(!window.Parse) {
			    if(callback) return callback();
        }
				var UserRecords = Parse.Object.extend("UserRecords");
				var query = new Parse.Query(UserRecords);

				query.descending("points");
				query.limit(limit);
				query.find({
					success: function (results) {
						results.forEach(function (elem, index) {
							var city = elem.get('city');
							var points = elem.get('points');

							if(!city || !points) return;

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