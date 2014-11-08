angular.module("wave.services")
.service("SoundManager", function ($window){
  return $window.soundManager;
})
.service("Player", function(SoundManager) {
  var player = {};

  player.play = function() {

  };

  player.pause = function() {

  };

  player.next = function() {

  };

  player.previous = function() {

  };

  player.setVolume = function(volume) {

  };

  player.toggleMute = function() {

  };

  return player;
});