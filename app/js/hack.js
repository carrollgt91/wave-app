$( document ).ready(function() {
	$('.side-icon').click(function(){
		$('.sidebar-sub').toggleClass("open");
	});
});


soundManager.createSound({
				
	id: 'track_' + '124907822',
	url: 'https://api.soundcloud.com/tracks/124907822/stream?client_id=251c9152fb3757d609504877ed494ae0/',
	
	onplay: function() {
		
		$('.player').addClass('playing');
		
		$('.title').text(track.title);
		
	},

	onresume: function() {
		
		$('.player').addClass('playing');
		
	},
	
	onpause: function() {
		$('.player').removeClass('playing');
	},
	
	onfinish: function() {
		nextTrack();
	}
	
});