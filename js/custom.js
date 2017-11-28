$(document).ready(function () {
	"use strict"
	/*-------- PRELOADER ----------*/
	setTimeout(function () {
		$('.page-preloader').removeClass('open');
	}, 500);

	/*------------ TOGGLE SEARCH FORM---------*/
	if ($('.form-search a').length) {
		$('.form-search a').click(function (event) {
			if ($('.header-search-content').length) {
				$('.header-search-content').toggleClass('header-visible');
			}
			return false;
		});
		$('#close-search').click(function (event) {
			$('.header-search-content').removeClass('header-visible');
			return false;
		});
	}

	/* ----------- Menu Onepage ---------------*/
	if ($('.menu-onepage').length) {
		$('.menu-onepage nav ul').onePageNav({
			currentClass: 'active'
		});
	}


	/*-------------- HEADER STICKY ---------------*/
	var header_next_margin = 0; // variable save margin of the next element

	$(window).scroll(function (event) {
		var body = $('body');
		var container_header = $('.container-header');
		if ($('body').hasClass('has-header-sticky')) {
			if ($(window).scrollTop() > 0) {
				if (!body.hasClass('header-sticky')) {
					body.addClass('header-sticky');
					var c_h = container_header.height();
					header_next_margin = container_header.next().css('margin');
					//container_header.next().css('margin-top', c_h + 'px');
				}
			} else {
				body.removeClass('header-sticky');
				//container_header.next().css('margin-top', header_next_margin);
			}
		}

	}).scroll();
	/*------------------- DEMO OPTIONS -----------------------*/
	if ($('.open-demo-option').length) {
		$('<style id="demo-color" type="text/css"></style>').appendTo(document.head);
		$('.open-demo-option').click(function (event) {
			$(this).parents('.chi-demo-options').toggleClass('open');

			if (!$(document.body).hasClass("get_demoed_color")) {
				var color_style_el = $("#demo-color");

				get_css_ajax("css/sliders/slider.css", color_style_el);
				get_css_ajax("css/headers/header.css", color_style_el);
				get_css_ajax("css/buttons/button.css", color_style_el);
				get_css_ajax("css/sliders/slider.css", color_style_el);
				get_css_ajax("css/style.css", color_style_el);
				get_css_ajax("css/responsive.css", color_style_el);

				$(document.body).addClass("get_demoed_color");
			}

			return false;
		});

		if (localStorage.getItem("demo_css") !== null) {
			$("#demo-color").html(localStorage.getItem("demo_css"));
			$(document.body).addClass("get_demoed_color");
		}
	}

	function get_css_ajax(path, color_style_el) {
		$.ajax({
			url: path,
			dataType: 'text',
			success: function (data) {
				data = data.replace(/\.\.\//g, "");
				color_style_el.append(data);
			}
		});
	}
	if ($('.chi-demo-options').length) {
		var options = $('.chi-demo-options');

		$('a[href="#to-layout-wide"]', options).click(function (event) {
			init_all();
			$('a', options).removeClass('actived');
			$(this).addClass('actived');
			$('body').removeClass('page-boxed');

			return false;
		});
		$('a[href="#to-layout-boxed"]', options).click(function (event) {
			init_all();
			$('a', options).removeClass('actived');
			$(this).addClass('actived');
			$('body').addClass('page-boxed');
			return false;
		});
	}
	$(".demo-background-pattern .styleswitch").on("click", function (e) {
		var bgr = ($(this).css("background-image"));
		$(document.body).css("background-image", bgr);
		$(document.body).addClass("bgr-pattern");
		$(document.body).removeClass("bgr-img");
	});
	$(".demo-background-image .styleswitch").on("click", function (e) {
		var bgr = ($(this).css("background-image"));
		$(document.body).css("background-image", bgr);
		$(document.body).addClass("bgr-img");
		$(document.body).removeClass("bgr-pattern");
	});
	$(".demo-color .styleswitch").on("click", function () {
		//var demo_css = localStorage.getItem("demo_css");
		var demo_css = $("#demo-color").html();

		var choose = getBgColorHex($(this));

		var current_demo_color = "#0e7b9e";

		if (localStorage.getItem("current_demo_color") !== null) {
			current_demo_color = localStorage.getItem("current_demo_color");
		}

		var re = new RegExp(current_demo_color, "g");

		demo_css = demo_css.replace(re, choose);

		$("#demo-color").html(demo_css);

		localStorage.setItem("current_demo_color", choose);
		localStorage.setItem("demo_css", demo_css);

		return false;
	});
	$(".reset_color").on("click", function () {
		localStorage.removeItem("demo_css");
		localStorage.removeItem("current_demo_color");
		location.reload();
	});

	function getBgColorHex(elem) {
		var color = elem.css('background-color')
		var hex;
		if (color.indexOf('#') > -1) {
			//for IE
			hex = color;
		} else {
			var rgb = color.match(/\d+/g);
			hex = '#' + ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
		}
		return hex;
	}

	/*---------------------- INITIAL ALL OWL CAROUSEL & ISOTOPE -------------------*/
	function init_all() {
		if ($(this).owlCarousel !== undefined) {
			$('.slider-list').each(function (index, el) {
				var t = $(this);
				var parent = $(this).closest('.section-slider-list');
				var owl;
				var items = $(this).data("items-992");
				if (items === undefined) {
					items = 5;
				}
				t.imagesLoaded(function () {
					owl = t.owlCarousel({
						loop: true,
						nav: false,
						dots: false,
						responsive: {
							0: {
								items: 1,
							},
							480: {
								items: 2,
							},
							768: {
								items: 3,
							},
							992: {
								items: items,
							}
						},
					})
				});
				$('.control-next', parent).click(function () {
					owl.trigger('next.owl.carousel');
					return false;
				})
				$('.control-prev', parent).click(function () {
					owl.trigger('prev.owl.carousel');
					return false;
				})
			});

			var resize_slider = null;
			$(window).resize(function (event) {
				clearTimeout(resize_slider);
				resize_slider = setTimeout(function () {
					$('.chi-slider-carousel').each(function (index, el) {
						var h_desktop = $(this).data('height-desktop');
						var h_tablet = $(this).data('height-tablet');
						var h_mobile = $(this).data('height-mobile');
						var dots = $(this).data('dots');
						if (typeof (dots) == 'undefined') dots = false;

						var t = $(this);
						if (window.matchMedia("(min-width: 1200px)").matches) {
							$('.item', this).css('height', h_desktop);
						} else {
							if (window.matchMedia("(min-width: 768px)").matches) {
								$('.item', this).css('height', h_tablet);
							} else {
								if (window.matchMedia("(min-width: 240px)").matches) {
									$('.item', this).css('height', h_mobile);
								}
							}
						}
						$('.item-per-page .total', t).text(('0' + ($('.item', this).length)).slice(-2));

						var slider = $('.owl-carousel', this).owlCarousel({
							items: 1,
							autoplay: true,
							dots: dots,
							animateOut: 'fadeOut',
							animateIn: 'fadeIn',
						});
						slider.on('changed.owl.carousel', function (event) {
							var current = parseInt(event.item.index);
							var total = parseInt(event.item.count);

							$('.item-per-page .current', t).text(('0' + (current + 1)).slice(-2));
							$('.item-per-page .total', t).text(('0' + total).slice(-2));
						});
						$('.chi-control .next', t).click(function () {
							slider.trigger('next.owl.carousel');
							return false;
						});
						$('.chi-control .prev', t).click(function () {
							slider.trigger('prev.owl.carousel');
							return false;
						});
					});
				}, 100);
			}).resize();

			$(".carousel-images").each(function () {
				var t = $(this);
				var parent = $(this).closest('.section-our-work');
				if ($(this).data("items") !== undefined) {
					var items = $(this).data("items");
				} else {
					var items = 5;
				}
				if ($(this).data("margin") !== undefined) {
					var margin = $(this).data("margin");
				} else {
					var margin = 10;
				}
				t.imagesLoaded(function () {
					var owl = t.owlCarousel({
						loop: true,
						items: items,
						nav: false,
						dots: false,
						margin: margin,
						responsive: {
							0: {
								items: 1,
							},
							480: {
								items: 1,
							},
							768: {
								items: items,
							}
						}
					});
				});

				$('.control-next', parent).click(function () {
					t.trigger('next.owl.carousel');
					return false;
				})
				$('.control-prev', parent).click(function () {
					t.trigger('prev.owl.carousel');
					return false;
				})
			});
			$(".we-make-your").each(function () {
				var h = $(this);
				var t = $(this).find(".carousel");
				if (t.data('nav') == "1") {
					var nav = true;
				} else {
					var nav = false;
				}
				if (t.data('dots') == "1") {
					var dots = true;
				} else {
					var dots = false;
				}

				t.owlCarousel({
					loop: true,
					items: 1,
					singleItem: true,
					nav: nav,
					dots: dots,
					margin: 0,
					responsive: {
						0: {
							items: 1,
						},
						480: {
							items: 1,
						},
						768: {
							items: 1,
						},
						992: {
							items: 1,
						}
					}
				});
				t.on('translated.owl.carousel', function (event) {
					var index = event.item.index - 1;
					if ($(".carousel-navigation").length) {
						$(".carousel-navigation li", h).removeClass("active");
						$(".carousel-navigation li:nth-child(" + (index) + ")", h).addClass("active");
					}
					if ($(".carousel-nav-thumb").length) {
						$(".carousel-nav-thumb .item", h).removeClass("active");
						$(".carousel-nav-thumb .item:nth-child(" + (index) + ")", h).addClass("active");
					}

				});
				$(this).find('.control-next').click(function () {
					t.trigger('next.owl.carousel');
					return false;
				});
				$(this).find('.control-prev').click(function () {
					t.trigger('prev.owl.carousel');
					return false;
				});
				// customize navigation
				$(this).find(".carousel-navigation li ").each(function () {
					$(this).on("click", function () {
						t.trigger("to.owl.carousel", [$(this).index(), 500, true]);
						/*$(this).closest('.carousel-navigation').find("li").removeClass("active");
						$(this).toggleClass("active");*/
						return false;
					});
				});
				$(this).find(".carousel-nav-thumb .item ").each(function () {
					$(this).on("click", function () {
						t.trigger("to.owl.carousel", [$(this).index(), 500, true]);
						/*$(this).closest('.carousel-navigation').find("li").removeClass("active");
						$(this).toggleClass("active");*/
						return false;
					});
				});
			});
			$('.slider-client-say').each(function (index, el) {
				var t = $(this);
				var parent = $(this).closest('.section-client-say-list')
				var owl = t.imagesLoaded(function () {
					t.owlCarousel({
						loop: true,
						items: 1,
						nav: false,
						dots: true
					})
				});
				$('.control-next', parent).click(function () {
					t.trigger('next.owl.carousel');
					return false;
				});
				$('.control-prev', parent).click(function () {
					t.trigger('prev.owl.carousel');
					return false;
				});
			});
			$(".slider-client-say-vertical").each(function () {
				var t = $(this);
				var parent = $(this).closest('.section');
				t.owlCarousel({
					loop: true,
					items: 1,
					nav: false,
					dots: false,
					touchDrag: false,
					mouseDrag: false,
					animateOut: 'fadeOut',
					animateIn: 'fadeIn'
				});
				$('.control-next', parent).click(function () {
					t.trigger('next.owl.carousel');
					return false;
				});
				$('.control-prev', parent).click(function () {
					t.trigger('prev.owl.carousel');
					return false;
				});
			});
			$('.products-carousel').each(function (index, el) {
				var t = $(this);
				var parent = $(this).closest('.section-products-carousel');
				var owl;
				var items = $(this).data("items-992");
				if (items === undefined) {
					items = 5;
				}
				t.imagesLoaded(function () {
					owl = t.owlCarousel({
						loop: true,
						items: items,
						nav: false,
						dots: false,
						margin: 30,
						responsive: {
							0: {
								items: 1,
							},
							480: {
								items: 1,
							},
							768: {
								items: 1,
							},
							992: {
								items: items,
							}
						},
					})
				});
				$('.control-next', parent).click(function () {
					owl.trigger('next.owl.carousel');
					return false;
				})
				$('.control-prev', parent).click(function () {
					owl.trigger('prev.owl.carousel');
					return false;
				})
			});
			$('.home-slide-container').each(function (index, el) {
				if ($(window).width() < 768) {
					return false;
				}

				var t = $(this);
				var parent = $(this).closest('.home-slide');
				var owl;
				var items = $(this).data("items-992");
				if (items === undefined) {
					items = 5;
				}
				t.imagesLoaded(function () {
					owl = t.owlCarousel({
						loop: true,
						nav: false,
						dots: false,
						margin: 0,
						autoheight: true,
						responsive: {
							0: {
								items: 1,
							},
							480: {
								items: 1,
							},
							768: {
								items: 1,
							},
							992: {
								items: items,
							}
						},
					})
				});
				$('.home-slide-control .control-next', parent).click(function () {
					owl.trigger('next.owl.carousel');
					return false;
				})
				$('.home-slide-control .control-prev', parent).click(function () {
					owl.trigger('prev.owl.carousel');
					return false;
				});
			});

			$("#owl-example").owlCarousel({
				navigation: true,
				slideSpeed: 300,
				paginationSpeed: 400,
				items: 4,
				pagination: false,
				rewindSpeed: 500
			});
		}

		function set_isotope(filter, $el) {
			var $isotope = $el.isotope({
				itemSelector: '.isotope-item',
				layoutMode: 'masonry',
				filter: filter
			});
		}

		function set_masorny(filter, $el) {

			var $masorny = $el.isotope({
				itemSelector: '.item',
				masonry: {
					columnWidth: '.item'
				},
				percentPosition: true,
				filter: filter
			});
		}
		if ($(this).isotope !== undefined) {
			if ($('.section-our-work').length) {
				$('.section-our-work').each(function (index, el) {
					var t = $(this);
					$('.section-our-work').imagesLoaded(function () {
						var filter = $('.menu-filter li.active a', t).data('filter');
						if (typeof (filter) == 'undefined') {
							filter = '*';
						}
						set_isotope(filter, $('.container-isotope', t));
						$('.menu-filter li a', t).click(function (event) {
							$('.menu-filter li', t).removeClass('active');
							$(this).parent().addClass('active');
							var filter = $('.menu-filter li.active a', t).data('filter');
							if (typeof (filter) == 'undefined') {
								filter = '*';
							}
							set_isotope(filter, $('.container-isotope', t));
							return false;
						});
					});
					$(".next-isotope", t).on("click", function (e) {
						e.preventDefault();
						$.ajax({
							url: "ajax/masonry_hover_style2_next_page.html",
							success: function (result) {
								alert("incomplete");
							}
						});
						return false;
					});
				});
			}
			if ($('.section-our-project').length) {
				$('.section-our-project').each(function (index, el) {
					var t = $(this);
					var content = $(".project-content", t);
					$('.section-our-project').imagesLoaded(function () {
						var filter = $('.menu-filter li.active a', t).data('filter');
						if (typeof (filter) == 'undefined') {
							filter = '*';
						}
						var m = set_masorny(filter, $(".project-content"));
						var data = content.data("data");
						content.prepend(data);
					});
					$('.menu-filter li a', t).click(function (event) {
						$('.menu-filter li', t).removeClass('active');
						$(this).parent().addClass('active');
						var filter = $(this).data('filter');
						if (typeof (filter) == 'undefined') {
							filter = '*';
						}
						set_masorny(filter, $(".project-content", t));
						return false;
					});

					$(".view_more", t).on("click", function (e) {
						e.preventDefault();
						$.ajax({
							url: "ajax/masonry_default_load_more.html",
							success: function (result) {
								var newItems = $(result).appendTo('.project-content');
								content.isotope('insert', newItems);
							}
						});
						return false;
					});
					$(".next-isotope", t).on("click", function (e) {
						e.preventDefault();
						$.ajax({
							url: "ajax/masonry_hover_style2_next_page.html",
							success: function (result) {
								alert("incomplete");
							}
						});
						return false;
					});
				});
			}
		} else {
			console.log("isotope is not exits");
		}
	}
	init_all();
	/*------------- REMOVE CLASS WHEN RESIZE THE BROWSER ---------------*/
	/*
	 * Use like a atrribute in html
	 * data-remove-class - class you can remove
	 * data-remove-width - size of width - Example: (max-width: 768px)
	 */
	var remove_class_resize;

	$(window).resize(function (event) {
		clearTimeout(remove_class_resize);
		remove_class_resize = setTimeout(function () {
			$('[data-remove-class]').each(function (index, el) {
				var t = $(this);
				var _class = t.data('remove-class');
				if (typeof (_class) == 'undefined') {
					_class = '';
				}
				var _media = t.data('remove-width');
				if (typeof (_media) == 'undefined') {
					_media = ''
				}

				if (_media != '' && _class != '') {
					if (window.matchMedia("" + _media + "").matches) {
						t.removeClass(_class);
					} else {
						if (!t.hasClass(_class)) {
							t.addClass(_class);
						}
					}
				}
			});
		}, 0);
	}).resize();



	/*------------------------ PROGRESS --------------------------*/
	$(window).scroll(function (event) {
		$('.progress-wrapper').each(function (index, el) {
			var t = $(this);
			if (!t.hasClass('loaded')) {
				if (t.offset().top - $(window).scrollTop() <= $(window).height() + 200 / 2) {
					if (!t.hasClass('loaded')) {
						t.addClass('loaded');
					}
					$('.progress-item', t).each(function (index, el) {
						var item = $(this);
						var percent = parseFloat(item.data('percent'));
						var speed = parseFloat(item.data('speed'));
						var style = item.data('style');

						$('.progress-percent', item).countTo({
							from: 0,
							to: percent,
							speed: speed,
							refreshInterval: 60,
							onUpdate: function (value) {
								$('.progress-run', item).css(style, value + '%');
								$(this).text(parseInt(value) + '%');
							},
						});
					});
				}
			}

		});

		$(".funfact").each(function (index, el) {
			var t = $(this);
			if (!t.hasClass('loaded')) {
				if (t.offset().top - $(window).scrollTop() <= $(window).height() + 200 / 2) {
					if (!t.hasClass('loaded')) {
						t.addClass('loaded');
					}
					$(".number", t).each(function (index, el) {
						var percent = parseFloat($(this).data('percent'));
						var speed = parseFloat($(this).data('speed'));
						if (!percent) percent = parseFloat($(this).text());
						if (!speed) speed = 1000;
						$(this).countTo({
							from: 0,
							to: percent,
							speed: speed,
						});
					});
				}
			}

		});
	});

	/* Vertical align element */

	/*var t_resize;
	$(window).resize(function(event) {
	 	clearTimeout( t_resize );
	 	t_resize = setTimeout(function(){
	 
		 	$('.valign-container').each(function(index, el) {
		 		var c_h = $(this).height();
		 		var d_w = $(this).data('align');
		 		$('.valign-item', this).each(function(index, el) {
		 			var d_w = $(this).data('width');

		 			if( typeof( d_w ) == 'undefined' ){
		 				d_w = 768;
		 			}

		 			var d_a = $(this).data('align');

		 			if( typeof( d_a ) == 'undefined' ){
		 				d_a = 'center';
		 			}

		 			var d_xw = $(this).data('extra-width');
		 			if( typeof( d_xw ) == 'undefined' ){
		 				d_xw = 0;
		 			}

					var i_h = $(this).height();

		 			if( d_a == 'center' ){
		 				i_h = (c_h - i_h) / 2;
		 			}

		 			if( d_a == 'top' ){
		 				i_h = 0;
		 			}

		 			if( d_a == 'bottom' ){
		 				i_h = c_h - i_h;
		 			}

		 			i_h += parseFloat( d_xw );

		 			if( $(window).width() >= parseInt( d_w ) ){
		 				$(this).css('margin-top', i_h+'px');
		 			}else{
		 				$(this).css('margin-top', 'auto');
		 			}
		 		});
		 	});
	 	}, 0);
	}).resize();*/


	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true,
		callback: function (box) {

		},
		scrollContainer: null
	});
	wow.init($('.content-wrap'));


	$(".feature_accordion").each(function (index, el) {
		$(this).click(function () {
			$(this).stop(true, false).toggleClass('opened').children(".text").slideToggle();
		});
	});
	if ($(this).prettyPhoto !== undefined) {
		$("a").each(function () {
			if ($(this).data("rel") !== undefined) {
				$(this).attr("rel", $(this).data("rel"));
			}
		});
		$("a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast',
			/* fast/slow/normal */
			slideshow: 5000,
			/* false OR interval time in ms */
			autoplay_slideshow: false,
			/* true/false */
			opacity: 0.80,
			/* Value between 0 and 1 */
			show_title: true,
			/* true/false */
			allow_resize: true,
			/* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/',
			/* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default',
			/* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 20,
			/* The padding on each side of the picture */
			hideflash: false,
			/* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque',
			/* Set the flash wmode attribute */
			autoplay: true,
			/* Automatically start videos: True/False */
			modal: false,
			/* If set to true, only the close button will close the window */
			deeplinking: true,
			/* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true,
			/* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true,
			/* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function () {},
			/* Called everytime an item is shown/changed */
			callback: function () {},
			/* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
			image_markup: '<img id="fullResImage" src="{path}" />',
			flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
			quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
			inline_markup: '<div class="pp_inline">{content}</div>',
			custom_markup: '',
			social_tools: '<div class="pp_social"><div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href=' + location.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div></div>' /* html or false to disable */
		});
	} else {
		console.log("prettyphoto is not exits");
		$(".single-product .images").each(function (e) {
			var $this = $(this);
			$(".thumbnails a", $this).on("click", function (e) {
				var x = ($(this).attr("href"));
				$(">a:first-child", $this).attr("href", x);
				$(">a:first-child img", $this).attr("src", x);
				return false;
			});
		});
	}
	var reply_html = '<div class="write-reply"><div class="row  mt30"><div class="col-xs-12 col-sm-1 mb20"><img src="images/defaults/user-home5.jpg" class="radius50"/>		</div>		<div class="col-xs-12 col-sm-11">		<div class="text">		<div class="row">		<form>		<div class="col-xs-12 col-sm-12">		<input name="reply" rows="1" placeholder="Leave a message"/>		<button type="submit" class="text-uppercase bold"> reply</button>		</div>		</form>		</div>		</div>		</div>		</div>		</div>';
	$(".reply_button").each(function () {
		$(this).on("click", function (e) {
			e.preventDefault();
			if ($(this).data("clicked") !== 1) {
				$(this).closest(".comment_obj").append(reply_html);
				$(this).attr("data-clicked", 1);
			}
		});
	});
	if ($(this).jPlayer) {

		$(".jp_29382").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					title: "Stirring of a fool",
					m4a: "http://www.jplayer.org/audio/m4a/Miaow-08-Stirring-of-a-fool.m4a",
					oga: "http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
				});
			},
			swfPath: "../../dist/jplayer",
			supplied: "m4a, oga",
			cssSelectorAncestor: ".jp_29382_container",
			wmode: "window",
			globalVolume: true,
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true
		});

	} else {
		console.log("jplayer is not exits");
	}

	$(".scroll_fixed").each(function () {
		$(this).sticky({
			topSpacing: 50
		});
	});

	$(".home-slide-down-2").each(function () {
		var h = $(this);
		h.append('<div class="home-controls"></div>');

		$(".home-controls").each(function () {
			var t = $(this);
			$(".home-slide-down-2>.section").each(function () {
				var thumb = $(".bigthumb", $(this)).attr("src");

				if (thumb !== undefined) {
					t.append("<div class='item' style='background: #0e7b9e url(" + thumb + ") center center no-repeat'></div>");
				}

			});
			$(this).find(".item").on("click", function (e) {
				var index = ($(this).index() + 2);
				var pos = ($(".home-slide-down-2>.section:nth-child(" + index + ")")).offset();
				$("html, body").animate({
					scrollTop: pos.top - 60
				});
			});
		});

		function set_active(index) {
			var current_pos = $(window).scrollTop();
			h.children(".section").each(function () {
				if (($(this).offset().top) >= current_pos) {
					var index = ($(this).index());
					var item = $(".home-controls>.item:nth-child(" + index + ")");
					item.siblings().removeClass("active");
					item.addClass("active");
					return false;
				}
			});
		}
		set_active();

		$(window).scroll(function () {
			set_active();
		});
		$(this).find(".section_title").on("click", function () {
			var parent = $(this).closest('.section');
			var pos = parent.next().offset();
			if (pos !== undefined) {
				$("html, body").animate({
					scrollTop: pos.top
				});
			}
		});
	});
	$(".home-slide-down").each(function () {
		var h = $(this);

		$(".home-controls").each(function () {
			var t = $(this);
			$(".home-slide-down>.section").each(function () {
				t.append("<div class='item'></div>");
			});
			$(this).find(".item").on("click", function (e) {
				var index = ($(this).index()) + 2; // 
				var pos = ($(".home-slide-down>.section:nth-child(" + index + ")")).offset();
				$('html, body').animate({
					scrollTop: pos.top
				});
			});
		});

		function set_active(index) {
			var current_pos = $(window).scrollTop();
			h.children(".section").each(function () {
				if (($(this).offset().top) >= current_pos) {
					var index = ($(this).index());
					var item = $(".home-controls>.item:nth-child(" + index + ")");
					item.siblings().removeClass("active");
					item.addClass("active");
					return false;
				}
			});
		}
		set_active();

		$(window).scroll(function () {
			set_active();
		});
		$(this).find(".section_title").on("click", function () {
			var parent = $(this).closest('.section');
			var pos = parent.next().offset();
			if (pos !== undefined) {
				$("html, body").animate({
					scrollTop: pos.top
				});
			}
		});
	});

	$(".input-text-js").each(function () {
		var $this = $(this);
		var t = $(".t", $this);
		var c = $(".c", $this);
		t.on("click", (function (e) {
			e.preventDefault();
			var v1 = parseInt($("span", $this).html(), 10) - 1;
			fv1($this, v1);
		}));
		c.on("click", (function (e) {
			e.preventDefault();
			var v1 = parseInt($("span", $this).html(), 10) + 1;
			fv1($this, v1);
		}));

		function fv1($this, v1) {
			$("span", $this).html(v1);
			$this.prev().val(v1);
		}
	});

	$(".li-menu-cart").each(function () {
		var t = $(this);
		t.on("click", function (e) {
			e.preventDefault();
			var target = ($(e.target));
			if ((target.is(".badge")) || (target.is(".fa-shopping-cart")) || (target.is(".menu-cart"))) {
				if ($(".mini-cart", t).length) {
					$(".mini-cart", t).fadeToggle().toggleClass("hidden");
				} else {
					$.ajax({
						url: "ajax/mini-cart.html",
						success: function (result) {
							t.append(result);
							$(".mini-cart", t).fadeToggle().toggleClass("hidden");
						}
					});
					return false;
				}
			}
			if (target.is(".action span")) {
				target.closest(".mini-cart .list li", t).fadeOut("slow", function () {
					$(this).remove();
					var len = $(".mini-cart .list li", t).length;
					$(".badge", t).text(len);
					if (!len) {
						$(".mini-cart", t).fadeOut("slow", function () {
							$(this).remove();
						});
					}
				});
				return false;
			}
			if (target.is("a")) {
				location.assign($(target).attr("href"));
			}
		});
	});

	// woocommerce cart
	$(".woocommerce-cart .shop_table").each(function (e) {
		var t = $(this);
		$("thead tr", t).append("<th></th>");
		$("tbody .cart_item", t).each(function () {
			var product_id = $(".product-remove a", $(this)).data("product_id");
			$(this).append('<td class="a"><a href="#' + product_id + '">EDIT</a><br><a href="#' + product_id + '">REMOVE</a> </td>');
		});
	});
	$(".showlogin,.showcoupon").on("click", function (e) {
		e.preventDefault();
		console.log($(this).closest(".woocommerce-info").next().fadeToggle());
	});
	$("input[name='createaccount']").on("click", function () {
		var t = $(this);
		console.log(t.closest(".create-account").next().fadeToggle());
	});
	$(".payment_methods li").each(function () {
		var t = $(this);
		t.on("click", function (e) {
			t.closest(".payment_methods").find(".payment_box").hide();
			$(this).find(".payment_box").show();
		});
	});
	$(".menu-full-screen").each(function (e) {
		var menu_f_c = $(this);
		$(".close", menu_f_c).on("click", function (e) {
			e.preventDefault();
			menu_f_c.toggleClass("opened");
		});
		$(".mini-menu").on("click", function (e) {
			e.preventDefault();
			menu_f_c.toggleClass("opened");
		});
		$(".menu li", menu_f_c).each(function (e) {
			$(this).on("click", function (e) {
				var st_li = $(this);
				e.preventDefault();
				var sub = $(this).children(".submenu")
				if (sub.length > 0) {
					sub.each(function () {
						$(this).slideToggle("fast");
						st_li.toggleClass("opened-sub");
					});
					return false;
				} else {
					if ($(e.target).attr("href") !== undefined) {
						location.assign($(e.target).attr("href"));
					}
				}

			});
		});
	});


	$(".scroll_top").each(function () {
		var el = $(this);
		$(this).on("click", function () {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
		});

		$(window).on("scroll", function () {
			if ($(window).scrollTop() > 0) {
				el.fadeIn();
			} else {
				el.fadeOut();
			}
		});
	});
	$(window).on("load", function () {
		$(".menu-full-screen .menu_inner nav,.scroll_this").mCustomScrollbar({
			theme: "dark-thick",
			scrollButtons: {
				enable: true
			}
		});

	});

var userFeed = new Instafeed({
  get: 'user',
  userId: '2297149237',
  accessToken: '2297149237.1677ed0.c7c63e120adb464b8f6959ba36826ada',
  resolution: 'standard_resolution',
  limit: 4,
	template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><i>{{caption}}</i></a>'
});
userFeed.run();

});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

var menuLink = $('.main-menu a');

menuLink.click(function() {
	$('.main-menu').removeClass('menu_actived');
});

var image = $('.portfolio-image');
var imageSrc = image.attr('src');
var showMore = $('.show-more');
var lightbox = $('.lightbox');
var overlay = $('.overlay');
var lightboxImage = $('.lightbox img');

var notImage = $('.isotope-item[style!="display: none;"]');

image.first().addClass('is--active');

var activeSrc = $('img.is--active').attr('src');

lightboxImage.attr('src', activeSrc);

showMore.click(function(e) {
	var thisImage = $(this).closest('.item').find('img');
	var thisSrc = thisImage.attr('src');

	e.preventDefault();
	image.removeClass('is--active');
	thisImage.addClass('is--active');
	overlay.addClass('is--active');
	lightbox.addClass('is--active');

	lightboxImage.attr('src', thisSrc);
	//console.log(thisSrc);

});

overlay.click(function() {
	$(this).removeClass('is--active');
	lightbox.removeClass('is--active');
});