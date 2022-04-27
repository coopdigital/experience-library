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

const handleMenuInteractions = () => {

  const searchSmallInput = document.querySelector('#search-small-input')
  const searchResultsOverlay = document.querySelector('.el-c-search__results-bg')
  const searchResults = document.querySelector('.coop-search-results')
  const menuToggle = document.querySelector('#js-menu-toggle')
  const sidebar = document.querySelector('.coop-u-flex__sidebar')
  const sidebarLinks = sidebar.querySelectorAll('a')
  const searchInput = document.querySelector('.el-c-search__input')
  const menuBg = document.querySelector('.menu-bg')

  const applySearchFocus = () => {
    searchResults.setAttribute('aria-hidden', false)
    document.body.classList.add('search-open')
  }

  const destroySearchFocus = () => {
    if (document.body.classList.contains('search-open')) {
      document.body.classList.remove('search-open')
      searchResults.setAttribute('aria-hidden', true)
      searchSmallInput.blur()
    }
  }

  const openMenu = () => {
    document.body.classList.add('menu-open')
    menuToggle.textContent = 'Close'
    menuToggle.setAttribute('aria-expanded', true)
    sidebar.setAttribute('aria-hidden', false)
    sidebarLinks.forEach((link) => link.setAttribute('tabindex', 0))
    searchInput.setAttribute('tabindex', 0)
  }

  const closeMenu=() => {
    document.body.classList.remove('menu-open')
    menuToggle.textContent = 'Menu'
    menuToggle.setAttribute('aria-expanded', false)
    sidebar.setAttribute('aria-hidden', true)
    sidebarLinks.forEach((link) => link.setAttribute('tabindex', -1))
    searchInput.setAttribute('tabindex', -1)
  }

  searchSmallInput.addEventListener('click', applySearchFocus)
  searchSmallInput.addEventListener('focus', applySearchFocus)
  searchSmallInput.addEventListener('blur', () => {
    if(searchResults.childElementCount === 0) destroySearchFocus()
  })
  searchResultsOverlay.addEventListener('click', destroySearchFocus)

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault()
    if(!document.body.classList.contains('menu-open')) {
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
      if(document.body.classList.contains('search-open')) { destroySearchFocus(); return }
      if(document.body.classList.contains('menu-open')) { closeMenu(); return }
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
  handleMenuInteractions()

})
