var app = angular.module('wave', ["ui.router", "wave.controllers", "wave.services"], function() {
});

angular.module('wave.services', []);
angular.module('wave.controllers', []);

//routing
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
      url: "/player",
      templateUrl: "templates/app.html",
      controller: "RootCtrl"
    })
  });