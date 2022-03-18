const $ = require('jquery');

const observeDocumentScroll =() => {
  const intersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }
  const intersectorClassName = 'el-c-hero'
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if(entry.target.className === intersectorClassName && scrollToTopAnchor) { 
        if(entry.isIntersecting) {
          scrollToTopAnchor.classList.add('el-c-back-to-top--is-top')
          scrollToTopAnchor.classList.remove('el-c-back-to-top--is-shown')
        } else {
          scrollToTopAnchor.classList.remove('el-c-back-to-top--is-top')
          scrollToTopAnchor.classList.add('el-c-back-to-top--is-shown' )
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, intersectionObserverOptions);
  const target = document.querySelector(`.${intersectorClassName}`);
  const scrollToTopAnchor = document.querySelector('#js-el-c-scroll-to-top')
  if(target) {
    observer.observe(target);
  }
}


const handleSidebarPanels = () => {
  const links = document.querySelectorAll('.toggle-link')
  links.forEach(link => {

    link.addEventListener('click', (e) => {
      e.preventDefault()
      // Now uses the + next sibling selector in css rather than relying on js
      // This also reduces the close/reopen flicker when navigating to a link inside the panel
      if(!link.classList.contains('is-open')) {
        link.classList.add('is-open')
        link.setAttribute('aria-expanded', true)
      } else {
        link.classList.remove('is-open')
        link.setAttribute('aria-expanded', false)
      }
    })

  })
}



const handleSearchInput = () => {
  const searchSmallInput = document.querySelector('#search-small-input')
  const searchResultsOverlay = document.querySelector('.el-c-search__results-bg')
  const searchResults = document.querySelector('.coop-search-results')
  //const searchResultsFirstLink = searchResults.querySelector('a')
  const searchResultsContainer = document.querySelector('.results-bg')
  const resultsText = document.querySelector('.results-text')

  const applySearchFocus = () => {
    searchResultsOverlay.classList.add('is-open')
    searchResults.classList.add('is-open')
    searchResultsContainer.classList.add('is-open')
    searchResults.setAttribute('aria-hidden', false)
    document.body.classList.add('modal-open')
  }

  const destroySearchFocus = () => {
    if (searchResults.classList.contains('is-open')) {
      searchResultsOverlay.classList.remove('is-open')
      searchResults.classList.remove('is-open')
      searchResultsContainer.classList.remove('is-open')
      searchResults.setAttribute('aria-hidden', true)
      //searchResults.innerHTML = ''
      document.body.classList.remove('modal-open')
    }
  }

  searchSmallInput.addEventListener('click', applySearchFocus)
  searchSmallInput.addEventListener('focus', applySearchFocus)
  searchSmallInput.addEventListener('blur', () => {
    if(searchResults.childElementCount === 0) destroySearchFocus()
  })
  searchResultsOverlay.addEventListener('click', destroySearchFocus)
}

document.addEventListener("DOMContentLoaded", function() {
  observeDocumentScroll()
  handleSidebarPanels()
  handleSearchInput()
})

$(function () {
  
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
