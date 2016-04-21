// helper function to correctly find injected button
// inspired from: http://stackoverflow.com/questions/16694269/any-emulation-or-alternative-of-live-jquery-function-that-addan-enent-listner-fo
var live = function(selector, eventType, callback) {
  document.addEventListener(eventType, function(event) {
    var elms = document.querySelectorAll(selector),
      target = event.target || window.event.srcElement;
    if(target.closest(selector)) {
      callback.call(elms[0], event);
    }
  });
};

var targetUrl = "http://oe.cd/Direct",
    targetWindowHeight = 800,
    targetWindowWidth = 700,
    options = "height=" + targetWindowHeight + " , width=" + targetWindowWidth,
    logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAlBJREFUOBHdks9PE0EUx7+zW3a7hdJCUSARJbEiUQ8lHkAJplz8kWhSNDHxZHuRcFAhJh68VEw8aGKKXDxWj1x0jQeONuEkGlg0RkUjq1gRSqVls6W7/bG+aSDxPzDxJZ95b2fm++btmwH+tbG/C5CHxiNMUkJMkgFR0sEEdSs5nNvZ8+ilNzQyaGg7ns8LfJDO3AzJ527NM5f0jEnuOOqUOCVKUrzkGX4S5Xu2LbHtI5QkwmNG4s6B7vb54N7dfqWhEX6/H1VRxoy+iVafghZFhE9msbsXeh+TyCHNGOEnLhM9roGuXfETh9r9LYFmNDT6UO/1ouBI6NzThjZK4BaB2cV0wnMlqQLXdBLFiXGik8dCR7Mn6q5zUS0MvCF8XDMsXJ1awNv0Jk0znoifGCZqp+eXu/h3ysoHRoVGOqJaraJaqaBClMslvNB+ANUyvqzmYFtFTM0uAZUyb6Caed+n/prnuTC2ooUhHuw/ebupXsbTuWUobhkeuQ5Z08b3rIk5fR1l28Jg0AdtKfM81n/g49ZG6wSJX2U/He2uWJ6wMLOY1QyzgPRaDpPTC3j9+SdOBb24eISqLJpIvfsGZhdx9nAgRUJ+C7z8HHGd0MRCR6/1YcWIZI0iWKUMycXglUW8+ZpBej0P0zSxv1lKTY6cv9d37LhKohSxSpwmLvG+8XeQJBflca2Zgogmr4KNQglwHA0CG7TUO7nRsRsbtKOHiBL7JhIPYrWHZE/fj9HEEKGRAA5V8jtn6I5dHHdKVk1Ma9wekkgnz3+B38j/YH8AOHTbrz+l84oAAAAASUVORK5CYII=",
    separator = '<span class="cke_toolbar_separator" role="separator"></span>',
    new_editor_button = ('<a id="cke_oecd_pubs_button" ' +
      'role="button" class="cke_button cke_button_off" ' +
      'href="javascript:void(\'Add publication\')" ' +
      'title="Add publication" ' +
      'tabindex="-1" hidefocus="true" ' +
      'aria-labelledby="cke_oecd_pubs_button_label" aria-haspopup="false" ' +
      '>' +
        '<span class="cke_button_icon" style="background-image:url(\'' + logo + '\');">&nbsp;</span>' +
        '<span id="cke_oecd_pubs_button_label" class="cke_button_label" aria-hidden="false">Add publication</span>'+
      '</a>');

var _observer = new MutationObserver(function(mutations) {
  try {
    var b = document.querySelector('a.cke_button__pastefromword');
    var o = document.querySelector('a#cke_oecd_pubs_button');
    if (b && !o) {
      b.insertAdjacentHTML("afterend", new_editor_button);
      b.insertAdjacentHTML("afterend", separator);
      console.log("OECD Adestra button for EMAIL EDITOR successfully injected.");
    }
    live('a#cke_oecd_pubs_button', 'click', function() {
      window.open(targetUrl, "OECD.direct", options);
    })
  } catch(e) {
    console.log("OECD Adestra button for EMAIL EDITOR injection failed: " + e.message);
  }
});

var observerConfig = {
  childList: true,
  subtree: true
};

// Listen to all changes to body and child nodes
_observer.observe(document.querySelector("div.emled-inputs-controls"), observerConfig);
