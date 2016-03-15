/*
  Content script that is called from index.js
  attempts to inject a button into the HTML editor's
  user interface and to register a click event.
  On click, this will open the OECD.direct interface.

  FIREFOX EXTENSION
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

var targetUrl = self.options.targetUrl,
    targetWindowHeight = self.options.targetWindowHeight,
    targetWindowWidth = self.options.targetWindowWidth,
    options = "height=" + targetWindowHeight + " , width=" + targetWindowWidth,
    logo = self.options.logo,
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
          '<span id="oecd_kv3" class="mceIcon icon_mce_oecd_publication">' +
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
