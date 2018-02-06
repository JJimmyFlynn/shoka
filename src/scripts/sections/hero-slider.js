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
    var $heroSlider = $('#heroSlider');

    //  Exit if there is hero slider section
    if( !$heroSlider.html() ) {
      return;
    }

    // Setup section variavles as required by Slate
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');


    $heroSlider.on('init', () => $heroSlider.removeClass('slider-loading'));
    //  Initialize slick slider
    $heroSlider.slick({
      arrows: false,
      dots: true,
      appendDots: $('#heroSliderDots')
    });
  }

  /**
   * Extend HeroSlider to include Shopify Section events
   */
  HeroSlider.prototype = $.extend({}, HeroSlider.prototype, {
    onSelect: function() {
      console.log($heroSlider);
    }
  });

  return HeroSlider;
 })();