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

    let formInputsHandled = false;



    // Functions
  
    // Function for executing code on document ready
    function domReady(callback) {
      if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback);
      }
    }

    function onMessageReady(callback) {
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      window.addEventListener('message', event => {
        if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
          callback(event);
        }
      });
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

    // Function to handle forms with file inputs
    function handleFormFileInputs() {
      if (formInputsHandled) {
        return; // Prevent duplicate handling
      }

      // Check if the page contains any form elements
      const forms = document.querySelectorAll('form');
      if (forms.length === 0) {
        // No forms present, do nothing
        return;
      }

      // Iterate through each form and check if it contains a file input
      forms.forEach((form) => {
        const fileInputs = form.querySelectorAll('input[type="file"]');
        if (fileInputs.length === 0) {
          // This form doesn't have a file input, move on to the next form
          return;
        }

        fileInputs.forEach((fileInput) => {
          // add the file input cover markup to each file input
          const fileInputWrapper = fileInput.parentElement;
          fileInputWrapper.style.position = "relative";
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
      });

      formInputsHandled = true; // Set the flag to prevent reprocessing
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

        onMessageReady(function(event) {
          if (!event.data) {
            return;
          }
        
          // Call the function to handle forms with file inputs
          handleFormFileInputs();
        });
      }
    });

  })();