angular.module("wave.services")
.service("SoundManager", function ($window){
  return $window.soundManager;
})
.service("Player", function(SoundManager, Playqueue) {
 
  var player = {};

  player.play = function() {
    var id = Playqueue.current().soundcloud_id;
    if(!SoundManager.getSoundById(id)) {
      createSound(id);
    }
    soundManager.play(id);
  };

  player.pause = function() {
    SoundManager.pause(Playqueue.current().soundcloud_id);
  };

  player.stop = function() {
    SoundManager.stop(Playqueue.current().soundcloud_id);
  };

  player.next = function() {
    var oldId = Playqueue.current().soundcloud_id;
    var next = Playqueue.next();
    createSound(next.soundcloud_id);
    SoundManager.stop(oldId);
    player.play();
  };

  player.previous = function() {

  };

  player.setVolume = function(volume) {

  };

  player.toggleMute = function() {

  };

  var createSound = function(id) {
    SoundManager.createSound({  
      id: id,
      url: 'https://api.soundcloud.com/tracks/'+ id + '/stream?client_id=' + clientId,
      
      onplay: function() {

      },

      onresume: function() {
        
      },
      
      onpause: function() {

      },
      
      onfinish: function() {
        player.next();
      }
    });
  };
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
  var playqueue = {

    currentIndex: 0,

    get: function() {
      return JSON.parse(localStorage.playqueue);
    },

    set: function(playqueue) {
      localStorage.playqueue = JSON.stringify(playqueue);
    },

    add: function(songs) {
      var currentQueue = playqueue.get();
      var queue = currentQueue.concat(songs);
      playqueue.set(queue);
    },

    clear: function() {
      playqueue.set([]);
    },

    current: function() {
      return playqueue.get()[playqueue.currentIndex];
    },

    next: function() {
      playqueue.currentIndex += 1;
      return playqueue.current();
    },

    append: function(track) {

    },

    previous: function() {

    },

    insert: function(track) {
      var index = playqueue.currentIndex;
      var queue = playqueue.get();

      queue.splice(index, 0, track);
      playqueue.set(queue);
    },

    jumpTo: function(track) {
      var pq = playqueue.get();
      var pqTrack = _.find(pq, function(t) {
        return track.track_id == t.track_id
      });
      var index = _.indexOf(pq, pqTrack);
      console.log(index);
      playqueue.currentIndex = index;
    }
  };

  return playqueue;
})

.service("Users", function($http, $q){
  var users = {};
  

  users.current = function() {
    return JSON.parse(localStorage.getItem("currentUser"));
  };

  users.getPlayqueue = function() {
    var deferred = $q.defer();

    $http.get(rootUrl + "/users/" + users.current().user_id + "/playqueue?format=json").success(function(data, status, headers, config) {
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log("error get playqueue user: " + data.body);
    })
    return deferred.promise;
  };

  users.getLikes = function() {
    var deferred = $q.defer();

    $http.get(rootUrl + "/users/" + users.current().user_id + "/tracks?format=json").success(function(data, status, headers, config) {
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log("error get playqueue user: " + data.body);
    })
    return deferred.promise;
  };

  users.setCurrent = function(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  users.create = function(username, id) {
    var deferred = $q.defer();

    $http.post(rootUrl + "/users?format=json", {username: username, soundcloud_id: id}).success(function(data, status, headers, config) {
      deferred.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log("error create user: " + data.body);
    })
    return deferred.promise;
  };
  return users;
})