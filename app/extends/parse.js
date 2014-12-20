(function (Crafty) {

	var APPLICATION_ID = "bn9Mvt4trLBqOE9zu6OisSdEvnd7m7o9i2Eqzs7k";
	var JAVASCRIPT_KEY = "eCVDbPlzgDF6xDNnCduQvwSZB2iQzfzqNMXkuyPT";

//yandex geocoding
	function getCity(geoPoint) {
		if (!geoPoint || !geoPoint.latitude || !geoPoint.longitude) return;

		var latitude = geoPoint.latitude;
		var longitude = geoPoint.longitude;

		var url = 'http://geocode-maps.yandex.ru/1.x/?format=json&geocode=' + longitude + ',' + latitude;

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function (e) {
			var res = JSON.parse(this.response);
			var geoObject = res.response.GeoObjectCollection.featureMember[0].GeoObject;
			var description = geoObject.description || geoObject.name;

			console.log(description)
		};
		xhr.send();
	}


	/*
	 var UserRecords = Parse.Object.extend("UserRecords");
	 var query = new Parse.Query(UserRecords);
	 query.get("8jhiC79F5I", {
	 success: function(gameScore) {
	 // The object was retrieved successfully.
	 console.log(gameScore)
	 },
	 error: function(object, error) {
	 // The object was not retrieved successfully.
	 // error is a Parse.Error with an error code and message.
	 alert('error')
	 }
	 });*/

	Crafty.extend({
		parse: {
			initialize: function () {
				Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
			},
			user: function () {
				Parse.User.allowCustomUserClass(false);//запрещаем делать кастомные классы
			},
			saveUserRecords: function (points, latLng) {
				var UserRecords = Parse.Object.extend("UserRecords");
				var userRecords = new UserRecords();

				userRecords.set("points", points);

				var geoPoint = new Parse.GeoPoint(latLng.lat, latLng.lng);
				userRecords.set("location", geoPoint);

				userRecords.save(null, {
					success: function (userRecord) {
						// Execute any logic that should take place after the object is saved.
						alert('New object created with objectId: ' + userRecord.id);

						_userRecordId = userRecord.id;
					},
					error: function (userRecord, error) {
						// Execute any logic that should take place if the save fails.
						// error is a Parse.Error with an error code and message.
						alert('Failed to create new object, with error code: ' + error.message);
					}
				});
			},
			getUserRecords: function (limit) {
				var UserRecords = Parse.Object.extend("UserRecords");
				var userRecords = new UserRecords();

				var query = new Parse.Query(UserRecords);
				query.limit(limit);//пять результатов
//        query.ascending("points");
// Sorts the results in descending order by the score field
				query.descending("points");
				query.find({
					success: function (results) {
						results.forEach(function (elem) {

							var geo = elem.get('location');
							//var date = elem.get('date');
							var points = elem.get('points');

							//getCity(geo);

							console.log(geo);
							//console.log(date);
							console.log(points);

						});
					}
				});
			}
		}

	});

}(Crafty));