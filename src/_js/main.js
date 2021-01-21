var storeForms = new storeForms();

$(function () {
  $('.toggle-link').click(function () {
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

  // $('#search-small').click(function (e) {
  //   e.preventDefault();
  //   $('.coop-c-search__modal-bg').show();
  //   $('.coop-c-search__form').show();
  //   $('body').addClass('modal-open');
  // });

  $(document).keyup(function (e) {
    if (e.which == 27 && $('#results-container').is(':visible')) {
      $('.coop-c-search__modal-bg').hide();
      $('.coop-c-search__form').hide();
      $('body').removeClass('modal-open');
    }
  });

  $('.coop-c-search__results-bg').click(function (e) {
    if ($('.coop-c-search__results-bg').is(':visible')) {
      $('.coop-c-search__results-bg').hide();
      $('#results-container').hide();
      $('body').removeClass('modal-open');
    }
  });

  if ($('.coop-search-results:empty')) {
    console.log(':(');
  } else {
    console.log(':)');
  }
});
