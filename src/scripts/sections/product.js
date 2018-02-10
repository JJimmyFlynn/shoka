/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains highly coupled code to the Product template.
 *
   * @namespace product
 */

shoka.Product = (function() {

  var selectors = {
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productFeaturedImage: '[data-product-featured-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productThumbs: '[data-product-single-thumbnail]',
    singleOptionSelector: '[data-single-option-selector]',
    productImageSlider: '[data-product-image-slider]',
    productSaleNotice: '[data-product-sale-notice]'
  };

  /**
   * Product section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function Product(container) {
    // Get the current product template section instance
    this.$container = $(container);

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    // Get Shopify generated section ID
    var sectionId = this.$container.attr('data-section-id');
    // Get and parse JSON product data
    this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());

    // Setup options for slate.variants()
    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject
    };

    /**
     * Setup some default selectors and event bindings for product page interactions
     */
    this.settings = {};
    this.namespace = '.product';
    this.variants = new slate.Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);
    this.$productThumbnails = $(selectors.productThumbs, this.$container);

    /**
     * Initialize product image slider and bind
     * update event to product thumbnails
     */
    this.initializeProductSlider();
    this.$productThumbnails.on('click', this.updateSliderImage.bind(this));

    /**
     * Bind price and availability
     * updates to variant changes
     */
    this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
    this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));

  }

  Product.prototype = $.extend({}, Product.prototype, {

    /**
     * Initializes the product image slider
     */
    initializeProductSlider: function() {
      $(selectors.productImageSlider).slick({
        arrows: false,
        dots: false,
        draggable: false,
        fade: true
      });
    },

    /**
     * Updates the DOM state of the add to cart button
     *
     * @param {boolean} enabled - Decides whether cart is enabled or disabled
     * @param {string} text - Updates the text notification content of the cart
     */
    updateAddToCartState: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(selectors.priceWrapper, this.$container).removeClass('hide');
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        $(selectors.priceWrapper, this.$container).addClass('hide');
        return;
      }

      if (variant.available) {
        $(selectors.addToCart, this.$container).prop('disabled', false);
        $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
      } else {
        $(selectors.addToCart, this.$container).prop('disabled', true);
        $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
      }
    },

    /**
     * Updates the DOM with specified prices
     *
     * @param {string} productPrice - The current price of the product
     * @param {string} comparePrice - The original price of the product
     */
    updateProductPrices: function(evt) {
      var variant = evt.variant;
      var $comparePrice = $(selectors.comparePrice, this.$container);
      var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);
      var $saleNotice = $(selectors.productSaleNotice, this.$container);

      $(selectors.productPrice, this.$container)
        .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

      if (variant.compare_at_price > variant.price) {
        $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
        $compareEls.removeClass('hide');
        $saleNotice.removeClass('hide');
      } else {
        $comparePrice.html('');
        $compareEls.addClass('hide');
        $saleNotice.addClass('hide');
      }
    },

    /**
     * Update the product sldier image
     * when a thumbnail is clicked
     * 
     * @param {object} evt - The click event
     */
    updateSliderImage: function(evt) {
      var imageIndex = $(evt.delegateTarget).data('image-index');
      $('[data-product-image-slider]').slick('slickGoTo', imageIndex);
    },

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload: function() {
      this.$container.off(this.namespace);
    }
  });

  return Product;
})();
