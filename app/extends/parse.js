


var user;//TODO переместить в локальную
window.addEventListener('load', function () {
//    "APPLICATION_ID", "JAVASCRIPT_KEY"
	Parse.initialize("bn9Mvt4trLBqOE9zu6OisSdEvnd7m7o9i2Eqzs7k", "eCVDbPlzgDF6xDNnCduQvwSZB2iQzfzqNMXkuyPT");
	Parse.User.allowCustomUserClass(false);//запрещаем делать кастомные классы

	user = Parse.User.current();
	if (user === null || user.isNew()) {
		var name = 'name',
			pass = 'passs';

		var user = newParseUser(name, pass);

		loginUser(name, pass, function () {
			createNewUser(name, pass, function () {
				console.log('такой пользователь уже существует!')
			})
		});

	} else {
		console.log('current user')
		initLevel();
	}

	function newParseUser(name, pass) {
		var user = new Parse.User();
		user.setUsername(name);
		user.setPassword(pass);

		return user;
	}

	function loginUser(name, pass, cbFalse) {
		/*
		 пытаемся залогиниться
		 если не получается - создаем нового юзверя
		 если не получается - выдаем ошибку
		 */
		return user.logIn(name, pass)
			.fail(function () {
				cbFalse();
			})
			.done(function () {
				console.log('User logined!');
				initLevel();
			});
	}

	function createNewUser(name, pass, cbFalse) {
		return user.signUp(name, pass)
			.fail(function () {
				cbFalse();
			})
			.done(function () {
				console.log('User created!');
				initLevel();
			});
	}

	function initLevel() {
		console.log('start level')
	}

});


//    getUserRecords(5);//EXAMPLE
function getUserRecords(limit) {
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

				var geo = elem.get('geo');
				var date = elem.get('date');
				var points = elem.get('points');

				getCity(geo);

				console.log(geo);
				console.log(date);
				console.log(points);

			});
		}
	});
}
