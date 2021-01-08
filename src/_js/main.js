var storeForms = new storeForms();

$('.toggle-link').click(function () {
  $(this).next('.coop-side-nav--nested').toggle();
  $(this).find('.coopssn-c-nav__link__icon__svg').toggleClass('is-open');
});
