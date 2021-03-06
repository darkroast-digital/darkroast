jQuery(document).ready(function($) {
	/* Slider */
	var slider_resize;
	$(window).resize(function(event) {
		clearTimeout( slider_resize );
		slider_resize = setTimeout(function(){
			$('.scene').each(function(index, el) {
				var parent = $(this);
				var h_lg = parseFloat( parent.data('height-lg') ); if( typeof( h_lg ) == 'undefined') h_lg = 500;
					if (parent.data('height-lg') =='100vh'){h_lg = "100vh";}
				var h_sm = parseFloat( parent.data('height-sm') ); if( typeof( h_sm ) == 'undefined') h_sm = 350;
					if (parent.data('height-sm') =='100vh'){h_sm = "100vh";}
				var h_xs = parseFloat( parent.data('height-xs') ); if( typeof( h_xs ) == 'undefined') h_xs = 250;
					if (parent.data('height-xs') =='100vh'){h_xs = "100vh";}

				if( window.matchMedia("(min-width: 240px)").matches ){
					parent.css('height', h_xs);
				}
				if( window.matchMedia("(min-width: 768px)").matches ){
					parent.css('height', h_sm);
				}
				if( window.matchMedia("(min-width: 1200px)").matches ){
					parent.css('height', h_lg);
				}

				$('.layer', parent).each(function(index, el) {
					var d_w = $('img', this).data('width');
					var d_t = $('img', this).data('top');
					var d_l = $('img', this).data('left');
					var d_r = $('img', this).data('right');
					var d_b = $('img', this).data('bottom');

					$('img', this).css({
						'width': d_w,
						'top' : d_t,
						'left' : d_l,
						'right': d_r,
						'bottom': d_b
					});
				});

				var scene = parent.get(0);
				var parallax = new Parallax(scene, {
			    	relativeInput: true,
			 	});
			});
		}, 10);
		
	}).resize();
	
	/*	Revolution */
	$('.revo-slider').each(function(index, el) {
		var startheight = $(this).data("startheight");
			if (startheight ==='100vh') {
				startheight = $(window).height();
			}
			if (startheight ==='100vh_2') {
				startheight = $(window).height() - 120;
			}
			if( typeof(startheight) =='undefined') startheight=750;

		var revapi = $(this).revolution({
			delay:9000,
			startwidth:1170,
			startheight:startheight,
			hideThumbs:10,
			fullWidth:"on",
			fullScreen:"off",				// bullet, thumb, none
					navigationArrows:"nextto",
					navigationStyle:"square",
			fullScreenOffsetContainer: "",
			parallax:"on",

		});
	});
	

});