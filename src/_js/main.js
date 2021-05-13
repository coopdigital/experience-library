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
});
$(document).keyup(function (e) {
  if (e.which == 27 && $('.coop-search-results').hasClass('is-open')) {
    $('.el-c-search__results-bg').hide();
    $('.coop-search-results').removeClass('is-open');
    $('body').removeClass('modal-open');
    $('.coop-search-results').empty();
  }
});
