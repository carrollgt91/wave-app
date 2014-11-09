angular.module('wave.controllers')
.controller('RootCtrl', function($scope, $location, Player, Playlists, Playqueue, Users) {
  $scope.something = "Hello, world! Hello";
  var playing = false;

  $scope.createUser = function(user) {
    var promise = Users.create(user.username, user.id);

    promise.then(function(data) {
      Users.setCurrent(data);
      $location.path("/profile");
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
})
.controller('ProfileCtrl', function($scope, Users, Playqueue) {

  var playqueue = Users.getPlayqueue();
  playqueue.then(function(queue) {
    Playqueue.set(queue);
  })

  var likes = Users.getLikes();
  likes.then(function(data) {
    $scope.startPlaying = function() {
      Playqueue.clear();
      Playqueue.add($scope.songs);
    };
    $scope.songs = data;
    console.log($scope.songs)
  });
});