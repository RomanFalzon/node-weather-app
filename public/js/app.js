(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	$(window).load(function(){

	});
	var loc = window.location.href; // returns the full URL
  	if(/about/.test(loc)) {
    $('#about').addClass('current-menu-item');
  	}else if(/help/.test(loc)){
		$('#help').addClass('current-menu-item');
	  }else if(/weather/.test(loc)){
		$('#weather').addClass('current-menu-item');
	  }else if(/ /.loc){
		$('#homepage').addClass('current-menu-item');
	  }else{
		
	  }

})(jQuery, document, window);