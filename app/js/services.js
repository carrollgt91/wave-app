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
      return{
        id: id,
        name: 'something',
        tracks: ['blah1', 'blah2', 'blah3']
      }
    }
  }
});