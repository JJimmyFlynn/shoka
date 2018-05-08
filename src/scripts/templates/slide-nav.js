
shoka.slideNav = (function() {
  var selectors = {
    slideNav: '[data-slide-nav]',
    slideNavClose: '[data-slide-nav-close]',
    slideNavPanel: '[data-nav-panel]',
    slideNavPanelClose: '[data-nav-panel-close]',
    hasSubNav: '[data-has-sub-nav]',
    navBlocker: '[data-nav-blocker]',
    slideNavOpen: '[data-nav-open]',
    allNavToggles: '[data-slide-nav-close], [data-nav-blocker], [data-nav-open]'
  }

  /**
   * Closes open slide nav sub-nav panel
   */
  $(selectors.slideNavPanelClose).on('click', function() {
    $(this).parent().removeClass('is-open');
  });

  /**
   * Opens corresponding sub-nav when
   * top level nav is clicked
   */
  $(selectors.hasSubNav).on('click', function(event) {
    var panelName = $(this).data('nav-panel');

    event.preventDefault();
    $(selectors.slideNav)
      .find('[data-nav-panel="' + panelName + '"]')
      .addClass('is-open');
  });

  /**
   * Open/Close the nav when toggles are triggered
   */
  $(selectors.allNavToggles).on('click', function() {
    $(selectors.navBlocker).fadeToggle();
    $('body').toggleClass('nav-open');
  });

} )();
