$( document ).ready(function() {
	$('.expand-sidebar').click(function(){
		$('.sidebar-sub').toggleClass("open");
	});
	$('.splash-btn').click(function(){
		$('#splash').hide();
		$('#app').show();
	});
	$('.logo').click(function(){
		$('.app').hide();
		$('#splash').show();
	});
});