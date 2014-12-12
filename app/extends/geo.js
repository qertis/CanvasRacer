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
