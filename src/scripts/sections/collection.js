shoka.Collection = (function() {

		/**
		 * Enable sort by collection filtering
		 */

	function Collection() {
		this.sortByInit();
		this.vendorSortInit();
	}

	Collection.prototype = $.extend({}, Collection.prototype, {
		sortByInit: function() {
			Shopify.queryParams = {};
			if (location.search.length) {
				for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
					aKeyValue = aCouples[i].split('=');
					if (aKeyValue.length > 1) {
						Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
					}
				}
			}
			$('[data-collection-sort]')
				.bind('change', function() {
					Shopify.queryParams.sort_by = $(this).val();
					location.search = $.param(Shopify.queryParams).replace(/\+/g, '%20');
			});
		},

		vendorSortInit: function() {
			$('[data-vendor-sort]')
				.bind('change', function() {
					window.location = $(this).val();
				});
		}
	});

	return Collection;
})();