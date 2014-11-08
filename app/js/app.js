var app = angular.module('wave', ["ui.router"], function() {

});

angular.module('wave.services', []);
angular.module('wave.controllers', []);

//routing
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
      url: "/",
      templateUrl: "templates/app.html",
      controller: "RootCtrl"
    });
  });