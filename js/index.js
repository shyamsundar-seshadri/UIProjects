

var app = angular.module("myApp", []);
app.controller("progController", function($scope,$timeout){
	getProgress(".85", "#radial1");
	getProgress(".35", "#radial2");
	getProgress(".25", "#radial3");
});