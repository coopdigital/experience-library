var storeForms = new storeForms();

$('.toggle-link').click(function () {
  if (!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
    $(this).next('.coop-side-nav--nested').toggle();
  } else {
    $(this).removeClass('is-open');
  }
});

if ($('.toggle-link').hasClass('is-open')) {
  console.log('has class!');
  $('.toggle-link.is-open').next('.coop-side-nav--nested').show();
}
