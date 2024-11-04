(function () {
    // Variables
    const emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

    const menuTrigger = document.querySelector('.header-one__menu-trigger');

    const menuContainer = document.querySelector('.header-one__menu-container');
  
    const triggerContainer = document.querySelector('.header-one__trigger-container');
    
    // dynamically update the (--height-open) css variable for the menu height. 
    const rootStyles = document.querySelector(':root'); 
    const viewportHeight = window.innerHeight;
    const triggerContainerHeight = Math.round(triggerContainer.getBoundingClientRect().height);
    const menuHeight = viewportHeight - triggerContainerHeight;
    rootStyles.style.setProperty('--height-open', `${menuHeight}px`);



    // Functions
  
    // Function for executing code on document ready
    function domReady(callback) {
      if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    }
  
    // Function to toggle main navigation menu on mobile screens
    function toggleNav() {
        menuTrigger.addEventListener('click', () => {
            const isOpen = menuTrigger.getAttribute('data-menu-state') === 'open';
            isOpen ? menuTrigger.setAttribute('data-menu-state', 'closed') : menuTrigger.setAttribute('data-menu-state', 'open');
            menuContainer.style.height = isOpen ? 'var(--height-closed)' : 'var(--height-open)';
            
            menuContainer.classList.toggle('hidden');
            menuTrigger.classList.toggle('open');

            // @TODO: animate hamburger style on toggle 

        });
    }
  
    // Function to disable the other checkbox inputs on the email subscription system page template
    function toggleDisabled() {
      var emailSubItem = document.querySelectorAll('#email-prefs-form .item');
  
      emailSubItem.forEach(function (item) {
        var emailSubItemInput = item.querySelector('input');
  
        if (emailGlobalUnsub.checked) {
          item.classList.add('disabled');
          emailSubItemInput.setAttribute('disabled', 'disabled');
          emailSubItemInput.checked = false;
        } else {
          item.classList.remove('disabled');
          emailSubItemInput.removeAttribute('disabled');
        }
      });
    }
  
    // Execute JavaScript on document ready
    domReady(function () {
      if (!document.body) {
        return;
      } else {

        // Function dependent on navigation menu
        if (menuTrigger && menuContainer) {
            toggleNav();
        }

        // Function dependent on email unsubscribe from all input
        if (emailGlobalUnsub) {
          emailGlobalUnsub.addEventListener('change', toggleDisabled);
        }
      }
    });
  })();