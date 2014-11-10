angular.module("wave.services")
.service("SoundManager", function ($window){
  return $window.soundManager;
})
.service("Player", function(SoundManager, Playqueue) {
 
  var player = {};

  player.playing = false;

  player.play = function() {
    var id = Playqueue.current().soundcloud_id;
    if(!SoundManager.getSoundById(id)) {
      createSound(id);
    }
    soundManager.play(id);
    player.playing = true;
  };

  player.pause = function() {
    SoundManager.pause(Playqueue.current().soundcloud_id);
    player.playing = false;
  };

  player.stop = function() {
    SoundManager.stop(Playqueue.current().soundcloud_id);
    player.playing = false;
  };

  player.next = function() {
    var oldId = Playqueue.current().soundcloud_id;
    var next = Playqueue.next();
    createSound(next.soundcloud_id);
    SoundManager.stop(oldId);
    player.play();
  };

  player.previous = function() {
    var oldId = Playqueue.current().soundcloud_id;
    var next = Playqueue.previous();
    createSound(next.soundcloud_id);
    SoundManager.stop(oldId);
    player.play();
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
  var Playqueue = {

    currentIndex: 0,
    isShuffled: false,

    queue: JSON.parse(localStorage.playqueue) || [],
    shuffledQueue: JSON.parse(localStorage.shuffledPlayqueue) || [],

    get: function() {
      if(!Playqueue.isShuffled) {
        return Playqueue.queue;
      } else {
        return Playqueue.shuffledQueue;
      }
    },

    set: function(pq) {
      if(!Playqueue.isShuffled) {
        localStorage.playqueue = JSON.stringify(pq);
        Playqueue.queue = pq;
      } else {
        localStorage.shuffledPlayqueue = JSON.stringify(pq);
        Playqueue.shuffledPlayqueue = pq;
      }
    },

    add: function(songs) {
      var currentQueue = Playqueue.get();
      var queue = currentQueue.concat(songs);
      Playqueue.set(queue);
    },

    clear: function() {
      Playqueue.set([]);
    },

    current: function() {
      return Playqueue.get()[Playqueue.currentIndex];
    },

    next: function() {
      Playqueue.currentIndex += 1;
      return Playqueue.current();
    },

    append: function(track) {
      var queue = Playqueue.get();
      queue.push(track);
      Playqueue.set(queue);
    },

    previous: function() {
      if(Playqueue.currentIndex != 0) {
        Playqueue.currentIndex -= 1;
      }
      return Playqueue.current();
    },

    insert: function(track) {
      var index = Playqueue.currentIndex;
      var queue = Playqueue.get();

      queue.splice(index, 0, track);
      Playqueue.set(queue);
    },

    jumpTo: function(track) {
      var pq = Playqueue.get();
      var pqTrack = _.find(pq, function(t) {
        return track.track_id == t.track_id
      });
      var index = _.indexOf(pq, pqTrack);
      console.log(index);
      Playqueue.currentIndex = index;
    },

    shuffle: function() {
      var pq = Playqueue.get();
      Playqueue.isShuffled = !Playqueue.isShuffled;
      if(Playqueue.isShuffled) {
        var shuffledPlayqueue = _.shuffle(pq);
        Playqueue.set(shuffledPlayqueue);
      }
    }
  };

  return Playqueue;
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