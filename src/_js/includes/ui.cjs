const $ = require('jquery');
const WINDOW_SIDEBAR_BREAKPOINT = 768

const debounce = (callbackFn, period) => {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      callbackFn.apply(null, args);
    }, period);
  };
}

const handleResize = () => {
  const windowWidth = window.innerWidth

  if(windowWidth < WINDOW_SIDEBAR_BREAKPOINT) {
    document.querySelector('.el-c-search__input').setAttribute('tabindex', -1)
    document.querySelector('.coop-u-flex__sidebar').setAttribute('aria-hidden', 'true')
  } else {
    document.querySelector('.el-c-search__input').setAttribute('tabindex', 0)
    document.querySelector('.coop-u-flex__sidebar').setAttribute('aria-hidden', 'false')
  }
}

const handleDebouncedWindowResize = () => {
  window.addEventListener('resize', debounce(() => { handleResize() } , 250))
}

const handleDocumentScroll = () => {
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

const handleInteractions = () => {

  const searchSmallInput = document.querySelector('#search-small-input')
  const searchResultsOverlay = document.querySelector('.el-c-search__results-bg')
  const searchResults = document.querySelector('.coop-search-results')
  const searchResultsContainer = document.querySelector('.results-bg')

  const menuToggle = document.querySelector('#js-menu-toggle')
  const sidebar = document.querySelector('.coop-u-flex__sidebar')
  const sidebarLinks = sidebar.querySelectorAll('a')
  const searchInput = document.querySelector('.el-c-search__input')
  const navScroll = document.querySelector('.coop-nav-scroll')
  const menuBg = document.querySelector('.menu-bg')

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
      searchSmallInput.blur()
      //searchResults.innerHTML = ''
      document.body.classList.remove('modal-open')
    }
  }

  const openMenu = () => {
    menuToggle.classList.add('is-open')
    menuToggle.textContent = 'Close'
    menuToggle.setAttribute('aria-expanded', true)
    sidebar.classList.add('coop-u-flex__sidebar--is-open')
    sidebar.setAttribute('aria-hidden', false)
    sidebarLinks.forEach((link) => link.setAttribute('tabindex', 0))
    searchInput.setAttribute('tabindex', 0)
    navScroll.classList.add('coop-nav-scroll--is-open')
    document.body.classList.add('menu--is-open')
    menuBg.style.display="block"
  }

  const closeMenu=() => {
    menuToggle.classList.remove('is-open')
    menuToggle.textContent = 'Menu'
    menuToggle.setAttribute('aria-expanded', false)
    sidebar.classList.remove('coop-u-flex__sidebar--is-open')
    sidebar.setAttribute('aria-hidden', true)
    sidebarLinks.forEach((link) => link.setAttribute('tabindex', -1))
    searchInput.setAttribute('tabindex', -1)
    navScroll.classList.remove('coop-nav-scroll--is-open')
    document.body.classList.remove('menu--is-open')
    menuBg.style.display="none"
  }

  searchSmallInput.addEventListener('click', applySearchFocus)
  searchSmallInput.addEventListener('focus', applySearchFocus)
  searchSmallInput.addEventListener('blur', () => {
    if(searchResults.childElementCount === 0) destroySearchFocus()
  })
  searchResultsOverlay.addEventListener('click', destroySearchFocus)

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault()
    if(!menuToggle.classList.contains('is-open')) {
      openMenu()
    } else {
      closeMenu()
    }
  })

  menuBg.addEventListener('click', () => {
    closeMenu()
  })

  document.addEventListener('keyup', (e) => {
    if(e.key==='Escape') {
      if(document.activeElement === searchSmallInput) { destroySearchFocus(); return }
      if(menuToggle.classList.contains('is-open')) { closeMenu(); return }
    }
  })
}

document.addEventListener("DOMContentLoaded", function() {

  // Run this once before anything else
  // Subsequent resizes are handled by the debounced fn
  handleResize()
  handleDocumentScroll()
  handleSidebarPanels()
  handleDebouncedWindowResize()
  handleInteractions()

})
