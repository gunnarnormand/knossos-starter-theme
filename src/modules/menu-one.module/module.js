document.querySelectorAll('.menu-one__item--has-submenu').forEach(submenu => {
  /**
   * Toggles the 'aria-expanded' attribute for the specified element's relevant children.
   * 
   * @param {Element} currentSubMenu - The parent element containing the sub-menu.
   */
  const toggleAriaExpanded = (currentSubMenu) => {
    const linkToggle = currentSubMenu.querySelector('.menu-one__link--toggle');
    const buttonToggle = currentSubMenu.querySelector('.menu-one__child-toggle');
    
    const isExpanded = linkToggle.getAttribute('aria-expanded') === 'true';
    const newValue = isExpanded ? 'false' : 'true';
    
    linkToggle.setAttribute('aria-expanded', newValue);
    buttonToggle.setAttribute('aria-expanded', newValue);
  };

  if (window.innerWidth >= 992) {
    // Add hover events for desktop
    submenu.addEventListener('mouseover', () => {
      submenu.querySelector('.menu-one__link--toggle').setAttribute('aria-expanded', 'true');
      submenu.querySelector('.menu-one__child-toggle').setAttribute('aria-expanded', 'true');
      submenu.querySelector('.menu__submenu').classList.remove('hidden');
      // @TODO: animate toggle icon svg
    });

    submenu.addEventListener('mouseout', () => {
      submenu.querySelector('.menu-one__link--toggle').setAttribute('aria-expanded', 'false');
      submenu.querySelector('.menu-one__child-toggle').setAttribute('aria-expanded', 'false');
      submenu.querySelector('.menu__submenu').classList.add('hidden');
      // @TODO: animate toggle icon svg
    });
  }

  // Add click event for mobile
  submenu.querySelector('.menu-one__child-toggle').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleAriaExpanded(submenu);
    submenu.querySelector('.menu__submenu').classList.toggle('hidden');
  });

});

