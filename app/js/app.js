'use strict';


var dosApp = angular.module('dosApp', ['ngRoute']);

//configure our routes
dosApp.config(function($routeProvider) {
	$routeProvider

		//route for the home page
		.when('/', {
			templateUrl : 'partials/home.html',
			controller: 'mainController'
		})

		//route for the about page
		.when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'aboutController'
		})

		//route for the contact page
		.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'contactController'
		});
});


//create a controller and inject Angular's $scope
dosApp.controller('mainController', function($scope) {
	
	//create a message to display in our view
	$scope.message = "Everone come an see how good I look!";
});

dosApp.controller('aboutController', ['$scope', '$filter', function($scope, $filter) {
	
	//create a message to display in our view
	$scope.handle = '';

	$scope.lowercaseHandle = function() {
		return $filter('lowercase')($scope.handle);
	};

	//Test for $watch to describe the Watcher and Digest Loop - old value & new values
	/*$scope.$watch('handle', function(newvalue, oldvalue) {
		
		console.info('Changed!');
		
		console.log('Old: ' + oldvalue);
		console.log('New: ' + newvalue);
	});*/
	
	$scope.characters = 5;

	//Native JavaScript way of getting API (for eg. to get the data from the database for creating Rules)
	var rulesrequest = new XMLHttpRequest();
	rulesrequest.onreadystatechange = function () {
		
		$scope.$apply(function () {
			//check to see the state 
			if (rulesrequest.readyState == 4 && rulesrequest.status == 200) {
					$scope.rules = JSON.parse(rulesrequest.responseText);
			}

		});
	}

	//Open the connection
	rulesrequest.open("GET", "http://localhost:8080/api", true);
	//send it
	rulesrequest.send();

	
	//Angular way of getting external data

	
}]);

dosApp.controller('contactController', function($scope) {
	
	//create a message to display in our view
	$scope.message = "Contact us!";
});