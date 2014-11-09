angular.module('wave.controllers')
.controller('RootCtrl', function($scope, Player, Playlists, Playqueue, Users) {
  $scope.something = "Hello, world! Hello";
  var playing = false;

  $scope.createUser = function(user) {
    var promise = Users.create(user.username, user.id);

    promise.then(function(data) {
      Users.setCurrent(data);
    });
  };

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
});