jQuery(document).ready(function() {
	/* Search */
	jQuery('.button_oc-search').bind('click', function() {
		url = jQuery('base').attr('href') + 'search';
				 
		var filter_name = jQuery('input[name=\'filter_name\']').attr('value')
		
		if (filter_name) {
			url += '&filter_name=' + encodeURIComponent(filter_name);
		}
		
		location = url;
	});
	
	jQuery('#header_oc input[name=\'filter_name\']').keydown(function(e) {
		if (e.keyCode == 13) {
			url = jQuery('base').attr('href') + 'search';
			 
			var filter_name = jQuery('input[name=\'filter_name\']').attr('value')
			
			if (filter_name) {
				url += '&filter_name=' + encodeURIComponent(filter_name);
			}
			
			location = url;
		}
	});
	
	/* Ajax Cart */
	jQuery('#cart > .heading a').bind('click', function() {
		jQuery('#cart').addClass('active');
		
		jQuery.ajax({
			url: 'index.php?option=com_eshop&route=checkout/cart/update&tmpl=component&format=raw',
			dataType: 'json',
			success: function(json) {
				if (json['output']) {
					jQuery('#cart .content_oc').html(json['output']);
				}
			}
		});			
		
		jQuery('#cart').bind('mouseleave', function() {
			jQuery(this).removeClass('active');
		});
	});
	
	/* Mega Menu */
	jQuery('#menu_oc ul > li > a + div').each(function(index, element) {
		// IE6 & IE7 Fixes
		if (jQuery.browser.msie && (jQuery.browser.version == 7 || jQuery.browser.version == 6)) {
			var category = jQuery(element).find('a');
			var columns = jQuery(element).find('ul').length;
			
			jQuery(element).css('width', (columns * 143) + 'px');
			jQuery(element).find('ul').css('float', 'left');
		}		
		
		var menu = jQuery('#menu_oc').offset();
		var dropdown = jQuery(this).parent().offset();
		
		i = (dropdown.left + jQuery(this).outerWidth()) - (menu.left + jQuery('#menu_oc').outerWidth());
		
		if (i > 0) {
			jQuery(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// IE6 & IE7 Fixes
	if (jQuery.browser.msie) {
		if (jQuery.browser.version <= 6) {
			jQuery('#column-left + #column-right + #content_oc, #column-left + #content_oc').css('margin-left', '195px');
			
			jQuery('#column-right + #content_oc').css('margin-right', '195px');
		
			jQuery('.box-category ul li a.active + ul').css('display', 'block');	
		}
		
		if (jQuery.browser.version <= 7) {
			jQuery('#menu_oc > ul > li').bind('mouseover', function() {
				jQuery(this).addClass('active');
			});
				
			jQuery('#menu_oc > ul > li').bind('mouseout', function() {
				jQuery(this).removeClass('active');
			});	
		}
	}
	
	jQuery('.success img, .warning img, .attention img, .information img').live('click', function() {
		jQuery(this).parent().fadeOut('slow', function() {
			jQuery(this).remove();
		});
	});	
});

function addToCart(product_id) {
	jQuery.ajax({
		url: 'index.php?option=com_eshop&route=checkout/cart/update&tmpl=component&format=raw',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			jQuery('.success, .warning, .attention, .information, .error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['error']) {
				if (json['error']['warning']) {
					jQuery('#notification').html('<div class="warning" style="display: none;">' + json['error']['warning'] + '<img src="components/com_eshop/osx/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
					
					jQuery('.warning').fadeIn('slow');
					
					jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			}	 
						
			if (json['success']) {
				jQuery('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="components/com_eshop/osx/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				jQuery('.success').fadeIn('slow');
				
				jQuery('#cart_total').html(json['total']);

                jQuery('#module_cart .cart-module').html(json['output']);
				
				jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}

function removeCart(key) {
	jQuery.ajax({
		url: 'index.php?option=com_eshop&route=checkout/cart/update&tmpl=component&format=raw',
		type: 'post',
		data: 'remove=' + key,
		dataType: 'json',
		success: function(json) {
			jQuery('.success, .warning, .attention, .information').remove();
			
			if (json['output']) {
				jQuery('#cart_total').html(json['total']);

                jQuery('#module_cart .cart-module').html(json['output']);
				
				jQuery('#cart .content_oc').html(json['output']);
			}			
		}
	});
}

function removeVoucher(key) {
	jQuery.ajax({
		url: 'index.php?option=com_eshop&route=checkout/cart/update&tmpl=component&format=raw',
		type: 'post',
		data: 'voucher=' + key,
		dataType: 'json',
		success: function(json) {
			jQuery('.success, .warning, .attention, .information').remove();
			
			if (json['output']) {
				jQuery('#cart_total').html(json['total']);

                jQuery('#module_cart .cart-module').html(json['output']);
				
				jQuery('#cart .content_oc').html(json['output']);
			}			
		}
	});
}

function addToWishList(product_id) {
	jQuery.ajax({
		url: 'index.php?option=com_eshop&route=account/wishlist/update&tmpl=component&format=raw',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			jQuery('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				jQuery('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="components/com_eshop/osx/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				jQuery('.success').fadeIn('slow');
				
				jQuery('#wishlist_total').html(json['total']);
				
				jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); 				
			}	
		}
	});
}

function addToCompare(product_id) { 
	jQuery.ajax({
		url: 'index.php?option=com_eshop&route=product/compare/update&tmpl=component&format=raw',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			jQuery('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				jQuery('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="components/com_eshop/osx/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				jQuery('.success').fadeIn('slow');
				
				jQuery('#compare_total').html(json['total']);
				
				jQuery('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}
