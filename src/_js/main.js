var storeForms = new storeForms();

$(function () {
  $('.toggle-link').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('is-open')) {
      $(this).addClass('is-open');
      $(this).next('.coop-side-nav--nested').toggle();
    } else {
      $(this).removeClass('is-open');
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
  $('#js-menu-toggle').click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass('is-open')) {
      $(this).addClass('is-open');
      $(this).text('Close');  
      $('.coop-u-flex__sidebar').addClass('coop-u-flex__sidebar--is-open');
      $('.coop-nav-scroll').addClass('coop-nav-scroll--is-open'); 
      $('body').addClass('menu--is-open');
      $('.menu-bg').show();
    } else {
      $(this).removeClass('is-open');
      $(this).text('Menu'); 
      $('body').removeClass('menu--is-open');
      $('.coop-u-flex__sidebar').removeClass('coop-u-flex__sidebar--is-open');
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
