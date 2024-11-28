document.querySelectorAll('.menu-one__item--has-submenu').forEach(submenu => {
  /**
   * Toggles the 'aria-expanded' attribute for the specified element's relevant children.
   * 
   * @param {Element} currentSubMenu - The parent element containing the sub-menu.
   */
  const toggleAriaExpanded = (currentSubMenu) => {
    const linkToggle = currentSubMenu.querySelector('.menu-one__link--toggle');
    const buttonToggle = currentSubMenu.querySelector('.menu-one__child-toggle');
    const currentChev = currentSubMenu.querySelector('.menu-one__child-toggle-icon');    
    const isExpanded = linkToggle.getAttribute('aria-expanded') === 'true';
    const newValue = isExpanded ? 'false' : 'true';
    
    linkToggle.setAttribute('aria-expanded', newValue);
    buttonToggle.setAttribute('aria-expanded', newValue);

    gsap.to(currentChev, {
      rotation: isExpanded ? '0' : '180',
      ease: "expoScale(0.5,7,none)"
    });
  };

  // Add hover events for desktop 
  if (window.innerWidth >= 992) {
    // Event handlers
    const handleMouseOver = (e) => {
      const linkToggle = submenu.querySelector('.menu-one__link--toggle');
      const childToggle = submenu.querySelector('.menu-one__child-toggle');
      const submenuElement = submenu.querySelector('.menu__submenu');

      if (linkToggle && childToggle && submenuElement) {
        linkToggle.setAttribute('aria-expanded', 'true');
        childToggle.setAttribute('aria-expanded', 'true');
        submenuElement.classList.remove('hidden');

        // Animate toggle icon with GSAP
        gsap.to(childToggle, {
          rotation: 180,
          ease: "expoScale(0.5,7,none)"
        });
      }
    };

    const handleMouseOut = (e) => {
      const linkToggle = submenu.querySelector('.menu-one__link--toggle');
      const childToggle = submenu.querySelector('.menu-one__child-toggle');
      const submenuElement = submenu.querySelector('.menu__submenu');

      if (linkToggle && childToggle && submenuElement) {
        linkToggle.setAttribute('aria-expanded', 'false');
        childToggle.setAttribute('aria-expanded', 'false');
        submenuElement.classList.add('hidden');

        // Animate toggle icon with GSAP
        gsap.to(childToggle, {
          rotation: 0,
          ease: "expoScale(0.5,7,none)"
        });
      }
    };

    submenu.addEventListener('mouseover', handleMouseOver);
    submenu.addEventListener('mouseleave', handleMouseOut);
  }

  // Add click event for mobile
  submenu.querySelector('.menu-one__child-toggle').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleAriaExpanded(submenu);
    submenu.querySelector('.menu__submenu').classList.toggle('hidden');
  });

});

