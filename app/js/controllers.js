angular.module('wave.controllers')
.controller('RootCtrl', function($scope, $location, Users) {

})
.controller("IndexCtrl", function($scope, $location, Users) {
  SC.initialize({
    client_id: clientId,
    redirect_uri: "http://localhost:8080/callback.html"
  });

  $scope.auth = function() {
    SC.connect(function() {
      SC.get('/me', function(me) { 
        var promise = Users.auth(me.username, me.id, SC.accessToken());
        promise.then(function(data) {
          Users.setCurrent(data);
          $location.path("/profile");
        });
      });
    });
  };
  console.log("we be indexin' y'all");
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

.controller("SidebarCtrl", function($scope, Playqueue, Player) {
  $scope.Playqueue = Playqueue;

  $scope.jump = function(song) {
    Player.stop();
    Playqueue.jumpTo(song);
    Player.play();
  }
})

.controller("AuthCtrl", function($scope) {

});