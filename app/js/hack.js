$( document ).ready(function() {
	$('.expand-sidebar').click(function(){
		$('.sidebar-sub').toggleClass("open");
	});
	$('.splash-btn').click(function(){
		$('#splash').hide();
		$('.app').show();
    $('.app2').show();
	});
	$('.logo').click(function(){
		$('.app').hide();
    $('.app2').hide();
		$('#splash').show();
	});
});