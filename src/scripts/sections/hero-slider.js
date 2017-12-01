/**
 * Hero Slider Section Script
 * ------------------------------------------------------------------------------
 * Javascript for hero slider section
 *
   * @namespace heroSlider
 */

 shoka.HeroSlider = (function() {
    //  Get instance of slider
   var heroSlider = $('#heroSlider');

    //  Exit if there is hero slider section
   if( !heroSlider.html() ) {
     return;
   }

   heroSlider.on('init', () => heroSlider.removeClass('slider-loading'));
    //  Initialize slick slider
   heroSlider.slick({
     arrows: false,
     dots: true,
     appendDots: $('#heroSliderDots')
   });

 })();