angular.module('wave.controllers')
.controller('RootCtrl', function($scope, Player) {
  $scope.something = "Hello, world! Hello";
  console.log(Player);
});