/**
 * Hero Slider Section Script
 * ------------------------------------------------------------------------------
 * Javascript for hero slider section
 *
   * @namespace heroSlider
 */

 shoka.HeroSlider = (function() {

  /**
   * Hero Slider section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function HeroSlider(container) {
    //  Get instance of slider
    this.$heroSlider = $('#heroSlider');
    //  Exit if there is hero slider section
    if( !this.$heroSlider.html() ) {
      return;
    }

    // Setup section variavles as required by Slate
    this.$container = $(container);
    this.namespace = '.heroSlider';
    var sectionId = this.$container.attr('data-section-id');


    this.$heroSlider.on('init' + this.namespace, () => this.$heroSlider.removeClass('slider-loading'));
    //  Initialize slick slider
    this.$heroSlider.slick({
      arrows: false,
      dots: true,
      appendDots: $('#heroSliderDots'),
      autoplay: true,
      autoplaySpeed: 8000
    });
  }

  /**
   * Extend HeroSlider to include Shopify Section events
   */
  HeroSlider.prototype = $.extend({}, HeroSlider.prototype, {

    onBlockSelect: function(evt) {
      // Find the block the user selected
      var slideId = evt.detail.blockId;
      var slideIndex = $('.hero-slide--' + slideId).data('slick-index');

      // Go to the selected block and pause the slider
      this.$heroSlider.slick('slickGoTo', slideIndex);
      this.$heroSlider.slick('slickPause');
    },

    onBlockDeselect: function(evt) {
      // Resume the slider when a slide is deselected
      this.$heroSlider.slick('slickPlay')
    },

    onUnload: function() {
      // Detch event listeners
      this.$heroSlider.off(this.namespace);
    }
  });

  return HeroSlider;
 })();
