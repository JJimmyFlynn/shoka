/**
 * Hero Slider Section Script
 * ------------------------------------------------------------------------------
 * Javascript for hero slider section
 *
   * @namespace heroSlider
 */

 theme.HeroSlider = (function() {
    //  Get instance of slider
   var heroSlider = $('#heroSlider');

    //  Exit if there is hero slider section
   if( !heroSlider.html() ) {
     return;
   }
    //  Initialize slick slider
   heroSlider.slick({
     arrows: false,
     dots: true,
     appendDots: $('#heroSliderDots')
   });

 })();