/**
 * Header / Header Section Script
 * ------------------------------------------------------------------------------
 * Javascript for hero slider section
 *
   * @namespace siteHeader
 */

shoka.SiteHeader = (function() {

  /**
   * Site Header section constructor. Runs on page load as well as Theme Editor
   * `section:load` events.
   * @param {string} container - selector for the section container DOM element
   */
  function SiteHeader(container) {

    // Setup section variavles as required by Slate
    this.$container = $(container);
    var sectionId = this.$container.attr('data-section-id');
    
    // Initialize Stickybits
    stickybits(document.getElementById('shopify-section-header'));
  }

  return SiteHeader;
})();