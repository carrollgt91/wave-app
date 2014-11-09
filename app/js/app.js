var app = angular.module('wave', ["ui.router", "wave.controllers", "wave.services"], function() {
});

var rootUrl = "http://localhost:3000/api";

angular.module('wave.services', []);
angular.module('wave.controllers', []);

//routing
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
      url: "/create",
      templateUrl: "templates/app.html",
      controller: "RootCtrl"
    })
    .state('profile', {
      url: "/profile",
      templateUrl: "templates/profile.html",
      controller: "ProfileCtrl"
    })
  });