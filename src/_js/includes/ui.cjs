const $ = require('jquery');

$(function () {

  $(window).scroll(function (event) {
    var height = $(window).scrollTop();
    if (height == 0) {
      $('#js-el-c-scroll-to-top').addClass('el-c-back-to-top--is-top');
    } 
    if (height > 1) {
      $('#js-el-c-scroll-to-top').removeClass('el-c-back-to-top--is-top');
    } 
  });

  var scrollableElement = document.body; 
  var minHeight = $(window).scrollTop();
  scrollableElement.addEventListener('wheel', checkScrollDirection);
  function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
      $('#js-el-c-scroll-to-top').addClass('el-c-back-to-top--is-shown');
    }
    else {
      $('#js-el-c-scroll-to-top').removeClass('el-c-back-to-top--is-shown');
    }
  }

  function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }
  

  $('#js-el-c-scroll-to-top').on( "click", function() {
    $('#js-el-c-scroll-to-top').removeClass('el-c-back-to-top--is-shown');
  });

  $('.toggle-link').click(function (e) {
      e.preventDefault();
      if (!$(this).hasClass('is-open')) {
        $(this).addClass('is-open').attr('aria-expanded', 'true');
        $(this).next('.coop-side-nav--nested').toggle();
      } else {
        $(this).removeClass('is-open').attr('aria-expanded', 'false');
        $(this).next('.coop-side-nav--nested').toggle();
      }
    });
    if ($('.toggle-link').hasClass('is-open')) {
      $('.toggle-link.is-open').next('.coop-side-nav--nested').show();
    }
    $('#search-small-input').click(function (e) {
      $('.el-c-search__results-bg').show();
      $('.coop-search-results').addClass('is-open').attr('aria-hidden', 'false');
      $('.coop-search-results a').attr('tabindex', '0');
      $('.results-bg').addClass('is--open');
      $('body').addClass('modal-open');
    });
    $('.el-c-search__results-bg').click(function (e) {
      if ($('.coop-search-results').hasClass('is-open')) {
        $('.el-c-search__results-bg').hide();
        $('.coop-search-results').removeClass('is-open').attr('aria-hidden', 'true');
        $('.coop-search-results a').attr('tabindex', '-1');
        $('.results-bg').removeClass('is--open');
        $('body').removeClass('modal-open');
        $('.coop-search-results').empty();
      }
    });
    $('#search-small-input').focus(function (e) {
      $('.el-c-search__results-bg').show();
      $('.coop-search-results').addClass('is-open');
      $('.results-bg').addClass('is--open');
      $('.coop-search-results a').attr('tabindex', '0');
      $('body').addClass('modal-open');
    }); 
    $('#search-small-input').focusout(function (e) {
      if ($('.result-text').hasClass('result-text')) {
        $('.el-c-search__results-bg').show();
        $('.coop-search-results').addClass('is-open').attr('aria-hidden', 'false');
        $('.results-bg').addClass('is--open');
        $('.coop-search-results a').attr('tabindex', '0');
        $('body').addClass('modal-open');
      } else {
        $('.el-c-search__results-bg').hide();
        $('.coop-search-results').removeClass('is-open').attr('aria-hidden', 'true');
        $('.coop-search-results a').attr('tabindex', '-1');
        $('.results-bg').removeClass('is--open');
        $('body').removeClass('modal-open');
        $('.coop-search-results').empty();
      }
    });
    function checkWidth() {
      var windowSize = $(window).width();
      if (windowSize < 768) {
        $('.coop-u-flex__sidebar a').attr('tabindex', '-1');
        $('.el-c-search__input').attr('tabindex', '-1');
        $('.coop-u-flex__sidebar').attr('aria-hidden', 'true');
      }
      else {
        $('.coop-u-flex__sidebar a').attr('tabindex', '0');
        $('.el-c-search__input').attr('tabindex', '0');
        $('.coop-u-flex__sidebar').attr('aria-hidden', 'false');
      }
    }
    checkWidth();
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $('.coop-u-flex__sidebar a').attr('tabindex', '-1');
        $('.el-c-search__input').attr('tabindex', '-1');
        $('.coop-u-flex__sidebar').attr('aria-hidden', 'true');
      }
      else {
        $('.coop-u-flex__sidebar a').attr('tabindex', '0');
        $('.el-c-search__input').attr('tabindex', '0');
        $('.coop-u-flex__sidebar').attr('aria-hidden', 'false');
      }
    });
    $('#js-menu-toggle').click(function (e) {
      e.preventDefault();
      if (!$(this).hasClass('is-open')) {
        $(this).addClass('is-open').text('Close').attr('aria-expanded', 'true');
        $('.coop-u-flex__sidebar').addClass('coop-u-flex__sidebar--is-open').attr('aria-hidden', 'false');
        $('.coop-u-flex__sidebar a').attr('tabindex', '0');
        $('.el-c-search__input').attr('tabindex', '0');
        $('.coop-nav-scroll').addClass('coop-nav-scroll--is-open');
        $('body').addClass('menu--is-open');
        $('.menu-bg').show();
      } else {
        $(this).removeClass('is-open').text('Menu').attr('aria-expanded', 'false');
        $('body').removeClass('menu--is-open');
        $('.coop-u-flex__sidebar').removeClass('coop-u-flex__sidebar--is-open').attr('aria-hidden', 'true');
        $('.coop-u-flex__sidebar a').attr('tabindex', '-1');
        $('.el-c-search__input').attr('tabindex', '-1');
        $('.coop-nav-scroll').removeClass('coop-nav-scroll--is-open');
        $('.menu-bg').hide();
      }
    });
    $('.menu-bg').click(function (e) {
      if ($('.coop-u-flex__sidebar').hasClass('coop-u-flex__sidebar--is-open')) {
        $('#js-menu-toggle').removeClass('is-open').text('Menu').attr('aria-expanded', 'false');
        $('body').removeClass('menu--is-open');
        $('.coop-u-flex__sidebar').removeClass('coop-u-flex__sidebar--is-open').attr('aria-hidden', 'true');
        $('.coop-u-flex__sidebar a').attr('tabindex', '-1');
        $('.el-c-search__input').attr('tabindex', '-1');
        $('.coop-nav-scroll').removeClass('coop-nav-scroll--is-open');
        $('.menu-bg').hide();
      }
    });
  });
  $(document).keyup(function (e) {
    if (e.which == 27 && $('.coop-search-results').hasClass('is-open')) {
      $('.el-c-search__results-bg').hide();
      $('.coop-search-results').removeClass('is-open').attr('aria-hidden', 'true');
      $('.coop-search-results a').attr('tabindex', '-1');
      $('body').removeClass('modal-open');
      $('.coop-search-results').empty();
    }
});
