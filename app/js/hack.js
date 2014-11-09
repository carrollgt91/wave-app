$( document ).ready(function() {
	$('.side-icon').click(function(){
		$('.sidebar-sub').toggleClass("open");
	});
	$('.splash-btn').click(function(){
		$('#splash').hide();
		$('#app').show();
	});
});