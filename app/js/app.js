var app = angular.module('wave', ["ui.router", "wave.controllers", "wave.services"], function() {
});

var rootUrl = "http://localhost:3000/api"
// var rootUrl = "http://malachite-api.herokuapp.com/api";
// var rootUrl = "http://172.31.253.64:3000/api";
var clientId = "251c9152fb3757d609504877ed494ae0";

angular.module('wave.services', []);
angular.module('wave.controllers', []);

//routing
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("index", {
      url: "",
      templateUrl: "templates/splash.html",
      controller: "IndexCtrl"
    })
    .state('root', {
      templateUrl: "templates/app.html",
      controller: "RootCtrl"
    })
    .state('root.profile', {
      url: "/profile",
      templateUrl: "templates/profile.html",
      controller: "ProfileCtrl"
    })
    .state('root.auth', {
      url: "/auth",
      templateUrl: "templates/auth.html",
      controller: "AuthCtrl"
    })
  });