/*
  Content script that is called from index.js
  attempts to inject a button into the HTML editor's
  user interface and to register a click event.
  On click, this will open the OECD.direct interface.

  CHROME EXTENSION
*/

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

var targetUrl = "http://vs-pac-int-2.main.oecd.org/OECD.Direct/",
    targetWindowHeight = 800,
    targetWindowWidth = 700,
    options = "height=" + targetWindowHeight + " , width=" + targetWindowWidth,
    logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAlBJREFUOBHdks9PE0EUx7+zW3a7hdJCUSARJbEiUQ8lHkAJplz8kWhSNDHxZHuRcFAhJh68VEw8aGKKXDxWj1x0jQeONuEkGlg0RkUjq1gRSqVls6W7/bG+aSDxPzDxJZ95b2fm++btmwH+tbG/C5CHxiNMUkJMkgFR0sEEdSs5nNvZ8+ilNzQyaGg7ns8LfJDO3AzJ527NM5f0jEnuOOqUOCVKUrzkGX4S5Xu2LbHtI5QkwmNG4s6B7vb54N7dfqWhEX6/H1VRxoy+iVafghZFhE9msbsXeh+TyCHNGOEnLhM9roGuXfETh9r9LYFmNDT6UO/1ouBI6NzThjZK4BaB2cV0wnMlqQLXdBLFiXGik8dCR7Mn6q5zUS0MvCF8XDMsXJ1awNv0Jk0znoifGCZqp+eXu/h3ysoHRoVGOqJaraJaqaBClMslvNB+ANUyvqzmYFtFTM0uAZUyb6Caed+n/prnuTC2ooUhHuw/ebupXsbTuWUobhkeuQ5Z08b3rIk5fR1l28Jg0AdtKfM81n/g49ZG6wSJX2U/He2uWJ6wMLOY1QyzgPRaDpPTC3j9+SdOBb24eISqLJpIvfsGZhdx9nAgRUJ+C7z8HHGd0MRCR6/1YcWIZI0iWKUMycXglUW8+ZpBej0P0zSxv1lKTY6cv9d37LhKohSxSpwmLvG+8XeQJBflca2Zgogmr4KNQglwHA0CG7TUO7nRsRsbtKOHiBL7JhIPYrWHZE/fj9HEEKGRAA5V8jtn6I5dHHdKVk1Ma9wekkgnz3+B38j/YH8AOHTbrz+l84oAAAAASUVORK5CYII=",
    new_button = ('<td style="position: relative">' +
      '<a role="button"' +
          'id="editor_oecd_extension_kv3_dialog_modal"' +
          'href="javascript:;"' +
          'class="mceButton mceButtonEnabled oecd_publication mceButtonLabeled"' +
          'onmousedown="return false;"' +
          'onclick="return false;"' +
          'aria-labelledby="editor_oecd_extension_kv3_dialog_modal_voice"' +
          'title="Add publication" ' +
          'tabindex="-1">' +
          '<span id="oecd_kv3" class="mceIcon icon_mce_oecd_publication">'+
            '<img src="' + logo + '"/>' +
          '</span>' +
          '<span class="mceButtonLabel">Add publication</span>' +
          '<span class="mceVoiceLabel mceIconOnly" style="display: none;"' +
          'id="editor_oecd_extension_kv3_dialog_modal_voice">Add publication</span>' +
        '</a>' +
    '</td>');

if (document.location.href.indexOf("html_editor_new") > -1) {
  try {
    var existing_button = document.getElementsByClassName("mceToolbarEnd")[0];
    if (existing_button) {
      existing_button.insertAdjacentHTML("beforebegin", new_button);
      console.log('OECD Adestra button was successfully injected.');
    }
    // attach click event to button we just inserted above
    live('#editor_oecd_extension_kv3_dialog_modal', 'click', function() {
      window.open(targetUrl, "OECD.direct", options);
    });
  } catch(ex) {
    console.log("Problem injecting the OECD Adestra button: " + ex.message);
  }
} else {
  console.log("NOT YET IMPLEMENTED FOR: " + document.location.href);
}
