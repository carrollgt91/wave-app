var app = angular.module('wave', ["ui.router", "wave.controllers", "wave.services"], function() {
});

var env = "development";

var rootUrl = "http://malachite-api.herokuapp.com/api";
var clientId = config.clientId;

SC.initialize({
  client_id: clientId,
  redirect_uri: config.redirectUri
});

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