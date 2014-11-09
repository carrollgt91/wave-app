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
      return{
        id: id,
        name: 'something',
        tracks: [
          {id:153711334,
          url: 'https://api.soundcloud.com/tracks/153711334/' + client,
          art: 'https://i1.sndcdn.com/artworks-000081971395-58lrfq-large.jpg',
          artist: 'FFRR',
          title: 'Oliver Heldens X Becky Hill - Gecko (Overdrive) [Matrix & Futurebound Remix]',
          pos: 2},
          {id:167105851,
          url: 'https://api.soundcloud.com/tracks/167105851/' + client,
          art: 'https://i1.sndcdn.com/artworks-000092260487-8bt3ki-large.jpg',
          artist: 'ANDY C ram',
          title: 'Andy C & Fiora "Heartbeat Loud"',
          pos: 0},
          {id:158651183,
          url: 'https://api.soundcloud.com/tracks/158651183/' + client,
          art: 'https://i1.sndcdn.com/artworks-000085143236-ag9gm0-large.jpg',
          artist: 'Wilkinson UK',
          title: 'Wilkinson - Dirty Love (ft. Talay Riley)',
          pos: 4},
          {id:175117569,
          url: 'https://api.soundcloud.com/tracks/175117569/' + client,
          art: 'https://i1.sndcdn.com/artworks-000095971724-krdhet-large.jpg',
          artist: '- therapy -',
          title: 'EZRA x DUNLOP - NOT ENOUGH Feat. Tyson',
          pos: 1}]
      }
    }
  }
});