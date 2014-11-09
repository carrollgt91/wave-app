angular.module("wave.services")
.service("SoundManager", function ($window){
  return $window.soundManager;
})
.service("Player", function(SoundManager) {
 
  var player = {};

  player.play = function() {
    soundManager.play('track_124907822');
  };

  player.pause = function() {
    soundManager.pause('track_124907822');
  };

  player.next = function() {

  };

  player.previous = function() {

  };

  player.setVolume = function(volume) {

  };

  player.toggleMute = function() {

  };

  SoundManager.createSound({
        
    id: 'track_124907822',
    url: 'https://api.soundcloud.com/tracks/124907822/stream?client_id=251c9152fb3757d609504877ed494ae0',
    
    onplay: function() {

    },

    onresume: function() {
      
    },
    
    onpause: function() {

    },
    
    onfinish: function() {
      nextTrack();
    }
    
  });
  return player;
})

.service("Playlists", function(){

  return {
    get: function(id){
      var client = 'stream?client_id=251c9152fb3757d609504877ed494ae0';
      var list = {};
      list = {
        id: id,
        name: 'listsomething',
        tracks: [
          {id:153711334,
          uri: 'https://api.soundcloud.com/tracks/153711334/' + client,
          artwork_url: 'https://i1.sndcdn.com/artworks-000081971395-58lrfq-large.jpg',
          username: 'FFRR',
          title: 'Oliver Heldens X Becky Hill - Gecko (Overdrive) [Matrix & Futurebound Remix]',
          pos: 2},
          {id:167105851,
          uri: 'https://api.soundcloud.com/tracks/167105851/' + client,
          artwork_url: 'https://i1.sndcdn.com/artworks-000092260487-8bt3ki-large.jpg',
          username: 'ANDY C ram',
          title: 'Andy C & Fiora "Heartbeat Loud"',
          pos: 0},
          {id:158651183,
          uri: 'https://api.soundcloud.com/tracks/158651183/' + client,
          artwork_url: 'https://i1.sndcdn.com/artworks-000085143236-ag9gm0-large.jpg',
          username: 'Wilkinson UK',
          title: 'Wilkinson - Dirty Love (ft. Talay Riley)',
          pos: 4},
          {id:175117569,
          uri: 'https://api.soundcloud.com/tracks/175117569/' + client,
          artwork_url: 'https://i1.sndcdn.com/artworks-000095971724-krdhet-large.jpg',
          username: '- therapy -',
          title: 'EZRA x DUNLOP - NOT ENOUGH Feat. Tyson',
          pos: 1}]
      }
      list.tracks = list.tracks.sort(function(a, b){
        return a.pos-b.pos
      });
      return list;
    }
  }
})

.service("Playqueue", function(Playlists){
  return {
    currentTrack: function(){
      var all = Playlists.get(0).tracks;
      return all[0];
    },
    allTracks: function(){
      return Playlists.get(0).tracks;
    }
  }
})

.service("Users", function($http, $q){
  var users = {};
  var deferred = $q.defer();

  users.current = function() {
    JSON.parse(localStorage.getItem("currentUser"));
  };

  users. setCurrent = function(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  users.create = function(username, id) {
    $http.post(rootUrl + "/users?format=json", {username: username, soundcloud_id: id}).success(function(data, status, headers, config) {
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log("error create user: " + data.body);
    })
    return deferred.promise;
  };
  return users;
})