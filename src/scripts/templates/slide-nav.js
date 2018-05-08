
shoka.slideNav = (function() {
  var selectors = {
    slideNav: '[data-slide-nav]',
    slideNavClose: '[data-slide-nav-close]',
    slideNavPanel: '[data-nav-panel]',
    slideNavPanelClose: '[data-nav-panel-close]',
    hasSubNav: '[data-has-sub-nav]',
    navBlocker: '[data-nav-blocker]',
    slideNavOpen: '[data-nav-open]'
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
   * Close slide nav
   */
  $(selectors.slideNavClose).on('click', function() {
    closeNav();
  });

  /**
   * Close Slide Nav
   */
  $(selectors.navBlocker).on('click', function() {
    closeNav();
  });

  /**
   * Open Slide Nav
   */
  $(selectors.slideNavOpen).on('click', function() {
    openNav();
  });

  function closeNav() {
    $(selectors.navBlocker).fadeOut();
    $('body').removeClass('nav-open');
  }

  function openNav() {
    $(selectors.navBlocker).fadeIn();
    $('body').addClass('nav-open');
  }
} )();
