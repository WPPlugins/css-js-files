(function($) {
	var last_select = {
		'css': null,
		'js': null
	};
	
	function refresh_state(type) {
		last_select[type] = $('[name="css_js_files_'+type+'_files[]"]').last();
		
		if (last_select[type].val() == '') {
			//If no option selected, we can't add other select element
			$('#css-js-files-'+type+'-button').attr('disabled', 'true').removeClass('button-primary').addClass('button-default');
		}
		last_select[type].change(function() {
			if ($(this).val() != '') {
				$('#css-js-files-'+type+'-button').removeAttr('disabled').removeClass('button-default').addClass('button-primary');
			}
		});
	}
	
	function init(type) {
		if (typeof jQuery.fn.jquery === 'function') {
			$('body').on('change', '[name="css_js_files_'+type+'_files[]"]', function() {
				if ($(this).val() == '' && $('[name="css_js_files_'+type+'_files[]"]').length > 1) {
					$(this).remove();
				}
				refresh_state(type);
			});
		} else {
				$('[name="css_js_files_'+type+'_files[]"]').live('change', function() {
				if ($(this).val() == '' && $('[name="css_js_files_'+type+'_files[]"]').length > 1) {
					$(this).remove();
				}
				refresh_state(type);
			});
		}
		
		$('#css-js-files-'+type+'-button').click(function(e) {
			e.preventDefault();
			if (!e.target.disabled) {
				var clone = last_select[type].clone();
				clone.find('option').first().attr('selected', 'true');
				last_select[type].after(clone);
				refresh_state();
			}
		});
		
		refresh_state(type);
	}
	
	$('select[name="css_js_files_all_files[]"]').change(function(e) {
		var file = $('select[name="css_js_files_all_files[]"]').val();
		location.href = 'admin.php?page=css-js-files-editor'+(file==''?'':'&file='+encodeURIComponent(file));
	});
	
	init('css');
	init('js');
}(jQuery));