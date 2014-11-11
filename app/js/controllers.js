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

  if(Users.current()) {
    var playqueue = Users.getPlayqueue();
    playqueue.then(function(queue) {
      Playqueue.set(queue);
    })

    var likes = Users.getLikes();
    likes.then(function(data) {
      $scope.startPlaying = function() {
        Playqueue.clear();
        Player.play();
      };

      $scope.insert = function(song) {
        if(Player.playing)
          Player.stop();
        Playqueue.insert(song);
        Player.play();
      };

      $scope.append = function(song) {
        Playqueue.append(song);
      };

      $scope.songs = data;
      console.log($scope.songs)
    });
  }

  window.scope = $scope;
})
.controller("PlayCtrl", function($scope, Player, Playqueue, Users) {
  if(Users.current()) {
    var likes = Users.getLikes();
    likes.then(function(data) {
      $scope.play = function() {
        if(!Playqueue.current()) {
          Playqueue.add(data);
        }
        Player.play();
      };
    });
  }
  

  $scope.Playqueue = Playqueue;

  $scope.pause = Player.pause;
  $scope.next = Player.next;
  $scope.previous = Player.previous;
  $scope.Player = Player;
  $scope.shuffle = Playqueue.shuffle;
})

.controller("SidebarCtrl", function($scope, Playqueue) {
  $scope.Playqueue = Playqueue;
});