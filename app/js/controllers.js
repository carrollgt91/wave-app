angular.module('wave.controllers')
.controller('RootCtrl', function($scope, $location, Player, Playlists, Playqueue, Users) {
  $scope.createUser = function(user) {
    var promise = Users.create(user.username, user.id);

    promise.then(function(data) {
      Users.setCurrent(data);
      $location.path("/profile");
    });
  };
})
.controller('ProfileCtrl', function($scope, Users, Playqueue, Player) {
  $scope.Playqueue = Playqueue;
  $scope.Player = Player;

  var playqueue = Users.getPlayqueue();
  playqueue.then(function(queue) {
    Playqueue.set(queue);
  })

  var likes = Users.getLikes();
  likes.then(function(data) {
    $scope.startPlaying = function() {
      Playqueue.clear();
      Playqueue.add($scope.songs);
      Player.play();
    };

    $scope.insert = function(song) {
      Player.stop();
      Playqueue.insert(song);
      Player.play();
    };

    $scope.songs = data;
    console.log($scope.songs)
  });

  window.scope = $scope;
})
.controller("PlayCtrl", function($scope, Player) {
  $scope.play = function() {

    Player.play();
  };

  $scope.pause = Player.pause;
  $scope.next = Player.next;
  $scope.previous = Player.previous;
  $scope.Player = Player;
});