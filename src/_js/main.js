var storeForms = new storeForms();

$(function () {
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
    $('.coop-search-results').addClass('is-open');
    $('body').addClass('modal-open');
  });
  $('.el-c-search__results-bg').click(function (e) {
    if ($('.coop-search-results').hasClass('is-open')) {
      $('.el-c-search__results-bg').hide();
      $('.coop-search-results').removeClass('is-open');
      $('body').removeClass('modal-open');
      $('.coop-search-results').empty();
    }
  });
  $('#search-small-input').focusout(function (e) {
    if ($('.coop-search-results').hasClass('is-open')) {
      $('.el-c-search__results-bg').hide();
      $('.coop-search-results').removeClass('is-open');
      $('body').removeClass('modal-open');
      $('.coop-search-results').empty();
    }
  });
  $('#search-small-input').focus(function (e) {
    $('.el-c-search__results-bg').show();
    $('.coop-search-results').addClass('is-open');
    $('body').addClass('modal-open');
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
});
$(document).keyup(function (e) {
  if (e.which == 27 && $('.coop-search-results').hasClass('is-open')) {
    $('.el-c-search__results-bg').hide();
    $('.coop-search-results').removeClass('is-open');
    $('body').removeClass('modal-open');
    $('.coop-search-results').empty();
  }
});
