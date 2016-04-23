// Import the page-mod API
var oecdDirect = require("sdk/page-mod");

// Create a page-mod
// It will run a script whenever the MessageFocus web app is loaded
// Then it executes the script add-button.js
// Also, we're passing in some options.
oecdDirect.PageMod({
  include: [
    /https?:\/\/app\.adestra\.com\/.*\/html_editor_new\/?$/,
    /https?:\/\/app\.adestra\.com\/.*\/email_editor\/?$/
  ],
  // relative to the data/ directory
  contentScriptFile: [
    "./contentscript.js"
  ]
});
