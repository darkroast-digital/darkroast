jQuery(document).ready(function($) {
	$('.main-menu').each(function(index, el) {
		var t = $(this);
		var menu = $('ul.menu, ul.onepage', t);
		var width_mobile = parseFloat( t.data('width-mobile') );
			if( typeof( width_mobile ) == 'undefined' ){ width_mobile = 800; }

		menu.slimmenu({
		    resizeWidth: width_mobile,
		    collapserTitle: '',
		    animSpeed: 'medium',
		    easingEffect: null,
		    indentChildren: false,
		    childrenIndenter: '&nbsp;'
		});
		$('.collapse-button', t).unbind();	

		t.parent().find('.collapse-button-open').click(function(event) {
			t.toggleClass('menu_actived');
			console.log('a');
		});

		$('.collapse-button-close', t).click(function(event) {
			t.removeClass('menu_actived');
		});

		if( $(this).hasClass('menu-mega') ){
			var d_w = $(this).data('width-mega-menu');
			$('.submenu', this).addClass(d_w);
		}
	});

});