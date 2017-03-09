/*
  Content script that is referred to in manifest.json
  attempts to inject a button into the editor's
  user interface and to register a click event.
  On click, this will open the OECD.direct interface.

  CHROME OR FIREFOX EXTENSION - will work for both
*/

// helper function to correctly find injected button
// inspired from: http://stackoverflow.com/questions/16694269/any-emulation-or-alternative-of-live-jquery-function-that-addan-enent-listner-fo
var live = function(selector, eventType, callback) {
  try {
    document.addEventListener(eventType, function(event) {
      var elms = document.querySelectorAll(selector),
        target = event.target || window.event.srcElement;
      if(target.closest(selector)) {
        callback.call(elms[0], event);
      }
    });
  } catch (e) {
    console.log('in schlive: ' + JSON.stringify(e))
  }
};


var targetUrl = "http://oe.cd/Direct",
    targetWindowHeight = 800,
    targetWindowWidth = 700,
    options = "height=" + targetWindowHeight + " , width=" + targetWindowWidth + ", scrollbars=yes",
    logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAlBJREFUOBHdks9PE0EUx7+zW3a7hdJCUSARJbEiUQ8lHkAJplz8kWhSNDHxZHuRcFAhJh68VEw8aGKKXDxWj1x0jQeONuEkGlg0RkUjq1gRSqVls6W7/bG+aSDxPzDxJZ95b2fm++btmwH+tbG/C5CHxiNMUkJMkgFR0sEEdSs5nNvZ8+ilNzQyaGg7ns8LfJDO3AzJ527NM5f0jEnuOOqUOCVKUrzkGX4S5Xu2LbHtI5QkwmNG4s6B7vb54N7dfqWhEX6/H1VRxoy+iVafghZFhE9msbsXeh+TyCHNGOEnLhM9roGuXfETh9r9LYFmNDT6UO/1ouBI6NzThjZK4BaB2cV0wnMlqQLXdBLFiXGik8dCR7Mn6q5zUS0MvCF8XDMsXJ1awNv0Jk0znoifGCZqp+eXu/h3ysoHRoVGOqJaraJaqaBClMslvNB+ANUyvqzmYFtFTM0uAZUyb6Caed+n/prnuTC2ooUhHuw/ebupXsbTuWUobhkeuQ5Z08b3rIk5fR1l28Jg0AdtKfM81n/g49ZG6wSJX2U/He2uWJ6wMLOY1QyzgPRaDpPTC3j9+SdOBb24eISqLJpIvfsGZhdx9nAgRUJ+C7z8HHGd0MRCR6/1YcWIZI0iWKUMycXglUW8+ZpBej0P0zSxv1lKTY6cv9d37LhKohSxSpwmLvG+8XeQJBflca2Zgogmr4KNQglwHA0CG7TUO7nRsRsbtKOHiBL7JhIPYrWHZE/fj9HEEKGRAA5V8jtn6I5dHHdKVk1Ma9wekkgnz3+B38j/YH8AOHTbrz+l84oAAAAASUVORK5CYII=";

//
// PREVIOUS HTML EDITOR
//

if (document.location.href.indexOf("html_editor_new") > -1) {
  var new_button = ('<td style="position: relative">' +
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

  try {
    var existing_button = document.getElementsByClassName("mceToolbarEnd")[0];
    if (existing_button) {
      existing_button.insertAdjacentHTML("beforebegin", new_button);
      console.log("OECD MessageFocus button for NEW HTML EDITOR successfully injected.");
    }
    // attach click event to button we just inserted above
    live('#editor_oecd_extension_kv3_dialog_modal', 'click', function() {
      window.open(targetUrl, "OECD.direct", options);
    });
  } catch(ex) {
    console.log("Problem injecting the OECD Adestra button: " + ex.message);
  }

//
// EMAIL EDITOR
//
// the current
//
} else if (document.location.href.indexOf("email_editor") > -1) {

  var _observer = new MutationObserver(function(mutations) {
      var selectorToObserve = "div[data-input-name='publications_html'].control.is-source div.control-input-group ul";
      try {
        // whenever there is a change observed, look for
        // this very specific CSS selector (defined above)
        var buttonSection = document.querySelectorAll(selectorToObserve);

        for (var i = 0; i < buttonSection.length; i++) {

          // for each such button section found ...
          var b = buttonSection[i];

          var new_editor_button = (`<li id="publications_html-${i}"` +
          ' class="oecd_pubs_button control-tools-list-item"' +
          ` onclick="window.open('${targetUrl}', 'OECD.direct', '${options}');return false;"` +
          ' style="width:17%">' +
          '<div>' +
          '<span class="icon">' +
          `<img style="margin-bottom: -3px;" src="${logo}"/>` +
          '</span>' +
          'Publications</div>' +
          '</li>');

          // ... check whether a publication button has already been inserted
          var o = b.querySelector('li.oecd_pubs_button');
          if (b && !o) {
            // if not, inject one
            b.insertAdjacentHTML("afterbegin", new_editor_button);
            console.log("OECD MessageFocus button for EMAIL EDITOR successfully injected.");
          }
          // live('li#publications_html-' + i + ' div', 'click', function(evt) {
          //   // associate it with the click action ...
          //   window.open(targetUrl, "OECD.direct", options);
          //   // ... and highlight the textarea content for easier replacement
          //   evt.target.closest("div[data-input-name='publications_html']").querySelector("textarea").select();
          // })
        }
      } catch(e) {
        console.log("OECD Adestra button for EMAIL EDITOR injection failed: " + e.message);
      }
  });

  var observerConfig = {
    childList: true,
    subtree: true
  };
  // Listen to child node and subtree changes
  var elt = document.querySelector("div.emled-inputs-controls");
  if(elt) _observer.observe(elt, observerConfig);

//
// UNKNOWN URL
//
} else {
  console.log("CAN'T INJECT BUTTON, UNKNOWN EDITOR AT: " + document.location.href);
}
