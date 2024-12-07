(function () {
    // Variables
    const emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

    const menuTrigger = document.querySelector('.header-one__menu-trigger');

    const menuContainer = document.querySelector('.header-one__menu-container');
  
    const headerEl = document.querySelector('.header-one');

    // dynamically update the (--height-open) css variable for the menu height. 
    const rootStyles = document.querySelector(':root'); 
    const viewportHeight = window.innerHeight;
    const headerElHeight = Math.round(headerEl.getBoundingClientRect().height);
    const menuHeight = viewportHeight - headerElHeight;
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

      const menuToggleTop = headerEl.querySelector('.menu-toggle--top');
      const menuToggleBot = headerEl.querySelector('.menu-toggle--bottom');
      const menuToggleMid = headerEl.querySelector('.menu-toggle--middle');
      const menuItems = menuContainer.querySelector('.menu-one__wrapper')?.children ?? [];
      const menuButtons = menuContainer.querySelector('.header-one__buttons-container')?.children ?? [];
      const langButton = menuContainer.querySelector('.header-one__language-switcher');
      const menuItemsArray = Array.from(menuItems);
      const menuButtonsArray = Array.from(menuButtons);
      const allMenuItemsArray = [...menuItemsArray, ...menuButtonsArray, langButton];
      const tl = gsap.timeline({ paused: true, smoothChildTiming: true });

      tl
        .to(menuToggleTop, { y: 8 }, 'start')
        .to(menuToggleBot, { y: -8 }, 'start')
        .to(menuToggleTop, { rotation:135, ease: "slow(0.1,2,false)" }, 'start+=0.3')
        .to(menuToggleMid, { rotation:135, ease: "slow(0.1,2,false)" }, 'start+=0.3')
        .to(menuToggleBot, { rotation:225, ease: "slow(0.1,2,false)" }, 'start+=0.3')
        .fromTo(allMenuItemsArray, {
          autoAlpha: 0,
          y: 20
        },{
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 1.5
        }, 'start+=0.3');

      tl.reverse();

      menuTrigger.addEventListener('click', () => {
          const isOpen = menuTrigger.getAttribute('data-menu-state') === 'open';
          isOpen ? menuTrigger.setAttribute('data-menu-state', 'closed') : menuTrigger.setAttribute('data-menu-state', 'open');

          menuContainer.style.minHeight = isOpen ? 'var(--height-closed)' : 'var(--height-open)';
          menuContainer.classList.toggle('hidden');
          menuTrigger.classList.toggle('open');

          if (tl.reversed()) {
            tl.play();
          } else {
            tl.reverse(.5, false);
          }

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

    // Function to handle form alterations
    function handleForms(data) {
      // get the form via data & data-form-id value 
      const formId = data.id;
      const formElement = document.querySelector(`[data-form-id="${formId}"]`);

      // check for all file inputs
      const fileInputs = formElement.querySelectorAll('input[type="file"]');
      // check for all radio inputs
      const radioInputs = formElement.querySelectorAll('input[type="radio"]');
      // check for all checkbox labels
      const checkboxInputs = formElement.querySelectorAll('input[type="checkbox"]');

      if (fileInputs.length) {
        fileInputs.forEach((fileInput) => {
          // add the file input cover markup to each file input
          const fileInputWrapper = fileInput.parentElement;
          fileInputWrapper.style.position = "relative";
          fileInput.classList.add('form-cover-applied');
          const newFileInputBlock = `<div class="file-input-cover flex justify-center px-4 py-6">
                                        <div class="text-center">
                                          <svg class="mx-auto h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                                          </svg>    
                                          <p class="mt-4 text-sm/6 font-semibold">
                                            Upload a file or drag and drop
                                          </p>
                                          <p class="uploaded-file-list text-xs/5 mb-0">total size can not exceed 100 MB</p>
                                        </div>
                                      </div>`;

          fileInputWrapper.insertAdjacentHTML('beforeend', newFileInputBlock);

          // Add event listener to detect when a file is selected
          fileInput.addEventListener('change', (e) => {
            const files = e.target.files; // Get the FileList object from the input
            let fileNames = [];
    
            // Iterate through the files and extract their names
            for (let i = 0; i < files.length; i++) {
              fileNames.push(files[i].name);
            }
    
            // Save the extracted file names to a variable
            const selectedFileNames = fileNames.join(', ');
            let uploadedFileList = `Selected file(s): ${selectedFileNames}`;
            const newUploadedFileListElem = e.target.nextElementSibling.firstElementChild.lastElementChild;
            newUploadedFileListElem.innerText = uploadedFileList;
          });

          // Event listener to handle focus event
          fileInput.addEventListener('focus', () => {
            const targetElement = fileInput.closest('.input')?.querySelector('.file-input-cover');
            if (targetElement) {
              // Add a class to the element to indicate focus
              targetElement.classList.add('focus-visible');
            }
          });

          // Event listener to handle blur event (when the file input loses focus)
          fileInput.addEventListener('blur', () => {
            const targetElement = fileInput.closest('.input')?.querySelector('.file-input-cover');
            if (targetElement) {
              // Remove the focus class when the file input loses focus
              targetElement.classList.remove('focus-visible');
            }
          });

        });
      } 
      if (radioInputs.length) {
        
        radioInputs.forEach((radioInput) => {
          
          const radioId = radioInput.getAttribute('id');
          radioLabel = formElement.querySelector(`[for="${radioId}"]`);
          const parentUl = radioLabel.closest('ul.inputs-list');
          parentUl.setAttribute('role', 'radiogroup');
          parentUl.setAttribute('aria-label', 'radio group');
          radioLabel.setAttribute('role', 'radio');
          radioLabel.setAttribute('aria-label', 'radio button');
          radioLabel.setAttribute('aria-checked', 'false');

          radioLabel.addEventListener('click', (e) => {
            const currentLabel = e.currentTarget;
            if (e.target !== currentLabel) {
              e.preventDefault();
              return;
            }
            const currentParentUl = currentLabel.closest('ul.inputs-list');
            const allCurrentLabels = currentParentUl.querySelectorAll('label');
            allCurrentLabels.forEach(label => {
              label.classList.remove('checked');
              label.setAttribute('aria-checked', 'false');
              label.querySelector('input[type="radio"]').checked = false;
            });
            currentLabel.classList.add('checked');
            currentLabel.querySelector('input[type="radio"]').checked = true;
            currentLabel.setAttribute('aria-checked', 'true');
          });

          // allow spacebar to select radio for accessibility
          radioLabel.addEventListener('keydown', (e) => {
            if(e.key == ' '){
              const currentLabel = e.currentTarget;
              const currentParentUl = currentLabel.closest('ul.inputs-list');
              const allCurrentLabels = currentParentUl.querySelectorAll('label');
              allCurrentLabels.forEach(label => {
                label.classList.remove('checked');
                label.setAttribute('aria-checked', 'false');
                label.querySelector('input[type="radio"]').checked = false;
              });
              currentLabel.classList.add('checked');
              currentLabel.querySelector('input[type="radio"]').checked = true;
              currentLabel.setAttribute('aria-checked', 'true');
            }
        });

          radioInput.addEventListener('focus', (e) => {
            let currentRadioId = e.currentTarget.id;
            let currentLabel = formElement.querySelector(`[for="${currentRadioId}"]`);

            if (currentLabel) {
              currentLabel.classList.add('focus-visible');
            }
          });

          radioInput.addEventListener('blur', (e) => {
            let currentRadioId = e.currentTarget.id;
            let currentLabel = formElement.querySelector(`[for="${currentRadioId}"]`);

            if (currentLabel) {
              currentLabel.classList.remove('focus-visible');
            }
          });

        });

      } 
      if (checkboxInputs.length) {
        checkboxInputs.forEach((checkboxInput) => {

          const checkboxId = checkboxInput.getAttribute('id');
          checkboxLabel = formElement.querySelector(`[for="${checkboxId}"]`);

          let canRun = true;
          
          checkboxLabel.addEventListener('click', (e) => {
            const currentLabel = e.currentTarget;
            if (e.target !== currentLabel) {
              e.preventDefault();
              return;
            }
            if (currentLabel.querySelector('input[type="checkbox"]').checked === false) {
              currentLabel.querySelector('input[type="checkbox"]').checked === true;
              currentLabel.classList.add('checked');
            } else {
              currentLabel.querySelector('input[type="checkbox"]').checked === false;
              currentLabel.classList.remove('checked');
            }
          });

          checkboxInput.addEventListener('focus', (e) => {
            let currentCheckboxId = e.currentTarget.id;
            let currentLabel = formElement.querySelector(`[for="${currentCheckboxId}"]`);

            if (currentLabel) {
              currentLabel.classList.add('focus-visible');
            }
          });

          checkboxInput.addEventListener('blur', (e) => {
            let currentCheckboxId = e.currentTarget.id;
            let currentLabel = formElement.querySelector(`[for="${currentCheckboxId}"]`);

            if (currentLabel) {
              currentLabel.classList.remove('focus-visible');
            }
          });

        });
      } 
      // If none of the input lists contain elements, return
      if (!fileInputs.length && !radioInputs.length && !checkboxInputs.length) {
        return;
      }

    }
  
    // Execute JavaScript on document ready
    domReady(function () {
      if (!document.body) {
        return;
      } else {

        // Function dependent on navigation menu and mobile width
        if (menuTrigger && menuContainer && window.innerWidth < 992) {
            toggleNav();
        }

        // Function dependent on email unsubscribe from all input
        if (emailGlobalUnsub) {
          emailGlobalUnsub.addEventListener('change', toggleDisabled);
        }

        // listen for form message events & if present run fn to handle form manipulation
        window.addEventListener('message', event => {
          if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
            handleForms(event.data);
          }
        });

      }
    });

  })();