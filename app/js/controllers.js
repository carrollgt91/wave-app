angular.module('wave.controllers')
.controller('RootCtrl', function($scope, Player) {
  $scope.something = "Hello, world! Hello";
  var playing = false;
  $scope.playpause = function(){
  	
  	if (playing == true){
  		Player.pause();
  		playing = false;
  	}
  	else{
  		Player.play();
  		playing = true;
  	}
  };
  console.log(Player);
});